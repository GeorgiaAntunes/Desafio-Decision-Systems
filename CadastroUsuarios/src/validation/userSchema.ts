import * as yup from 'yup';
import { ValidationErrors } from 'final-form';

export const userSchema = yup.object().shape({
  name: yup.string().min(10).max(100).required(),
  password: yup.string().min(10).max(30).required(),
  dateOfBirth: yup.date().max(new Date()).required(),
  motherName: yup.string().min(10).max(100).required(),
});

export const validate = async (values: Record<string, any>): Promise<ValidationErrors> => {
  try {
    await userSchema.validate(values, { abortEarly: false });
    return {};
  } catch (err: any) {
    const errors: ValidationErrors = {};
    err.inner.forEach((error: yup.ValidationError) => {
      if (error.path) {
        errors[error.path] = error.message;
      }
    });
    return errors;
  }
};

