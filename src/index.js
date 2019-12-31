import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";

import { createHttpLink } from "apollo-link-http";

import App from "./App";

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
  }),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
