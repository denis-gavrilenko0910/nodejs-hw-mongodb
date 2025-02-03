import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(404, `${contactId} is not valid ID`));
  }
  next();
};
