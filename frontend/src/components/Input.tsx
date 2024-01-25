import {ChangeEvent} from 'react';

export const Input = (props: {type: string, defaultValue: string|number, handleChange: (value:string) => void}) => {
  const { type, defaultValue, handleChange} = props;

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  }

  return (
      <div>
        <input className="border-2 rounded text-lg p-1 w-full" type={type} defaultValue={defaultValue} onChange={handleChangeInput}/>
      </div>
  )
}
