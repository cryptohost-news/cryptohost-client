import cl from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import Pixelit from '@/shared/lib/pixelit';
import Card from '@/shared/ui/Card';

import styles from './index.module.scss';

const PixelizedImage = (props) => {
  const { className, src, alt, pixelScale } = props;
  const canvasRef = useRef();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (src) {
      pixelizeImg(src);
    }

    // Очистка интервала при размонтировании компонента
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [src]);

  const pixelizeImg = (imageSrc) => {
    const img = new Image();
    img.onload = () => {
      const px = new Pixelit({
        from: img,
        to: canvasRef.current,
      });
      let scale = pixelScale; // Начальный масштаб

      px.setScale(scale).pixelate();

      // Очистка предыдущего интервала перед установкой нового
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        scale = scale === pixelScale ? pixelScale - 1 : pixelScale;
        px.setScale(scale).pixelate();
      }, 800);
    };
    img.src = imageSrc;
  };

  return (
    <Card className={cl(styles.image, className)}>
      <canvas ref={canvasRef} alt={alt}></canvas>
    </Card>
  );
};

export default PixelizedImage;
