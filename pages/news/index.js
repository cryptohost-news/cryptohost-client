import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import loadCategories from '@/app/servises/categories/loadCategories';
import loadPosts from '@/app/servises/news/loadPosts';
import MainPost from '@/entities/MainPost';
import Post from '@/entities/Post';
import Breadcrumbs from '@/features/Breadcrumbs';
import Categories from '@/features/Categories';
import useContentLoader from '@/shared/hooks/useContentLoader';
import Button from '@/shared/ui/Button';
import Layout from '@/shared/ui/Layout';
import PageDescriptor from '@/shared/ui/PageDescriptor';
import PostGrid from '@/shared/ui/PostGrid';
import Preloader from '@/shared/ui/Preloader';
import Section from '@/shared/ui/Section';
import Title from '@/shared/ui/Title';
import { addPosts, setCategories, setLoadedCount, setPosts } from '@/slices/postsSlice';
import Subscribe from '@/widgets/Subscribe';

import styles from './styles.module.scss';

const LOAD_MORE_STEP = 6;

const News = (props) => {
  const paths = [
    { name: 'Главная', url: '/' },
    { name: 'Новости', url: '/news' },
  ];

  const { initialPosts, total, categoriesList, currentPostsCategories } = props;
  const dispatch = useDispatch();

  const router = useRouter();
  const { category } = router.query;
  const initCategory = category || [];

  useEffect(() => {
    dispatch(
      setPosts({
        posts: initialPosts,
        total,
        categories: currentPostsCategories,
      }),
    );
    dispatch(setCategories(initCategory));
    dispatch(setLoadedCount(LOAD_MORE_STEP + 1));
  }, [dispatch, initialPosts]);

  const { posts, categories: currentCategories, total: totalPosts, loaded } = useSelector((state) => state.postsData);
  const mainPost = posts[0] || initialPosts[0];

  const { loading, loadData } = useContentLoader(
    'posts',
    'news-posts',
    LOAD_MORE_STEP,
    (count) => dispatch(setLoadedCount(count)),
    (entities) => dispatch(addPosts(entities)),
    {
      categoryIds: JSON.stringify(currentCategories),
      excludeIds: JSON.stringify([initialPosts[initialPosts.length - 1].id]),
    },
  );

  const isLoadButton = totalPosts > loaded;

  return (
    <>
      <Head>
        <title>Новости</title>
        <meta
          name="description"
          content="Crypto-host - все, что нужно знать о блокчейн и криптовалютах простыми словами. Обучающие статьи для новичков, свежие новости, обзоры проектов и другое!"
        />
        <meta name="image" content="/logo.png" />

        <link rel="canonical" href="https://crypto-host.net/news" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="CRYPTOHOST" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="CRYPTOHOST — новости" />
        <meta property="og:description" content="CRYPTOHOST — самые актуальные новости мира криптовалют" />
        <meta property="og:url" content="https://crypto-host.net/news" />
        <meta property="og:image" content="https://crypto-host.net/logo.png" />
        <meta property="og:image:secure_url" content="https://crypto-host.net/logo.png" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="640" />
      </Head>
      <Layout>
        <Breadcrumbs paths={paths}></Breadcrumbs>
        <Section noTopPadding={true}>
          <Title color={'purple'}>Текущие новости</Title>
          <PageDescriptor>
            Все, что актуально для крипторынка в 2023-ем и формирует тренды на 2024. Читайте новости ежедневно,
            подписывайтесь на{' '}
            <Link href={'https://t.me/+RS6x2BkK3zI1NWM0'} target="_blank">
              наш канал
            </Link>{' '}
            , чтобы не пропустить ни одной полезной новости.
          </PageDescriptor>
          <Categories categories={categoriesList} initCategory={initCategory} />
        </Section>

        <Section noTopPadding={true}>
          <PostGrid className={styles.newsPostGrid}>
            <MainPost {...mainPost} directory={'news'} />
            {posts.slice(1).map((post) => (
              <Post key={post.id} {...post} directory={'news'} />
            ))}

            {isLoadButton && (
              <Button onClick={loadData} disabled={loading}>
                Загрузить еще ↓
              </Button>
            )}
          </PostGrid>
        </Section>

        <Section>
          <Subscribe />
        </Section>
      </Layout>
      {loading && <Preloader isGLobal={true} />}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = context.query; // Получаем значение параметра запроса category
  const initCategory = category ? [category] : [];

  const postsData = await loadPosts(1, LOAD_MORE_STEP + 1, initCategory);
  const categories = await loadCategories();

  return {
    props: {
      initialPosts: postsData.posts,
      total: postsData.total,
      currentPostsCategories: initCategory,
      categoriesList: categories,
    },
  };

  /*const {
    loadedPosts,
    total,
    postsCategories: currentPostsCategories,
  } = await loadPosts(0, LOAD_MORE_STEP + 1, JSON.stringify(initCategory)); // на один пост больше, потому что еще есть главный пост   , JSON.stringify(initCategory)

  const { categories: categoriesList } = await loadCategories();
  return {
    props: {
      initialPosts: loadedPosts,
      total,
      currentPostsCategories,
      categoriesList,
    },
  };*/
};

export default News;
