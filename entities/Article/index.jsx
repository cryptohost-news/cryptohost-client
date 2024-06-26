import cl from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { baseUrl } from '@/routes';
import { formatDateTime } from '@/shared/lib/formatDateTime';
import Content from '@/shared/ui/Content';
import PixelizedImg from '@/shared/ui/PixelizedImg';
import Title from '@/shared/ui/Title';
import { setCategories } from '@/slices/postsSlice';

import styles from './index.module.scss';

const Article = (props) => {
  const { className, post, directory } = props;
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(formatDateTime(post.published_at));
  }, []);

  const maxLength = 150;
  const cleanedDescription =
    (post.description
      ? post.description.replace(/\s+/g, ' ').trim().substring(0, maxLength)
      : post.body.replace(/\s+/g, ' ').trim().substring(0, maxLength)) + (post.body.length > maxLength ? '...' : '');

  return (
    <>
      <Head>
        <title>{post.meta_title}</title>
        <meta name="description" content={`${cleanedDescription}`} />
        <meta name="image" content={`${baseUrl}/${post.image}`} />

        <link rel="canonical" href={`https://crypto-host.net/${directory}/${post.slug}`} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="CRYPTOHOST" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.meta_title} />
        <meta property="og:description" content={`${cleanedDescription}`} />
        <meta property="og:url" content={`https://crypto-host.net/${directory}/${post.slug}`} />
        <meta property="og:image" content={`${baseUrl}/${post.image}`} />
        <meta property="og:image:secure_url" content={`${baseUrl}/${post.image}`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="640" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle', // Изменили тип на "NewsArticle"
              headline: post.meta_title, // Используем заголовок новости
              description: cleanedDescription, // Используем описание новости
              url: `https://crypto-host.net/${directory}/${post.slug}`, // Устанавливаем URL страницы новости
              image: {
                '@type': 'ImageObject',
                url: `${baseUrl}/${post.image}`, // Используем изображение новости
                width: 800,
                height: 640,
              },
              datePublished: post.published_at, // Устанавливаем дату публикации новости
              dateModified: post.updated_at, // Устанавливаем дату последнего обновления новости (если есть)
              author: {
                '@type': 'Person',
                name: 'cryptohost', // Устанавливаем имя автора новости
              },
            }),
          }}
        />
      </Head>

      <article className={cl(className, styles.article)}>
        <Title className={styles.articleTitle}>{post.title}</Title>
        <div className={styles.articleInfo}>
          {post.category && (
            <>
              <Link
                className={styles.articleCategory}
                href={`/news?category=${post.category.id}`}
                onClick={() => dispatch(setCategories(post.category.id))}
              >
                {post.category.name}
              </Link>
              {' / '}
            </>
          )}
          <time>{date}</time>
        </div>
        <Link href={post.slug}>
          <PixelizedImg
            className={styles.articleImg}
            src={`${baseUrl}/${post.image}`}
            alt={''}
            pixelScale={20}
          ></PixelizedImg>
        </Link>
        <Content body={post.body} className={styles.articleContent} />
      </article>
    </>
  );
};

export default Article;
