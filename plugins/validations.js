import {
  required,
  email,
  helpers,
  maxLength,
  minLength,
  minValue,
  maxValue,
} from '@vuelidate/validators';

const validators = {
  full_nameRequired: helpers.withMessage(
    'The full_name field is required',
    required,
  ),
  minLength: minLength(6),
  containsfull_nameRequirement: helpers.withMessage(
    () => 'full_name only contain letters',
    (value) => /^[A-Z a-z]+$/.test(value),
  ),
  emailRequired: helpers.withMessage('The email field is required', required),
  email: helpers.withMessage('Invalid email format', email),
  maxLength: maxLength(50),
  passwordRequired: helpers.withMessage(
    'The password field is required',
    required,
  ),
  passMinLength: minLength(8),
  passwordRequirement: helpers.withMessage(
    () => 'The password requires an uppercase, lowercase, number and special character',
    (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value),
  ),
  addressMaxLength: maxLength(100),
  countryRequired: helpers.withMessage(
    'The country must be selected ',
    required,
  ),
  zipcode: helpers.withMessage(
    () => 'The zip code must be 6 digit only',
    (value) => /(^\d{0}$)|(^\d{6}$)/.test(value),
  ),
  cardNumberRequired: helpers.withMessage(
    'The card number field is required',
    required,
  ),
  cardNumberRequirement: helpers.withMessage(
    () => 'The card number must be 16 digit only',
    (value) => /(^\d{0}$)|(^\d{16}$)/.test(value),
  ),
  cvvRequired: helpers.withMessage('The cvv field is required', required),
  cvvRequirement: helpers.withMessage(
    () => 'The card cvv must be 3 digit only',
    (value) => /(^\d{0}$)|(^\d{3}$)/.test(value),
  ),
  expMonthRequired: helpers.withMessage(
    'The month must be selected ',
    required,
  ),
  expYearRequired: helpers.withMessage('The year must be selected ', required),
  roleNameReq: helpers.withMessage('The role name field is required', required),
  roleMinLen: minLength(3),
  roleMaxLen: maxLength(20),
  roleNameContainsReq: helpers.withMessage(
    () => 'Role name only contain letters',
    (value) => /^[A-Z a-z]+$/.test(value),
  ),
  assignedPerReq: helpers.withMessage(
    'Atleat one permission is required',
    required,
  ),
  whNameReq: helpers.withMessage('The warehouse field is required', required),
  whNameContainsReq: helpers.withMessage(
    () => 'Warehouse name only contain letters',
    (value) => /^[A-Z a-z]+$/.test(value),
  ),
  wh3PLReq: helpers.withMessage(
    'The number of 3PL field is required',
    required,
  ),
  whSKUReq: helpers.withMessage(
    'The number of SKU field is required',
    required,
  ),
  whOrderReq: helpers.withMessage(
    'The number of Order field is required',
    required,
  ),
  whStoreReq: helpers.withMessage(
    'The number of Store field is required',
    required,
  ),
  latitude: required,
  latMin: minValue(-90),
  latMax: maxValue(90),
  latCont: helpers.withMessage(
    () => 'The latitude should be valid',
    (value) => /^-?[0-9]{2,3}\.[0-9]{6,7}$/.test(value),
  ),
  longitude: required,
  longCont: helpers.withMessage(
    () => 'The longitude should be valid',
    (value) => /^-?[0-9]{2,3}\.[0-9]{6,7}$/.test(value),
  ),
  longMin: minValue(-180),
  longMax: maxValue(180),
  province: required,
  city: required,
  address: required,
  zipreq: required,
};

export default validators;
