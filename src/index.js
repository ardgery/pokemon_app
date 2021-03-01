import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'styles/common.scss';
import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'https://goofy-noyce-6f3fb6.netlify.app/.netlify/functions/api',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('app')
);

module.hot.accept();
