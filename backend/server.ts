import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

import productRoute from './src/routes/orders';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database = process.env.URI; // database link
if (typeof database === 'undefined') {
  console.log(database);
  throw console.error;
}
connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.use('/products', productRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
