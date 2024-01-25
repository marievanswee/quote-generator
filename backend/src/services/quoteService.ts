import {QuoteFilters} from '../models/QuoteFilters';
import axios, {AxiosResponse} from 'axios';
import {Quote} from '../models/Quote';
import {createPathFilters} from '../utils/functions';

export class QuoteService {

  private static readonly apiUrl: string = process.env.API_URL ?? 'https://api.quotable.io/quotes/random';
  public static async fetchQuotes(filters: QuoteFilters): Promise<Quote[]> {
    let pathFilters: string = createPathFilters(filters);
    console.log({pathFilters});
    console.log(`${QuoteService.apiUrl}${pathFilters}`);
    try {
      const response: AxiosResponse = await axios.get<Quote[]>(`${QuoteService.apiUrl}${pathFilters}`)
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }

}
