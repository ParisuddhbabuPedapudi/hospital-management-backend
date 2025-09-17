# Hospital Management Admin Panel Backend

A comprehensive GraphQL-based backend system for hospital management with role-based access control for Admin, Doctor, and Patient roles.

## 🏥 Features

- **Role-based Authentication**: Admin, Doctor, and Patient roles with different permissions
- **User Management**: Complete user profile management with role-specific information
- **Appointment System**: Schedule, manage, and track appointments
- **Medical Records**: Comprehensive medical record management
- **Department Management**: Hospital department organization
- **Dashboard Analytics**: Real-time statistics and insights
- **GraphQL API**: Modern, type-safe API with Apollo Server
- **MongoDB Integration**: Scalable NoSQL database with Mongoose ODM

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graphqlHospitalAdminBack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Seed the database (optional)**
   ```bash
   node src/utils/seed.js
   ```

## 📁 Project Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection configuration
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── context.js          # GraphQL context setup
├── models/
│   ├── User.js             # User model with roles
│   ├── Appointment.js      # Appointment model
│   ├── Department.js       # Department model
│   └── MedicalRecord.js    # Medical record model
├── resolvers/
│   ├── auth.js             # Authentication resolvers
│   ├── user.js             # User management resolvers
│   ├── appointment.js      # Appointment resolvers
│   ├── medicalRecord.js    # Medical record resolvers
│   ├── department.js       # Department resolvers
│   ├── dashboard.js        # Dashboard analytics resolvers
│   └── index.js            # Resolver aggregation
├── schemas/
│   └── typeDefs.js         # GraphQL type definitions
├── utils/
│   ├── constants.js        # Application constants
│   ├── validation.js       # Input validation utilities
│   └── seed.js             # Database seeding script
└── server.js               # Main server file
```

## 🔐 Authentication & Authorization

### User Roles

1. **Admin**: Full system access
   - Manage all users, departments, and appointments
   - View dashboard analytics
   - System configuration

2. **Doctor**: Medical staff access
   - Manage patient appointments
   - Create and update medical records
   - View assigned patients

3. **Patient**: Patient access
   - View own appointments and medical records
   - Update personal information
   - Book appointments

### Authentication Flow

1. **Register/Login**: Users authenticate with email and password
2. **JWT Token**: Server returns a JWT token for subsequent requests
3. **Authorization**: Each request includes the token in the Authorization header
4. **Role-based Access**: Resolvers check user roles for permission validation

## 📊 GraphQL API

### Key Queries

```graphql
# Authentication
query Me {
  me {
    id
    email
    role
    profile {
      firstName
      lastName
    }
  }
}

# Appointments
query MyAppointments {
  myAppointments {
    id
    appointmentDate
    appointmentTime
    status
    doctor {
      profile {
        firstName
        lastName
      }
    }
  }
}

# Dashboard (Admin only)
query DashboardStats {
  dashboardStats {
    totalPatients
    totalDoctors
    totalAppointments
    todayAppointments
    revenue
  }
}
```

### Key Mutations

```graphql
# Authentication
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      role
    }
  }
}

# Create Appointment
mutation CreateAppointment($input: AppointmentInput!) {
  createAppointment(input: $input) {
    id
    appointmentDate
    appointmentTime
    status
  }
}

# Create Medical Record
mutation CreateMedicalRecord($input: MedicalRecordInput!) {
  createMedicalRecord(input: $input) {
    id
    diagnosis
    treatment
    visitDate
  }
}
```

## 🗄️ Database Models

### User Model
- **Profile**: Personal information (name, phone, address)
- **Doctor Info**: License, specialization, availability (for doctors)
- **Patient Info**: Medical history, allergies, insurance (for patients)
- **Authentication**: Email, password, role, active status

### Appointment Model
- **Scheduling**: Date, time, duration, type
- **Participants**: Patient and doctor references
- **Status**: Scheduled, confirmed, completed, cancelled
- **Medical**: Reason, notes, prescription, diagnosis
- **Payment**: Amount, payment status

### Medical Record Model
- **Visit Information**: Date, symptoms, diagnosis, treatment
- **Prescription**: Medications with dosage and instructions
- **Vital Signs**: Blood pressure, heart rate, temperature, etc.
- **Lab Results**: Test results with normal ranges
- **Follow-up**: Follow-up requirements and dates

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` |

## 🔧 Configuration

### Apollo Studio Integration

To integrate with Apollo Studio:

1. Create an account at [Apollo Studio](https://studio.apollographql.com)
2. Create a new graph
3. Add your Apollo key and graph reference to `.env`:
   ```env
   APOLLO_KEY=your_apollo_key
   APOLLO_GRAPH_REF=your_graph_ref
   ```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP address
4. Get the connection string and update `MONGODB_URI`

## 📝 Sample Data

The seed script creates sample data including:

- **Admin User**: `admin@hospital.com` / `admin123`
- **Sample Doctors**: With specializations and availability
- **Sample Patients**: With medical history and insurance
- **Departments**: Common hospital departments

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set all required environment variables
2. **JWT Secret**: Use a strong, unique JWT secret
3. **CORS**: Configure CORS for your frontend domain
4. **Database**: Use MongoDB Atlas or a managed MongoDB service
5. **Logging**: Implement proper logging for production
6. **Error Handling**: Configure error handling and monitoring

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the GraphQL schema in Apollo Studio

## 🔮 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] File upload for medical documents
- [ ] Advanced reporting and analytics
- [ ] Integration with external medical systems
- [ ] Mobile app API endpoints
- [ ] Automated appointment reminders
- [ ] Payment gateway integration
- [ ] Multi-language support
