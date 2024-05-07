import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { baseUrl } from '@/routes';
import { formatDateTime } from '@/shared/lib/formatDateTime';
import PixelizedImg from '@/shared/ui/PixelizedImg';
import Title from '@/shared/ui/Title';
import { setCategories } from '@/slices/postsSlice';

import styles from './index.module.scss';

const Post = (props) => {
  const { title, category, published_at: publishedDate, image, slug, directory = 'news', description } = props;
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(formatDateTime(publishedDate));
  }, []);

  const dispatch = useDispatch();

  return (
    title && (
      <div className={styles.post}>
        <Link href={`/${directory}/${encodeURIComponent(slug)}`}>
          <PixelizedImg className={styles.postImg} src={`${baseUrl}/${image}`} alt={''} pixelScale={11}></PixelizedImg>
        </Link>
        <div className={styles.postInner}>
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
          <p className={styles.postText}>{`${description.substring(0, 150)} ...`}</p>
        </div>
      </div>
    )
  );
};

export default Post;
