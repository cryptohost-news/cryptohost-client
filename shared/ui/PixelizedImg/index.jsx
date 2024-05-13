import cl from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import Pixelit from '@/shared/lib/pixelit';
import Card from '@/shared/ui/Card';

import styles from './index.module.scss';

// const PixelizedImage = (props) => {
//   const { className, src, alt, pixelScale } = props;
//   const imageRef = useRef();
//   const canvasRef = useRef();
//
//   // useEffect(() => {
//   //   if (src && imageRef.current && imageRef.current.complete) {
//   //     pixelizeImg(imageRef.current);
//   //   }
//   // }, []);
//
//   useEffect(() => {
//     if (src && imageRef.current && imageRef.current.complete) {
//       pixelizeImg(imageRef.current);
//     }
//   }, []);
//
//   const pixelizeImg = (img) => {
//     const px = new Pixelit({
//       from: img,
//       to: canvasRef.current,
//     });
//     let scale = pixelScale; // Начальный масштаб
//
//     px.setScale(scale).pixelate();
//
//     setInterval(() => {
//       scale = scale === pixelScale ? pixelScale - 1 : pixelScale;
//       px.setScale(scale).pixelate();
//     }, 800);
//   };
//
//   // console.log('src', src);
//
//   // return (
//   //   <Card className={cl(styles.image, className)}>
//   //     <img src={src} alt={alt} />
//   //   </Card>
//   // );
//
//   return (
//     <Card className={cl(styles.image, className)}>
//       <img ref={imageRef} src={src} alt={alt} onLoad={() => pixelizeImg(imageRef.current)} />
//       <canvas ref={canvasRef}></canvas>
//     </Card>
//   );
// };

const PixelizedImage = (props) => {
  const { className, src, alt, pixelScale } = props;
  const canvasRef = useRef();

  useEffect(() => {
    if (src) {
      pixelizeImg(src);
    }
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

      setInterval(() => {
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
