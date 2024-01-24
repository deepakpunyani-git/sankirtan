const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./database/db');
const cors = require('cors');
const routes = require('./routes/index');

const PORT = process.env.PORT || 3001; // Set default port to 3000 if PORT is not defined
const allowedOrigins = [process.env.FRONTEND]; // Add your frontend URLs here

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request
    }
  },
};

// Enable CORS with specific origin(s)
app.use(cors(corsOptions));


app.use(express.json()); // Body parser middleware

const options = {
  swaggerDefinition: {
    explorer: true,
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

connectDB()
  .then(() => {
    // Register API routes before Swagger middleware
    app.use(routes);

    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.all("/*", (req, res) => {
      res.send('Page Not Found')
    })

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });
