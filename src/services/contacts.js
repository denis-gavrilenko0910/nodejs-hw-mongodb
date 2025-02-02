import ContactsCollection from '../db/models/Contact.js';
import { calcuatePaginationData } from '../utils/calculatePagingationData.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const parsedFilters = parseContactFilterParams(filter);

  const query = {};
  if (parsedFilters.isFavourite !== undefined) {
    query.isFavourite = parsedFilters.isFavourite;
  }

  if (parsedFilters.contactType) {
    query.contactType = parsedFilters.contactType;
  }

  const data = await ContactsCollection.find(query)

    .skip(skip)
    .limit(perPage)
    .sort({
      [sortBy]: sortOrder,
    });
  const totalItems = await ContactsCollection.countDocuments();
  const paginationData = calcuatePaginationData({ totalItems, page, perPage });
  return {
    data,
    ...paginationData,
  };
};

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
      runValidators: true,
    },
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContact = async (filter) => {
  return await ContactsCollection.findOneAndDelete(filter);
};
