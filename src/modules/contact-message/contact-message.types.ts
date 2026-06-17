export interface IContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;

  isRead: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}