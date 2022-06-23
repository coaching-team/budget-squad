/**
 * Validates that user has entered a value in the field
 * @param {*} value - value of the field being validated (what user enters in input)
 * @param {string} field - name of the field being validated
 * @returns returns an error message string if validation fails, returns null if validation passes
 */
export const required = (value, field) => (value === undefined || value.length === 0
  ? `${field} is required`
  : null);

/**
 * Validates that user entered acceptable characters in the field
 * @param {*} value - value of the field being validated (what user enters in input)
 * @param {string} field - name of the field being validated
 * @returns returns an error message string if validation fails, returns null if validation passes
 */
export const certainCharactersOnly = (value, field) => (!/^[a-zA-Z0-9()*&%$#@!^':"+=?/,.~-]*$/.test(value)
  ? `${field} can only consist of alphanumeric characters and the following symbols: ()*&%$#@!^':"-+=?/,.~`
  : null);

/**
 * Validates that user entered no more than 50 characters
 * @param {*} value - value of the field being validated (what user enters in input)
 * @param {string} field - name of the field being validated
 * @returns returns an error message string if validation fails, returns null if validation passes
 */
export const max50Characters = (value, field) => (value.length > 50
  ? `${field} can't be more than 50 characters`
  : null);

/**
 * Validates that user entered a value in the specified range
 * @param {*} value - value of the field being validated (what user enters in input)
 * @param {string} field - name of the field being validated
 * @returns returns an error message string if validation fails, returns null if validation passes
 */
export const restrictedRange = (value, field) => (value < 0 || value > 500000 || value === 0
  ? `${field} must be a number between 0 and 500,000`
  : null);

/**
 * Validates that user entered a number in the field
 * @param {*} value - value of the field being validated (what user enters in input)
 * @param {string} field - name of the field being validated
 * @returns returns an error message string if validation fails, returns null if validation passes
 */
export const isNumber = (value, field) => (/^[0-9]*$/.test(value) === false
  ? `${field} must be a number`
  : null);

/**
 * Validates a field against provided validator functions
 * @param {*} value - value of the field being validated (what user enters in input)
 * @param {string} field - name of the field being validated
 * @param {Array.function} validators - array of functions that validate the field
 * @returns returns an array of error message strings
 */
export const validate = (value, field, validators) => {
  const arrayOfErrors = validators
    .map((validator) => validator(value, field))
    .filter((message) => message !== null);
  return arrayOfErrors;
};
