import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
var cc = require('currency-codes');


const app = express();
const port = 4000;

function isValidOrderId(id: string | null): boolean {
  return (!id || Math.random() < 0.9);
}

function isValidCurrencyCode(currencyCode: string | null): boolean {
  return typeof currencyCode === 'string' && !!cc.code(currencyCode);
}

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint 1: GET /order/:id/pricing?currencyCode=?
app.get('/order/:id/pricing', (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidOrderId(id)) {
    return res.status(404).send('OrderID not found');
  }

  const { currencyCode } = req.query;

  if (typeof currencyCode !== 'string' || !isValidCurrencyCode(currencyCode)) {
    return res.status(404).send('CurrencyCode not valid');
  }

  const randomPrice = Math.random() * 100;
  const price = parseFloat(randomPrice.toFixed(2));
  res.json({ orderId: id, currencyCode, price });
});

// Endpoint 2: GET /order/:id/status
app.get('/order/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidOrderId(id)) {
    return res.status(404).send('OrderID not found');
  }
  
  const possibleStatuses = ['DELIVERED', 'NEW', 'DELIVERING', 'IN_TRANSIT', 'COLLECTING'];
  const randomIndex = Math.floor(Math.random() * possibleStatuses.length);
  const status = possibleStatuses[randomIndex];
  res.json({ orderId: id, status });
});

// Endpoint 3: GET /order/:id/package-types
app.get('/order/:id/package-types', (req: Request, res: Response) => {
  const { id } = req.params;
  if (!isValidOrderId(id)) {
    return res.status(404).send('OrderID not found');
  }

  const possibleTypes = ['PALLET', 'BOX', 'ENVELOPE'];
  const types = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    const randomIndex = Math.floor(Math.random() * possibleTypes.length);
    types.push(possibleTypes[randomIndex]);
  }
  res.json({orderId: id, types });
});

// Simulate random timeouts on some requests
app.use((req: Request, res: Response, next: () => void) => {
  if (Math.random() < 0.1) {
    setTimeout(() => next(), Math.floor(Math.random() * 5000));
  } else {
    next();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
