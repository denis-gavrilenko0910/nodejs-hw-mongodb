import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },

    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
      timestamps: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactsCollection = model('contacts', contactSchema);

export default ContactsCollection;
