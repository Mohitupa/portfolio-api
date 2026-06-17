import { ContactMessageModel } from "./contact-message.model";

const createMessage = async (payload: any) => {
  return await ContactMessageModel.create(payload);
};

const getAllMessages = async () => {
  return await ContactMessageModel
    .find()
    .sort({ createdAt: -1 });
};

const getMessageById = async (
  messageId: string
) => {

  const message =
    await ContactMessageModel.findById(
      messageId
    );

  if (!message) {
    throw new Error(
      "Message not found"
    );
  }

  return message;
};

const markAsRead = async (
  messageId: string
) => {

  const message =
    await ContactMessageModel.findByIdAndUpdate(
      messageId,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

  if (!message) {
    throw new Error(
      "Message not found"
    );
  }

  return message;
};

const deleteMessage = async (
  messageId: string
) => {

  const message =
    await ContactMessageModel.findByIdAndDelete(
      messageId
    );

  if (!message) {
    throw new Error(
      "Message not found"
    );
  }

  return null;
};

export const ContactMessageService = {
  createMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
};