import { useState } from "react";

import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  firstNameValidator,
  lastNameValidator,
  genderValidator,
  dobValidator,
  mobileValidator
} from "../validators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = form => {
  const [errors, setErrors] = useState({
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
      dirty: false,
      error: false,
      message: "",
    },
    firstName: {
      dirty: false,
      error: false,
      message: "",
    },
    lastName: {
      dirty: false,
      error: false,
      message: "",
    },
    dob: {
      dirty: false,
      error: false,
      message: "",
    },
    gender: {
      dirty: false,
      error: false,
      message: "",
    },
    mobile: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, password, confirmPassword, firstName, lastName, gender, dob, mobile } = form;

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (
      nextErrors.confirmPassword.dirty &&
      (field ? field === "confirmPassword" : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

    if (
      nextErrors.firstName.dirty &&
      (field ? field === "firstName" : true)
    ) {
      const firstNameMessage = firstNameValidator(
        firstName,
        form
      );
      nextErrors.firstName.error = !!firstNameMessage;
      nextErrors.firstName.message = firstNameMessage;
      if (!!firstNameMessage) isValid = false;
    }

    if (
      nextErrors.lastName.dirty &&
      (field ? field === "lastName" : true)
    ) {
      const lastNameMessage = lastNameValidator(
        lastName,
        form
      );
      nextErrors.lastName.error = !!lastNameMessage;
      nextErrors.lastName.message = lastNameMessage;
      if (!!lastNameMessage) isValid = false;
    }

    if (
      nextErrors.gender.dirty &&
      (field ? field === "gender" : true)
    ) {
      const genderMessage = genderValidator(
        gender,
        form
      );
      nextErrors.gender.error = !!genderMessage;
      nextErrors.gender.message = genderMessage;
      if (!!genderMessage) isValid = false;
    }

    if (
      nextErrors.dob.dirty &&
      (field ? field === "dob" : true)
    ) {
      const dobMessage = dobValidator(
        dob,
        form
      );
      nextErrors.dob.error = !!dobMessage;
      nextErrors.dob.message = dobMessage;
      if (!!dobMessage) isValid = false;
    }

    if (
      nextErrors.mobile.dirty &&
      (field ? field === "mobile" : true)
    ) {
      const mobileMessage = mobileValidator(
        mobile,
        form
      );
      nextErrors.mobile.error = !!mobileMessage;
      nextErrors.mobile.message = mobileMessage;
      if (!!mobileMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};