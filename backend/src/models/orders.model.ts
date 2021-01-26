import { Document, model, Schema } from 'mongoose';

export interface IOrder extends Document {
  'Order ID': number;
  'Order Date': Date;
  'Item Name': string;
  Quantity: number;
  'Product Price': number;
  'Total products': number;
}

const orderSchema = new Schema({
  'Order ID': Number,
  'Order Date': {
    type: Date,
    default: new Date(),
  },
  'Item Name': String,
  Quantity: Number,
  'Product Price': Number,
  'Total products': Number,
});

export default model<IOrder>('test_data', orderSchema);
