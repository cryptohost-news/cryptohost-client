import React from 'react';

import { loadCurrentPost } from '@/app/servises/news/loadCurrentPost';
import loadPosts from '@/app/servises/news/loadPosts';
import Article from '@/entities/Article';
import Post from '@/entities/Post';
import Breadcrumbs from '@/features/Breadcrumbs';
import ButtonLink from '@/shared/ui/ButtonLink';
import Layout from '@/shared/ui/Layout';
import PostGrid from '@/shared/ui/PostGrid';
import Section from '@/shared/ui/Section';
import Title from '@/shared/ui/Title';
import Subscribe from '@/widgets/Subscribe';

import styles from './styles.module.scss';

const POSTS_TO_LOAD = 6;

const CurrentPost = (props) => {
  const { post, sameCategoryPosts } = props;
  // const { title, category, categorySlug, publishedDate, image, slug, body } = post;

  const paths = [
    { name: 'Главная', url: '/' },
    { name: 'Новости', url: '/news' },
    { name: post.title, url: `/news/${post.slug}` },
  ];

  return (
    <Layout>
      <Breadcrumbs paths={paths}></Breadcrumbs>
      <Section noTopPadding={true}>
        <Article post={post} directory={'news'}></Article>
      </Section>
      <Section>
        <Title color={'purple'}>Может быть интересно</Title>
        <PostGrid hasMainPost={false}>
          {sameCategoryPosts.map((p) => (
            <Post key={p.id} {...p} directory={'news'} />
          ))}
        </PostGrid>
        <ButtonLink href={'/news'} className={styles.currentPostMoreBtn}>
          Ко всем новостям →
        </ButtonLink>
      </Section>
      <Section>
        <Subscribe />
      </Section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await fetchPostsPaths();

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const post = await loadCurrentPost(slug);
  const { posts: sameCategoryPosts } = await loadPosts(1, POSTS_TO_LOAD, [post.category_id], [post.id]);

  // console.log('sameCategoryPosts', sameCategoryPosts);

  return {
    props: {
      post,
      sameCategoryPosts,
    },
    revalidate: 60,
  };
}

export default CurrentPost;
