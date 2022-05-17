export const required = (value, field) => ((value === undefined || value.length === 0) ? `${field} is required` : null);
export const alphanumericCharactersOnly = (value, field) => ((!/^[a-zA-Z0-9()*&%$#@!^':"+=?/,.~-]+$/.test(value) && value.length > 0) ? `${field} can only consist of alphanumeric characters and the following symbols:
()*&%$#@!^':"-+=?/,.~` : null);
export const limitedCharacters = (value, field) => ((value.length > 50) ? `${field} can't be more than 50 characters` : null);
export const restrictedRange = (value, field) => (((value < 0) || (value > 500000) || (value === 0)) ? `${field} must be a number between 0 and 500,000` : null);
export const notANumber = (value, field) => ((/^[0-9]*$/.test(value) === false) ? `${field} must be a number` : null);

export const validate = (value, field, arrayOfValidatorFunctions) => {
  const arrayOfErrors = arrayOfValidatorFunctions
    .map((validator) => validator(value, field))
    .filter((message) => message !== null);
  return arrayOfErrors;
};
