import cl from 'classnames';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Pixelit from '@/shared/lib/pixelit';
import Card from '@/shared/ui/Card';

import styles from './index.module.scss';

const PixelizedImage = (props) => {
  const { className, src, alt, pixelScale } = props;
  const imageRef = useRef();
  const canvasRef = useRef();

  // useEffect(() => {
  //   if (src && imageRef.current && imageRef.current.complete) {
  //     pixelizeImg(imageRef.current);
  //   }
  // }, []);

  const pixelizeImg = (img) => {
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

  console.log('src', src);

  return (
    <Card className={cl(styles.image, className)}>
      <img src={src} alt={alt} />
    </Card>
  );

  // return (
  //   <Card className={cl(styles.image, className)}>
  //     <img ref={imageRef} src={src} alt={alt} onLoad={() => pixelizeImg(imageRef.current)} />
  //     <canvas ref={canvasRef}></canvas>
  //   </Card>
  // );
};

export default PixelizedImage;


/*import cl from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import Pixelit from '@/shared/lib/pixelit';
import Card from '@/shared/ui/Card';

import styles from './index.module.scss';

const PixelizedImage = (props) => {
  const { className, src, alt, pixelScale } = props;
  const imageRef = useRef();
  const canvasRef = useRef();

  // useEffect(() => {
  //   if (src && imageRef.current && imageRef.current.complete) {
  //     pixelizeImg(imageRef.current);
  //   }
  // }, []);

  useEffect(() => {
    if (src && imageRef.current && imageRef.current.complete) {
      pixelizeImg(imageRef.current);
    }
  }, []);

  const pixelizeImg = (img) => {
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

  // console.log('src', src);

  // return (
  //   <Card className={cl(styles.image, className)}>
  //     <img src={src} alt={alt} />
  //   </Card>
  // );

  return (
    <Card className={cl(styles.image, className)}>
      <img ref={imageRef} src={src} alt={alt} onLoad={() => pixelizeImg(imageRef.current)} />
      <canvas ref={canvasRef}></canvas>
    </Card>
  );
};

// const PixelizedImage = (props) => {
//   const { className, src, imgSize = 'lg' } = props;
//
//   const imgSrc = new URL(src);
//   const imgPath = imgSrc.pathname.substring(0, imgSrc.pathname.lastIndexOf('/') + 1);
//   const imgNameWithExt = imgSrc.pathname.split('/').pop();
//   const imgName = imgNameWithExt.substring(0, imgNameWithExt.lastIndexOf('.'));
//   const imgExt = imgNameWithExt.substring(imgNameWithExt.lastIndexOf('.') + 1);
//
//   const pixelizedImgSrc1 = `${imgSrc.origin}${imgPath}${imgName}-${imgSize}-0.${imgExt}`;
//   const pixelizedImgSrc2 = `${imgSrc.origin}${imgPath}${imgName}-${imgSize}-1.${imgExt}`;
//
//   const [currentImage, setCurrentImage] = useState(pixelizedImgSrc1);
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevImage) => (prevImage === pixelizedImgSrc1 ? pixelizedImgSrc2 : pixelizedImgSrc1));
//     }, 800);
//
//     return () => clearInterval(interval);
//   }, [pixelizedImgSrc1, pixelizedImgSrc2]);
//
//   return (
//     <Card className={cl(styles.image, className)}>
//       <img src={currentImage} alt="cover" />
//     </Card>
//   );
// };

export default PixelizedImage;*/
