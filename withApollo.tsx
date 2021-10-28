import { 
  NextPage,
} from "next";

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import {
  NextApiRequestCookies,
  // @ts-ignore This path is generated at build time and conflicts otherwise
} from 'next-server/server/api-utils';
import { IncomingMessage } from "http";

export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
};

// eslint-disable-next-line react/display-name
export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};

export const getApolloClient = (
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  if (ctx && ctx.req) {
    let { req } = ctx;
    // Do something with the cookies here, maybe add a header for authentication 
    req.cookies 
  }

  const httpLink = createHttpLink({
    uri: "http://localhost:3000/api/graphql",
    fetch,
  });
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};