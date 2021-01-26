import Orders, { IOrder } from '../models/orders.model';
import 'dotenv/config';

var algoFactor: number = 0;
// the algorithm factor that is determined based on the amount of products that are involved
var prodsCount = 0;
const prods: any = [];

const createDate = (fullDate: string | undefined) => {
  if (typeof fullDate === 'string') {
    const day = parseInt(fullDate.substr(0, 2));
    const month = parseInt(fullDate.substr(3, 2)) - 1;
    // subtract one because javascript month is from 0 to 11
    const year = parseInt(fullDate.substr(6, 4));
    const hour = parseInt(fullDate.substr(11, 2));
    const minute = parseInt(fullDate.substr(14, 2));
    console.log('Date Used: ' + fullDate);
    return new Date(year, month, day, hour, minute);
  } else {
    return new Date();
  }
};
const currentDate: Date = createDate(process.env.DATE);

export const loadProds = (_req: any, res: any) => {
  const counter: any = {};
  Orders.find({
    'Order Date': {
      $lte: currentDate, // the date has to be before the current date
      $gte: new Date(currentDate.getTime() - 172800000), // date is within 48 hours
    },
  })
    .then((orders: any[]) => {
      orders.forEach((order: IOrder) => {
        const item = order['Item Name'];
        algoFactor += order.Quantity;
        // create a tally of each products
        if (item in counter) {
          const oldDate = counter[item].date;
          counter[item] = {
            count: counter[item].count + order.Quantity,
            date: oldDate > order['Order Date'] ? oldDate : order['Order Date'],
          };
        } else {
          counter[item] = {
            count: order.Quantity,
            date: order['Order Date'],
          };
          prodsCount += 1;
        }
      });
      algoFactor = algoFactor / prodsCount;
      Object.keys(counter).forEach((item) => {
        if (item in counter) {
          const timeDiff = currentDate.valueOf() - counter[item].date.valueOf();
          prods.push({
            ...counter[item],
            item: item,
            heuristic: counter[item].count - genHours(timeDiff),
            minsDiff: genMins(timeDiff),
          });
        }
      });
      prods.sort((a: any, b: any) => {
        return a.heuristic - b.heuristic;
      });
      res.json({ results: getProdsPart() });
    })
    .catch((err: string) => res.status(400).json('Error: ' + err));
};

const genHours = (diff: number) => {
  const hoursDiff = diff / 3600000; // time difference in hours
  return hoursDiff / algoFactor;
};

const genMins = (diff: number) => {
  // time difference in minutes
  return diff / 60000;
};

const getProdsPart = () => {
  // splice the array and return the 10 most trendy products
  if (prods.length < 10) {
    return prods.splice(-prods.length).reverse();
  } else {
    return prods.splice(-10).reverse();
  }
};

export const getMore = (_req: any, res: any) => {
  // return more product based on trendiness
  res.json({ results: getProdsPart() });
};
