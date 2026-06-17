import { catchAsync } from "../../utils/catchAsync";
import { ContactMessageService } from "./contact-message.service";

const createMessage = catchAsync(
  async (req, res) => {

    const result =
      await ContactMessageService.createMessage(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Message sent successfully",
      data: result,
    });
  }
);

const getAllMessages = catchAsync(
  async (req, res) => {

    const result =
      await ContactMessageService.getAllMessages();

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

const getMessageById = catchAsync(
  async (req, res) => {

    const result =
      await ContactMessageService.getMessageById(
        req.params.id as string
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

const markAsRead = catchAsync(
  async (req, res) => {

    const result =
      await ContactMessageService.markAsRead(
        req.params.id as string
      );

    res.status(200).json({
      success: true,
      message:
        "Message marked as read",
      data: result,
    });
  }
);

const deleteMessage = catchAsync(
  async (req, res) => {

    await ContactMessageService.deleteMessage(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      message:
        "Message deleted successfully",
    });
  }
);

export const ContactMessageController = {
  createMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
};