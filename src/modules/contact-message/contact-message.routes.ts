import { Router } from "express";

import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { ContactMessageController } from "./contact-message.controller";
import { ContactMessageValidation } from "./contact-message.validation";

const router = Router();


// PUBLIC API

router.post(
  "/contact",
  validateRequest(
    ContactMessageValidation.createContactMessageSchema
  ),
  ContactMessageController.createMessage
);


// ADMIN APIs

router.get(
  "/contact-messages",
  auth("SUPER_ADMIN"),
  ContactMessageController.getAllMessages
);

router.get(
  "/contact-messages/:id",
  auth("SUPER_ADMIN"),
  ContactMessageController.getMessageById
);

router.patch(
  "/contact-messages/:id/read",
  auth("SUPER_ADMIN"),
  ContactMessageController.markAsRead
);

router.delete(
  "/contact-messages/:id",
  auth("SUPER_ADMIN"),
  ContactMessageController.deleteMessage
);

export const ContactMessageRoutes = router;