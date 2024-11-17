import ContactsCollection from '../db/models/Contact.js';

export const getContacts = () => ContactsCollection.find();

export const getContactByID = (id) => ContactsCollection.findById(id);

export const addContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id },
    payload,
    {
      ...options,
      new: true,
      includeResultMetadata: true,
    },
  );
  // console.log(rawResult);

  if (!rawResult || !rawResult.value) {
    return null;
  }
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContact = async (filter) =>
  ContactsCollection.findOneAndDelete(filter);
