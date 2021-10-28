import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../withApollo';
export async function getServerPageGetBooks
    (options: Omit<Apollo.QueryOptions<Types.GetBooksQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetBooksQuery>({ ...options, query: Operations.GetBooksDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetBooks = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetBooksQuery, Types.GetBooksQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetBooksDocument, options);
};
export type PageGetBooksComp = React.FC<{data?: Types.GetBooksQuery, error?: Apollo.ApolloError}>;
export const withPageGetBooks = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetBooksQuery, Types.GetBooksQueryVariables>) => (WrappedComponent:PageGetBooksComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetBooksDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetBooks = {
      getServerPage: getServerPageGetBooks,
      withPage: withPageGetBooks,
      usePage: useGetBooks,
    }
export async function getServerPageHome
    (options: Omit<Apollo.QueryOptions<Types.HomePageQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.HomePageQuery>({ ...options, query: Operations.HomePageDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useHome = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.HomePageQuery, Types.HomePageQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.HomePageDocument, options);
};
export type PageHomeComp = React.FC<{data?: Types.HomePageQuery, error?: Apollo.ApolloError}>;
export const withPageHome = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.HomePageQuery, Types.HomePageQueryVariables>) => (WrappedComponent:PageHomeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.HomePageDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrHome = {
      getServerPage: getServerPageHome,
      withPage: withPageHome,
      usePage: useHome,
    }

export async function getServerPageGetMovies
    (options: Omit<Apollo.QueryOptions<Types.GetMoviesQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetMoviesQuery>({ ...options, query: Operations.GetMoviesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetMovies = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetMoviesQuery, Types.GetMoviesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetMoviesDocument, options);
};
export type PageGetMoviesComp = React.FC<{data?: Types.GetMoviesQuery, error?: Apollo.ApolloError}>;
export const withPageGetMovies = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetMoviesQuery, Types.GetMoviesQueryVariables>) => (WrappedComponent:PageGetMoviesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetMoviesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetMovies = {
      getServerPage: getServerPageGetMovies,
      withPage: withPageGetMovies,
      usePage: useGetMovies,
    }