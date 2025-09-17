const User = require('../models/User');
const Department = require('../models/Department');
const { USER_ROLES } = require('./constants');

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user first
    const existingAdmin = await User.findOne({ email: 'admin@hospital.com' });
    if (!existingAdmin) {
      const adminUser = new User({
        email: 'admin@hospital.com',
        password: 'admin123',
        role: USER_ROLES.ADMIN,
        profile: {
          firstName: 'Hospital',
          lastName: 'Admin',
          phone: '+1234567890',
          address: {
            street: '123 Hospital St',
            city: 'Medical City',
            state: 'MC',
            zipCode: '12345',
            country: 'USA'
          }
        }
      });

      await adminUser.save();
      console.log('✅ Created admin user');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Create sample doctor
    const existingDoctor = await User.findOne({ email: 'dr.smith@hospital.com' });
    if (!existingDoctor) {
      const doctor = new User({
        email: 'dr.smith@hospital.com',
        password: 'doctor123',
        role: USER_ROLES.DOCTOR,
        profile: {
          firstName: 'John',
          lastName: 'Smith',
          phone: '+1234567891',
          dateOfBirth: new Date('1980-05-15')
        },
        doctorInfo: {
          licenseNumber: 'MD123456',
          specialization: 'Cardiology',
          department: 'Cardiology',
          experience: 10,
          education: ['MD from Harvard Medical School', 'Residency at Johns Hopkins'],
          consultationFee: 150,
          availableSlots: [
            { day: 'Monday', startTime: '09:00', endTime: '17:00' },
            { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
            { day: 'Friday', startTime: '09:00', endTime: '17:00' }
          ]
        }
      });

      await doctor.save();
      console.log('✅ Created sample doctor');
    } else {
      console.log('✅ Sample doctor already exists');
    }

    // Create sample patient
    const existingPatient = await User.findOne({ email: 'patient1@example.com' });
    if (!existingPatient) {
      const patient = new User({
        email: 'patient1@example.com',
        password: 'patient123',
        role: USER_ROLES.PATIENT,
        profile: {
          firstName: 'Alice',
          lastName: 'Brown',
          phone: '+1234567893',
          dateOfBirth: new Date('1990-03-10'),
          address: {
            street: '456 Patient Ave',
            city: 'Health City',
            state: 'HC',
            zipCode: '54321',
            country: 'USA'
          }
        },
        patientInfo: {
          medicalHistory: ['Hypertension', 'Diabetes Type 2'],
          allergies: ['Penicillin'],
          emergencyContact: {
            name: 'Bob Brown',
            phone: '+1234567894',
            relationship: 'Spouse'
          },
          insuranceInfo: {
            provider: 'Health Insurance Co',
            policyNumber: 'HI123456789'
          }
        }
      });

      await patient.save();
      console.log('✅ Created sample patient');
    } else {
      console.log('✅ Sample patient already exists');
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Admin: admin@hospital.com / admin123');
    console.log('Doctor: dr.smith@hospital.com / doctor123');
    console.log('Patient: patient1@example.com / patient123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

module.exports = seedData;
