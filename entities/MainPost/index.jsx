import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { baseUrl } from '@/routes';
import { formatDateTime } from '@/shared/lib/formatDateTime';
import ButtonLink from '@/shared/ui/ButtonLink';
import PixelizedImg from '@/shared/ui/PixelizedImg';
import Title from '@/shared/ui/Title';
import { setCategories } from '@/slices/postsSlice';

import styles from './index.module.scss';

const MainPost = (props) => {
  const {
    className,
    index,
    title,
    category,
    published_at: publishedDate,
    image,
    slug,
    body,
    description,
    directory,
  } = props;
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(formatDateTime(publishedDate));
  }, []);

  const dispatch = useDispatch();

  const [maxCharacters, setMaxCharacters] = useState(400);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1200 && window.innerWidth > 992) {
        setMaxCharacters(200);
      } else {
        setMaxCharacters(400);
      }
    }

    window.addEventListener('resize', handleResize);

    // Убираем слушатель событий при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив зависимостей гарантирует, что этот эффект будет выполнен только при монтировании компонента

  return (
    title && (
      <div className={styles.post}>
        <Link href={`/${directory}/${encodeURIComponent(slug)}`}>
          <PixelizedImg className={styles.postImg} src={`${baseUrl}/${image}`} alt={''} pixelScale={14}></PixelizedImg>
        </Link>
        <div className={styles.postInner}>
          <div>
            <div className={styles.postInfo}>
              {category && (
                <>
                  <Link
                    className={styles.postCategory}
                    href={`/${directory}?category=${category.id}`}
                    onClick={() => dispatch(setCategories(category.id))}
                  >
                    {category.name}
                  </Link>
                  {' / '}
                </>
              )}
              {date}
            </div>
            <Link href={`/${directory}/${encodeURIComponent(slug)}`}>
              <Title type={'small'} className={styles.postTitle}>
                {title}
              </Title>
            </Link>
            <p className={styles.postText}>{description}</p>
          </div>

          <ButtonLink className={styles.postButton} href={`/${directory}/${encodeURIComponent(slug)}`}>
            Читать →
          </ButtonLink>
        </div>
      </div>
    )
  );
};

export default MainPost;
