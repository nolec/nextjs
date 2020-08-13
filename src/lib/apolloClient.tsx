import { useMemo } from "react";
import { NormalizedCacheObject, IdGetterObj } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { BatchHttpLink } from "apollo-link-batch-http";

let apolloClient: ApolloClient<NormalizedCacheObject>;
const httpOptions = {
  uri: "http://localhost:5000/graphql",
  credentials: "same-origin",
  headers: {
    "keep-alive": "true",
  },
};
const httpLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink(httpOptions),
  new BatchHttpLink(httpOptions)
);
const resolvers = {
  Mutation: {
    saveFile: async (root, { file }) => {
      const { stream, mimetype } = await file;
      console.log(file);
    },
  },
};

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createUploadLink(httpOptions),
    // httpLink,
    // ApolloLink.from([
    //   onError(({ graphQLErrors, networkError, operation }) => {
    //     if (graphQLErrors)
    //       graphQLErrors.map(({ message, locations, path }) =>
    //         console.log(
    //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation : ${operation.variables.file.name}`
    //         )
    //       );
    //     if (networkError) console.log(`[Network error]: ${networkError}`);
    //   }),
    // ]),
    cache: new InMemoryCache({
      dataIdFromObject: (object: IdGetterObj) => object.id || null,
    }),
  });
};

export const initializeApollo = (initialState: any = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
