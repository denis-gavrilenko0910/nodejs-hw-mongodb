import { Schema, model } from 'mongoose';
import { handeSaveError, setUpdateSettings } from './hooks.js';
import { typeList } from '../../constants/contacts.js';

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
      enum: typeList,
      default: 'personal',
      required: true,
      timestamps: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handeSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', handeSaveError);

export const sortByList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const ContactsCollection = model('contacts', contactSchema);

export default ContactsCollection;
