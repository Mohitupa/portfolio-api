import { Schema, model } from "mongoose";
import { IPortfolio } from "./portfolio.types";

const portfolioSchema = new Schema<IPortfolio>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = model<IPortfolio>(
  "Portfolio",
  portfolioSchema
);

export default Portfolio;