import React from 'react';

import Layout from '@/shared/ui/Layout';
import NotFoundBlock from '@/shared/ui/NotFoundBlock';
import Section from '@/shared/ui/Section';

const NotFound = () => {
  return (
    <Layout>
      <Section>
        <NotFoundBlock />
      </Section>
    </Layout>
  );
};

export default NotFound;
