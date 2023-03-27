import React, { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  background?: string;
  border?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  style?: CSSProperties;
};

const Button = ({
  background = 'bg-white bg-opacity-10',
  border = 'border border-[#34B9E5]',
  children,
  className,
  disabled,
  onClick,
  style,
}: ButtonProps) => {
  const classNames = twMerge(
    'rounded backdrop-blur-2 text-white backdrop-blur-xl whitespace-nowrap py-2 px-8 disabled:cursor-not-allowed',
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
    </button>
  );
};

export default Button;
