export interface ButtonProps {
  title: string
}
export const Button = (props: {title: string, color: string, handleClick: () => void }) => {
  const {title, color, handleClick} = props;

  const handleButtonClick = () => {
    handleClick();
  }
  return (
      <div>
        <button className={`text-white ${color} font-medium rounded-full text-sm px-5 py-2.5 text-center`} onClick={handleButtonClick}>{title}</button>
      </div>
  )
}
