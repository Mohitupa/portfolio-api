import { Schema, model } from "mongoose";
import { IContactMessage } from "./contact-message.types";

const contactMessageSchema =
  new Schema<IContactMessage>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      subject: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export const ContactMessageModel =
  model<IContactMessage>(
    "ContactMessage",
    contactMessageSchema
  );