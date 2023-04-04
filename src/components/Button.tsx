import React, { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';
import Spinner from './Spinner';

type ButtonProps = {
  background?: string;
  border?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
  style?: CSSProperties;
};

const Button = ({
  background = 'bg-white bg-opacity-10',
  border = 'border border-borderColor',
  children,
  className,
  disabled,
  loading,
  onClick,
  style,
}: ButtonProps) => {
  const classNames = twMerge(
    'flex items-center rounded backdrop-blur-2 text-white backdrop-blur-xl whitespace-nowrap py-2 px-8 disabled:cursor-not-allowed',
    background,
    border,
    className
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames}
      style={style}
      disabled={disabled}
    >
      {children}
      {loading && <Spinner />}
    </button>
  );
};

export default Button;
