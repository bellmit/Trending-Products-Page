import cparser from 'csv-parser';
import fs from 'fs';
import Orders from './src/models/orders.model';

const createDate = (fullDate: string) => {
  const day = parseInt(fullDate.substr(0, 2));
  const month = parseInt(fullDate.substr(3, 2)) - 1;
  const year = parseInt(fullDate.substr(6, 4));
  const hour = parseInt(fullDate.substr(11, 2));
  const minute = parseInt(fullDate.substr(14, 2));
  return new Date(year, month, day, hour, minute);
};

export const loadOrder = (_req: any, res: any) => {
  fs.createReadStream('orders.csv')
    .pipe(cparser())
    .on('data', (row) => {
      const date = createDate(row['Order Date']);
      Orders.create({
        'Order ID': parseInt(row['Order ID']),
        'Order Date': date,
        'Item Name': row['Item Name'],
        Quantity: parseInt(row['Quantity']),
        'Product Price': parseFloat(row['Product Price']),
        'Total products': parseInt(row['Total products']),
      }).then(() => console.log('Order added'));
    })
    .on('end', () => {
      console.log('CSV file succesfully processed');
      res.json('CSV file succesfully processed');
    });
};
