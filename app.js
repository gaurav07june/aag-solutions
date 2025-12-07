const express = require('express');
const app = express();
const customer_route = require('./routes/customer-route');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
console.log('MONGO_URI', process.env.MONGO_URI)
app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/customers', customer_route);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );

  } catch (error) {
    console.log(error);
  }
};

start();
