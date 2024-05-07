import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import loadActivities from '@/app/servises/activities/loadActivities';
import MainPost from '@/entities/MainPost';
import Post from '@/entities/Post';
import Breadcrumbs from '@/features/Breadcrumbs';
import useContentLoader from '@/shared/hooks/useContentLoader';
import Button from '@/shared/ui/Button';
import Layout from '@/shared/ui/Layout';
import PageDescriptor from '@/shared/ui/PageDescriptor';
import PostGrid from '@/shared/ui/PostGrid';
import Section from '@/shared/ui/Section';
import Title from '@/shared/ui/Title';
import { addActivities, setActivities, setLoadedCount } from '@/slices/activitiesSlice';
import Subscribe from '@/widgets/Subscribe';

import styles from './styles.module.scss';

const LOAD_MORE_STEP = 6;

const Activities = (props) => {
  const paths = [
    { name: 'Главная', url: '/' },
    { name: 'Криптоактивности', url: '/activities' },
  ];

  const { initialActivities, total } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivities({ activities: initialActivities, total }));
    dispatch(setLoadedCount(LOAD_MORE_STEP + 1));
  }, [dispatch, initialActivities, total]);

  const { activities, total: totalActivities, loaded } = useSelector((state) => state.activitiesData);
  const mainActivity = activities[0] || initialActivities[0];

  const { loading, loadData } = useContentLoader(
    'activities',
    LOAD_MORE_STEP,
    (count) => dispatch(setLoadedCount(count)),
    (entities) => dispatch(addActivities(entities)),
  );

  const isLoadButton = totalActivities > loaded;

  return (
    <>
      <Head>
        <title>Криптоактивности</title>
        <meta
          name="description"
          content="Crypto-host - все, что нужно знать о блокчейн и криптовалютах простыми словами. Обучающие статьи для новичков, свежие новости, обзоры проектов и другое!"
        />
        <meta name="image" content="/logo.png" />
      </Head>
      <Layout>
        <Breadcrumbs paths={paths}></Breadcrumbs>
        <Section noTopPadding={true}>
          <Title color={'purple'} className={styles.activitiesTitle}>
            Криптоактивности
          </Title>
          <PageDescriptor>
            Хотите бесплатно мем-койнов? Быть в контексте и следить за инфополем, особенно в крипте это важно. Но в
            двойне полезнее, если можно при этом не много заработать. Каждую неделю рандомно мы разыгрываем мем-коины.
          </PageDescriptor>
        </Section>

        <Section noTopPadding={true}>
          <PostGrid className={styles.activitiesPostGrid}>
            <MainPost {...mainActivity} directory={'activities'} />
            {activities.slice(1).map((activity) => (
              <Post key={activity.id} {...activity} directory={'activities'} />
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
    </>
  );
};

export const getServerSideProps = async () => {
  const { activities, total } = await loadActivities(1, LOAD_MORE_STEP + 1);

  return {
    props: {
      initialActivities: activities,
      total,
    },
  };
};

export default Activities;
