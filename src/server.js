// require('dotenv').config();
// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const cors = require('cors');
// const connectDB = require('./config/database');
// const typeDefs = require('./schemas/typeDefs');
// const resolvers = require('./resolvers');
// const context = require('./middleware/context');

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware - Allow Apollo Sandbox and other origins
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://studio.apollographql.com',
//     'https://studio.apollographql.com/sandbox',
//     'https://studio.apollographql.com/sandbox/explorer'
//   ],
//   credentials: true
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Hospital Management API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Apollo Server setup
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context,
//   introspection: true,
//   playground: true,
//   formatError: (error) => {
//     console.error('GraphQL Error:', error);
//     return {
//       message: error.message,
//       code: error.extensions?.code,
//       path: error.path
//     };
//   }
// });

// const startServer = async () => {
//   await server.start();
//   server.applyMiddleware({ 
//     app, 
//     path: '/graphql',
//     cors: {
//       origin: [
//         'http://localhost:3000',
//         'https://studio.apollographql.com',
//         'https://studio.apollographql.com/sandbox',
//         'https://studio.apollographql.com/sandbox/explorer'
//       ],
//       credentials: true
//     }
//   });

//   const PORT = process.env.PORT || 4000;
  
//   app.listen(PORT, () => {
//     console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//     console.log(`📊 Apollo Studio: https://studio.apollographql.com/sandbox`);
//     console.log(`🏥 Hospital Management API is running on port ${PORT}`);
//   });
// };

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   process.exit(1);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.log(`Error: ${err.message}`);
//   process.exit(1);
// });

// startServer();


require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const connectDB = require('./config/database');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./resolvers');
const context = require('./middleware/context');
 
const app = express();
 
// Connect to MongoDB
connectDB();
 
// Allow all origins (development only!)
app.use(cors());
app.options('*', cors());
 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
 
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hospital Management API is running',
    timestamp: new Date().toISOString()
  });
});
 
// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      code: error.extensions?.code,
      path: error.path
    };
  }
});
 
const startServer = async () => {
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: { origin: '*', credentials: true }
  });
 
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📊 Apollo Studio: https://studio.apollographql.com/sandbox`);
    console.log(`🏥 Hospital Management API is running on port ${PORT}`);
  });
};
 
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
 
startServer();
 
module.exports = app;
