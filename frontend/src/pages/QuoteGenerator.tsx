import {Navigate, useNavigate} from 'react-router-dom';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {useState} from 'react';
import {Quote} from '../models/Quote';
import {useNextQuotes} from '../utils/hooks';
import {createPathFilters} from '../utils/functions';
import {Login} from './Login';

export const QuoteGenerator = () => {
  const navigate = useNavigate();
  const {nextQuotes} = useNextQuotes();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [number, setNumber] = useState<number>(1);
  const [author, setAuthor] = useState<string>('');
  const [minLength, setMinLength] = useState<number>(1);
  const [maxLength, setMaxLength] = useState<number>(1000);
  const [tags, setTags] = useState<string>('');

  if(!localStorage.getItem('token')) {
    return <Navigate to="/"/>
  }

  const handleNumberChange = (value: string) => {
    setNumber(Number(value));
  }

  const handleAuthorChange = (value: string) => {
    setAuthor(value);
  }

  const handleMinLengthChange = (value: string) => {
    setMinLength(Number(value));
  }

  const handleMaxLengthChange = (value: string) => {
    setMaxLength(Number(value));
  }

  const handleTagsChange = (value: string) => {
    setTags(value);
  }

  const handleNext = async () => {
    const pathFilters = createPathFilters({
      limit: number,
      maxLength: maxLength,
      minLength: minLength,
      tags: tags,
      author: author
    })
    const quotes: Quote[] = await nextQuotes(pathFilters);
    setQuotes(quotes);
  }

  const handleDisconnect = async () => {
    localStorage.clear();
    navigate('/');
  }

  return (
      <div className="p-12">
        <h4 className="text-center text-4xl">Quote generator</h4>
        <Button title="Disconnect" color="bg-red-400 hover:bg-red-500" handleClick={handleDisconnect}/>
        <div className="flex flex-col items-center justify-center">
          <div className="rounded shadow-lg">
            <div className="w-full">
              {quotes.length > 0 && (
                  <label className="text-xl">Nb quotes: {quotes.length}</label>
              )}
              {quotes.map((quote, index) => (
                  <div key={index} className="flex flex-col px-6 py-4 gap-4">
                    <div className="font-bold text-xl mb-2">Author: {quote.author}</div>
                    <p className="italic">
                      "{quote.content}"
                    </p>
                    <p>
                      Tags: {quote.tags.join(', ')}
                    </p>
                    <p>
                      Length: {quote.length}
                    </p>
                  </div>
              ))}
            </div>


            <div className="flex flex-col px-6 pt-4 pb-2 gap-4">
              <label className="text-xl font-semibold">Filters: </label>
              <div className="flex flex-row gap-4">
                <div>
                  <label>Number of quotes</label>
                  <Input type="number" defaultValue={number} handleChange={handleNumberChange}/>
                </div>
                <div>
                  <label>Author</label>
                  <Input type="text" defaultValue={author} handleChange={handleAuthorChange}/>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div>
                  <label>Minimal length of quote</label>
                  <Input type="number" defaultValue={minLength} handleChange={handleMinLengthChange}/>
                </div>
                <div>
                  <label>Maximal length of quote</label>
                  <Input type="number" defaultValue={maxLength} handleChange={handleMaxLengthChange}/>
                </div>
              </div>

              <div className="flex flex-col">
                <label>Tags</label>
                <label className="text-xs">Note: to have quote(s) matching with all tags, seperated them by a comma (,) but to have quote(s) matching with any one of the provided tags use a pipe (|)</label>
                <Input type="text" defaultValue={tags} handleChange={handleTagsChange}/>
              </div>

              <div className="flex flex-row gap-4">
                <Button title="Next" color="bg-green-400 hover:bg-green-500" handleClick={handleNext}/>

              </div>

            </div>
          </div>
        </div>

      </div>
  )
}
