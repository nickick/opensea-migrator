import React, { CSSProperties } from 'react';
import shinyStyle from './shiny.module.css';
import Button from '../Button';

type ShinyButtonProps = {
  background?: string;
  border?: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  style?: CSSProperties;
};

const ShinyButton = ({
  background,
  border,
  children,
  className,
  onClick,
  style,
}: ShinyButtonProps) => {
  return (
    <Button
      onClick={onClick}
      background={background}
      border={border}
      className={`${className} ${shinyStyle.connectButton} ${shinyStyle.glowEffect}`}
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
    </Button>
  );
};

export default ShinyButton;
