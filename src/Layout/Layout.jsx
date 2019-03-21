import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { SharedHeader } from './Header';
import { SharedFooter } from './Footer/Footer';

const { Header, Footer, Content } = Layout;

export const SharedLayout = ({ children }) => (
  <Layout>
    <Header>
      <SharedHeader />
    </Header>
    <Content>{children}</Content>
    <Footer>
      <SharedFooter />
    </Footer>
  </Layout>
);

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
