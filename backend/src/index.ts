import { Request, Response } from 'express';
import {generateToken} from './utils/functions';
import {QuoteService} from './services/quoteService';
import {QuoteFilters} from './models/QuoteFilters';
import {Quote} from './models/Quote';
import {DatabaseService} from './services/databaseService';
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port: string = process.env.PORT ?? '3030';

app.use(cors());
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  let filters: QuoteFilters = req.query as QuoteFilters;
  console.log({filters});
  let quotes: Quote[] = await QuoteService.fetchQuotes(filters)
  res.send({quotes: quotes});
});

app.post('/auth', async (req: Request, res: Response) => {
  const {username, password} = req.body;
  const isValidUser = DatabaseService.findOne({username, password});
  if(isValidUser) {
    res.json({token: generateToken()});
  } else {
    res.status(404).json({error: 'Not found'});
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
