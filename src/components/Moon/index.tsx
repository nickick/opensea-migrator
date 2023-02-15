import Image from 'next/future/image';
import React from 'react';
import styles from './moon.module.css';

const Moon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/moon.png"
      alt="Moon graphic"
      className={`${className} ${styles.moon}`}
      height={70}
      width={70}
    />
  );
};

export default Moon;
