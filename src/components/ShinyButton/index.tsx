import React, { CSSProperties } from 'react';
import shinyStyle from './shiny.module.css';
import { twMerge } from 'tailwind-merge';

type ShinyButtonProps = {
  background?: string;
  border?: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  style?: CSSProperties;
};

const ShinyButton = ({
  background = 'bg-white bg-opacity-10',
  border = 'border border-[#34B9E5]',
  children,
  className,
  onClick,
  style,
}: ShinyButtonProps) => {
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
      className={`${classNames} ${shinyStyle.connectButton} ${shinyStyle.glowEffect}`}
      style={style}
    >
      {children}
      <svg className={`${shinyStyle.glowContainer}`}>
        <rect
          pathLength="100"
          strokeLinecap="round"
          className={`${shinyStyle.glowBlur}`}
        ></rect>
        <rect
          pathLength="100"
          strokeLinecap="round"
          className={`${shinyStyle.glowLine}`}
        ></rect>
      </svg>
    </button>
  );
};

export default ShinyButton;
