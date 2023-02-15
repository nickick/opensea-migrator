import React, { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  background?: string;
  border?: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  style?: CSSProperties;
};

const Button = ({
  background,
  border,
  children,
  className,
  onClick,
  style,
}: ButtonProps) => {
  const classNames = twMerge(
    background,
    border,
    className,
    'rounded backdrop-blur-2 text-white backdrop-blur-xl whitespace-nowrap py-2 px-8'
  );
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
