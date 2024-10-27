import ContactsCollection from '../db/models/Contact.js';

export const getContacts = () => ContactsCollection.find();
export const getContactByID = (id) => ContactsCollection.findById(id);
