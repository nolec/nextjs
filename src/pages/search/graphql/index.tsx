import React from "react";
import {GetServerSidePropsContext} from "next";
import {ParsedUrlQuery} from "querystring";
import {initializeApollo} from "../../../lib/apolloClient";
import gql from "graphql-tag";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import Meta from "../../../partials/Meta";

const ALL_ARTICLE_QUERY = gql` {
    articles(includeInvisible :true){
        id
        title
        subtitle
        squareThumbnail
        rectangleThumbnail
    }
}
`;

// const ALL_ARTICLE_QUERY = gql` {
//     getBarcodes([198142,198142]){
//         goodsId
//         options{
//           categoryId
//           optionId
//           barcode{
//             type
//             title
//             no
//             optionTitle
//           }
//         }
//     }
// }
// `;
interface IProps {
    initialApolloState: {}
    title: string
}

const GraphTest = ({initialApolloState, title}: IProps) => {
    const [loadGreeting, {called, loading, data}] = useLazyQuery(
        ALL_ARTICLE_QUERY
    );
    if (called && loading) return <p>Loading ...</p>;
    if (!called) {
        return (
            <>
                <Meta title={title}/>
                <div>
                    <button onClick={() => loadGreeting()}>Load greeting</button>
                </div>
            </>
        );
    }
    return (
        <>
            <Meta title={title}/>
            <div>{data.articles.map((item: any) => item.title)}</div>
        </>);
};

export const getServerSideProps = async (
    ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
    const apolloClient = initializeApollo();

    return {
        props: {
            title: "hello",
            initialApolloState: apolloClient.cache.extract(),
            unstable_revalidate: 1,
        },
    };
};

export default GraphTest;
