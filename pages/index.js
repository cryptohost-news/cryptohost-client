import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import loadCategories from '@/app/servises/news/loadPosts';
import loadPromoBanner from '@/app/servises/promo-banners/loadPromoBanner';
import MainPost from '@/entities/MainPost';
import Post from '@/entities/Post';
import ButtonLink from '@/shared/ui/ButtonLink';
import Layout from '@/shared/ui/Layout';
import PostGrid from '@/shared/ui/PostGrid';
import Section from '@/shared/ui/Section';
import Title from '@/shared/ui/Title';
import { setPosts } from '@/slices/postsSlice';
import { setPromoBanner } from '@/slices/promoBannerSlice';
import CurrencyRates from '@/widgets/CurrencyRates';
import Promo from '@/widgets/Promo';
import Subscribe from '@/widgets/Subscribe';

const POSTS_TO_SHOW = 6;

const Home = (props) => {
  const { promoBanner, initialPosts, total } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPromoBanner(promoBanner));
  }, [dispatch, promoBanner]);

  useEffect(() => {
    dispatch(setPosts({ posts: initialPosts, total }));
  }, [dispatch, promoBanner]);

  return (
    <>
      <Head>
        <title>Cryptohost</title>
        <meta
          name="description"
          content="CRYPTOHOST — все, что нужно знать о блокчейн и криптовалютах простыми словами. Обучающие статьи для новичков, свежие новости, обзоры проектов и другое!"
        />
        <meta name="image" content="/logo.png" />

        <link rel="canonical" href="https://crypto-host.net/" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="CRYPTOHOST" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="CRYPTOHOST — крипто-блокчейн медиа" />
        <meta
          property="og:description"
          content="CRYPTOHOST — все, что нужно знать о блокчейн и криптовалютах простыми словами. Обучающие статьи для новичков, свежие новости, обзоры проектов и другое!"
        />
        <meta property="og:url" content="https://crypto-host.net/" />
        <meta property="og:image" content="https://crypto-host.net/logo.png" />
        <meta property="og:image:secure_url" content="https://crypto-host.net/logo.png" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="640" />
      </Head>

      <Layout isHomePage={true}>
        <Section>
          <Promo />
        </Section>
        <Section>
          <CurrencyRates />
        </Section>
        <Section>
          <Title color={'purple'}>Текущие новости</Title>
          <PostGrid>
            <MainPost {...initialPosts[0]} directory={'news'} />
            {initialPosts.slice(1).map((post) => (
              <Post key={post.id} {...post} directory={'news'} />
            ))}
            <ButtonLink href={'/news'}>Ко всем новостям →</ButtonLink>
          </PostGrid>
        </Section>
        <Section>
          <Subscribe />
        </Section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const loadedPromoBanner = await loadPromoBanner();
  const postsData = await loadCategories(1, POSTS_TO_SHOW + 1); // на один пост больше, потому что еще есть главный пост

  // console.log('postsData', postsData)

  return {
    props: {
      promoBanner: loadedPromoBanner,
      initialPosts: postsData.posts,
      total: postsData.total,
    },
  };
};

export default Home;
