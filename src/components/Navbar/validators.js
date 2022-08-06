export const emailValidator = email => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must have a minimum 6 characters";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 6) {
    return "Confirm password must have a minimum 6 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};

export const firstNameValidator = firstName => {
  if (!firstName) {
    return "First Name is required";
  }
  return "";
};

export const lastNameValidator = lastName => {
  if (!lastName) {
    return "Last Name is required";
  }
  return "";
};

export const dobValidator = dob => {
  if (!dob) {
    return "Date of Birth is required";
  } else {
    // calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log('age now', age_now);
    // return age_now;
  }
  if (age_now < 16) {
    return "Age should be > 16";
  }
  return "";
};

export const genderValidator = gender => {
  if (!gender) {
    return "Gender is required";
  } else if (gender < 0 || gender > 2) { return "Invalid Sex code" }
  return "";
};


export const mobileValidator = mobile => {
  if (!mobile) {
    return "Mobile is required";
  } else if (mobile.length !== 10) {
    return "Mobile number needs 10 digits";
  }
  return "";
};