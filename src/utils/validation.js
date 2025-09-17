const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validatePhone = (phone) => {
  return validator.isMobilePhone(phone);
};

const validateDate = (date) => {
  return validator.isISO8601(date);
};

const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return validator.escape(input.trim());
  }
  return input;
};

const validateAppointmentTime = (time) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

const validateAppointmentDate = (date) => {
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return appointmentDate >= today;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateDate,
  sanitizeInput,
  validateAppointmentTime,
  validateAppointmentDate
};
