import * as Yup from 'yup';

// login form validation
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
});

// signup form validation
export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Must have minimum 5 characters')
    .max(15, 'Must have max 15 characters')
    .required('Name is Required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
});
