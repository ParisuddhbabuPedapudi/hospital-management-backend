const USER_ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  PATIENT: 'patient'
};

const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show'
};

const APPOINTMENT_TYPES = {
  CONSULTATION: 'consultation',
  FOLLOW_UP: 'follow_up',
  EMERGENCY: 'emergency',
  ROUTINE_CHECKUP: 'routine_checkup'
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial',
  REFUNDED: 'refunded'
};

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const SPECIALIZATIONS = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Hematology',
  'Infectious Disease',
  'Nephrology',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Surgery',
  'Urology'
];

const DEPARTMENTS = [
  'Emergency Medicine',
  'Internal Medicine',
  'Surgery',
  'Pediatrics',
  'Obstetrics and Gynecology',
  'Radiology',
  'Pathology',
  'Anesthesiology',
  'Psychiatry',
  'Dermatology',
  'Ophthalmology',
  'ENT',
  'Orthopedics',
  'Cardiology',
  'Neurology',
  'Oncology'
];

module.exports = {
  USER_ROLES,
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPES,
  PAYMENT_STATUS,
  DAYS_OF_WEEK,
  SPECIALIZATIONS,
  DEPARTMENTS
};
