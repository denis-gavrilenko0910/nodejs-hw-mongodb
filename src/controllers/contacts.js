import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactByID(contactId);

  if (!data) {
    throw createHttpError(404, `Contact ${contactId} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contact added',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId: _id } = req.params;

  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
  });

  if (!result) {
    throw createHttpError(404, `Contact ${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Contact patched successfully',
    data: result.data,
  });
};

export const deletedContactController = async (req, res) => {
  const { contactId: _id } = req.params;
  const data = await contactServices.deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, `Contact with ${_id} not found`);
  }
  res.status(204).send();
};
