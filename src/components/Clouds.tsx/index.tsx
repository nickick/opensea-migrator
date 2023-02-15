import Image from 'next/future/image';
import React from 'react';
import styles from './clouds.module.css';

const Clouds = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/clouds.png"
      alt="Clouds graphic"
      className={`${className} ${styles.clouds}`}
      height={102}
      width={308}
    />
  );
};

export default Clouds;
