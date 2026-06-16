import { Types } from "mongoose";
import Portfolio from "../portfolio/portfolio.model";
import { IPortfolio } from "../portfolio/portfolio.types";
import { PortfolioContentModel } from "./portfolio-content.model";
import { IPortfolioContent } from "./portfolio-content.types";

export class NotFoundException extends Error {
    public readonly statusCode = 404;
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
    }
}

export class ConflictException extends Error {
    public readonly statusCode = 409;
    constructor(message: string) {
        super(message);
        this.name = "ConflictException";
    }
}

export class BadRequestException extends Error {
    public readonly statusCode = 400;
    constructor(message: string) {
        super(message);
        this.name = "BadRequestException";
    }
}

type ProtectedField = "portfolioId" | "isPublished" | "publishedAt" | "createdAt" | "updatedAt";

const PROTECTED_FIELDS: ProtectedField[] = [
    "portfolioId",
    "isPublished",
    "publishedAt",
    "createdAt",
    "updatedAt",
];

type PublicPortfolioContent = Omit<IPortfolioContent, "portfolioId"> & {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
};

const toObjectId = (portfolioId: string | Types.ObjectId): Types.ObjectId => {
    if (portfolioId instanceof Types.ObjectId) {
        return portfolioId;
    }

    if (!Types.ObjectId.isValid(portfolioId)) {
        throw new BadRequestException(`Invalid portfolio ID "${portfolioId}"`);
    }

    return new Types.ObjectId(portfolioId);
};

const toPlainObject = <T>(value: T): T => {
    if (value && typeof value === "object" && "toObject" in value) {
        return (value as { toObject: () => T }).toObject();
    }

    return value;
};

const buildPublicPortfolioResponse = (
    portfolio: IPortfolio,
    content: IPortfolioContent
): PublicPortfolioContent => {
    const plainContent = toPlainObject(content);
    const plainPortfolio = toPlainObject(portfolio);
    const { portfolioId, ...sections } = plainContent;

    return {
        ...sections,
        _id: plainPortfolio.slug,
        name: plainPortfolio.name,
        slug: plainPortfolio.slug,
        isActive: plainPortfolio.isActive,
    };
};

type UpdatableSection = Partial<Record<keyof Omit<IPortfolioContent, ProtectedField>, unknown>>;

export class PortfolioContentService {

    async createPortfolioContent(
        portfolioId: string | Types.ObjectId
    ): Promise<IPortfolioContent> {
        const objectId = toObjectId(portfolioId);

        const existing = await PortfolioContentModel.findOne({ portfolioId: objectId });

        if (existing) {
            throw new ConflictException(
                `Content for portfolio ${portfolioId} already exists`
            );
        }

        const content = new PortfolioContentModel({
            portfolioId: objectId,
            isPublished: false,
        });

        return content.save();
    }

    async getPortfolioContentByPortfolioId(
        portfolioId: string | Types.ObjectId
    ): Promise<IPortfolioContent> {
        const objectId = toObjectId(portfolioId);

        const content = await PortfolioContentModel.findOne({ portfolioId: objectId });

        if (!content) {
            throw new NotFoundException(
                `Content for portfolio ${portfolioId} not found`
            );
        }

        return content;
    }

    async updatePortfolioContent(
        portfolioId: string | Types.ObjectId,
        updateDto: UpdatableSection
    ): Promise<IPortfolioContent> {
        const objectId = toObjectId(portfolioId);

        const safeDto = updateDto as Partial<IPortfolioContent>;
        delete safeDto.portfolioId;
        delete safeDto.isPublished;
        delete safeDto.publishedAt;

        const updated = await PortfolioContentModel.findOneAndUpdate(
            { portfolioId: objectId },
            { $set: safeDto },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException(
                `Content for portfolio ${portfolioId} not found`
            );
        }

        return updated;
    }

    async updateSection<K extends keyof UpdatableSection>(
        portfolioId: string | Types.ObjectId,
        section: K,
        data: unknown
    ): Promise<IPortfolioContent> {
        const objectId = toObjectId(portfolioId);

        if ((PROTECTED_FIELDS as string[]).includes(section as string)) {
            throw new BadRequestException(
                `Field "${String(section)}" cannot be updated via section update`
            );
        }

        const updated = await PortfolioContentModel.findOneAndUpdate(
            { portfolioId: objectId },
            { $set: { [section]: data } },
            { new: true, runValidators: true }
        );

        if (!updated) {
            throw new NotFoundException(
                `Content for portfolio ${portfolioId} not found`
            );
        }

        return updated;
    }

    async publishPortfolioContent(
        portfolioId: string | Types.ObjectId
    ): Promise<IPortfolioContent> {
        return this._setPublishState(portfolioId, true);
    }

    async unpublishPortfolioContent(
        portfolioId: string | Types.ObjectId
    ): Promise<IPortfolioContent> {
        return this._setPublishState(portfolioId, false);
    }

    private async _setPublishState(
        portfolioId: string | Types.ObjectId,
        state: boolean
    ): Promise<IPortfolioContent> {
        const objectId = toObjectId(portfolioId);

        const update = state
            ? { $set: { isPublished: true, publishedAt: new Date() } }
            : { $set: { isPublished: false }, $unset: { publishedAt: "" } };

        const updated = await PortfolioContentModel.findOneAndUpdate(
            { portfolioId: objectId },
            update,
            { new: true }
        );

        if (!updated) {
            throw new NotFoundException(
                `Content for portfolio ${portfolioId} not found`
            );
        }

        return updated;
    }

    async getPublicPortfolioBySlug(slug: string): Promise<PublicPortfolioContent> {
        const portfolio = await Portfolio.findOne({ slug, isActive: true });

        if (!portfolio) {
            throw new NotFoundException(`Portfolio "${slug}" not found`);
        }

        const content = await PortfolioContentModel.findOne({
            portfolioId: portfolio._id,
            isPublished: true,
        });

        if (!content) {
            throw new NotFoundException(`Published content for portfolio "${slug}" not found`);
        }

        return buildPublicPortfolioResponse(portfolio, content);
    }
}
