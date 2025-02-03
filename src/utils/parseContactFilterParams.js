import { typeList } from '../constants/contacts.js';

const parsedBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  console.log('value log', value);

  return parsedBoolean ? value : undefined;
};

const parsedType = (type) => {
  if (typeof type === 'string') {
    return typeList.includes(type) ? type : undefined;
  }
};
console.log('contact type', parsedType);

export const parseContactFilterParams = ({ isFavourite, contactType }) => {
  const parsedIsFavorite = parsedBoolean(isFavourite);
  const parsedContactType = parsedType(contactType);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavorite,
  };
};
