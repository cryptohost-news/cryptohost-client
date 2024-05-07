import React from 'react';

import { fetchActivitiesPaths, loadCurrentActivity } from '@/app/servises/activities/loadCurrentActivity';
import Article from '@/entities/Article';
import Breadcrumbs from '@/features/Breadcrumbs';
import Layout from '@/shared/ui/Layout';
import Section from '@/shared/ui/Section';
import Subscribe from '@/widgets/Subscribe';

const CurrentPost = (props) => {
  const { activity } = props;

  const paths = [
    { name: 'Главная', url: '/' },
    { name: 'Криптоактивности', url: '/activities' },
    { name: activity.title, url: `/activities/${activity.slug}` },
  ];

  return (
    <Layout>
      <Breadcrumbs paths={paths}></Breadcrumbs>
      <Section noTopPadding={true}>
        <Article post={activity} directory={'activities'}></Article>
      </Section>
      <Section>
        <Subscribe />
      </Section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await fetchActivitiesPaths();

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const activity = await loadCurrentActivity(slug);

  return {
    props: {
      activity,
    },
  };
}

export default CurrentPost;
