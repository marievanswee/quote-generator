import {QuoteFilters} from '../models/QuoteFilters';
import {stringify} from 'querystring';

export function createPathFilters(filters: QuoteFilters): string {
  const queryParams: Record<string, any> = {};

  if(filters.limit) {
    queryParams.limit = filters.limit;
  }
  if(filters.author) {
    queryParams.author = filters.author;
  }
  if(filters.maxLength) {
    queryParams.maxLength = filters.maxLength;
  }
  if(filters.minLength) {
    queryParams.minLength = filters.minLength;
  }
  if(filters.tags) {
    queryParams.tags = filters.tags;
  }
  return stringify(queryParams) ? '?'+stringify(queryParams) : '';
}

export function generateToken(): string {
  const characters: string ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let token: string = ' ';
  const charactersLength: number = characters.length;
  for ( let i = 0; i < charactersLength; i++ ) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
}
