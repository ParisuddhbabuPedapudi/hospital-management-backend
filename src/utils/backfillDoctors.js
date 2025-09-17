require('dotenv').config();
const connectDB = require('../config/database');
const Doctor = require('../models/Doctor');

(async () => {
  try {
    await connectDB();

    const result = await Doctor.updateMany(
      {
        $or: [
          { age: { $exists: false } },
          { age: null },
          { gender: { $exists: false } },
          { gender: null }
        ]
      },
      [
        {
          $set: {
            age: {
              $cond: [
                { $or: [ { $eq: ['$age', null] }, { $not: ['$age'] } ] },
                0,
                '$age'
              ]
            },
            gender: {
              $cond: [
                { $or: [ { $eq: ['$gender', null] }, { $not: ['$gender'] } ] },
                'male',
                '$gender'
              ]
            }
          }
        }
      ]
    );

    console.log('Backfill complete:', result);
    process.exit(0);
  } catch (err) {
    console.error('Backfill error:', err);
    process.exit(1);
  }
})(); 