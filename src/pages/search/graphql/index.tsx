import React from "react";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { initializeApollo } from "../../../lib/apolloClient";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

// const ALL_ARTICLE_QUERY = gql` {
//         articles(includeInvisible :true){
//             id
//             title
//             subtitle
//             squareThumbnail
//             rectangleThumbnail
//         }
//     }
// `;

const ALL_ARTICLE_QUERY = gql` {   
    getBarcodes([198142,198142]){
        goodsId
        options{
          categoryId
          optionId
          barcode{
            type
            title
            no
            optionTitle
          }
        }
    }
}
`;

const GraphTest = ({ initialApolloState, unstable_revalidate }: any) => {
  const [loadGreeting, { called, loading, data }] = useLazyQuery(
    ALL_ARTICLE_QUERY
  );
  if (called && loading) return <p>Loading ...</p>;
  if (!called) {
    return <button onClick={() => loadGreeting()}>Load greeting</button>;
  }
  return <div>{data.articles.map((item: any) => item.title)}</div>;
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  console.log(ctx);
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_ARTICLE_QUERY,
  });
  console.log(apolloClient.queryManager.dataStore);

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      unstable_revalidate: 1,
    },
  };
};

export default GraphTest;
