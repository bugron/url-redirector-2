import { JSX } from 'preact'

interface IconButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {}

export const IconButton = ({
  disabled = false,
  className = '',
  children,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      className={`p-2 rounded-full ${
        disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
      } ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
