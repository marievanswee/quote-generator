import {useState} from 'react';
import {User} from '../models/User';
import {Quote} from '../models/Quote';

const apiPrefix: string = process.env.API_PREFIX ?? 'http://localhost:3030/';

export function useAuthenticate() {
  const [loading, setLoading] = useState<boolean>(false);

  const authenticate = async (user: User): Promise<string> => {
    setLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          username: user.username,
          password: user.password,
        }
      )
    };

    try {
      const response: Response = await fetch(`${apiPrefix}auth`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      return data.token;
    } finally {
      setLoading(false);
    }
  };

  return { authenticate, loading };
}

export function useNextQuotes() {
  const [loading, setLoading] = useState<boolean>(false);

  const nextQuotes = async (filters: string): Promise<Quote[]> => {
    setLoading(true);

    try {
      const response: Response = await fetch(`${apiPrefix}${filters}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const data = await response.json();
      return data.quotes;
    } finally {
      setLoading(false);
    }
  };

  return { nextQuotes, loading };
}
