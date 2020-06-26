import React from "react";
import {
    GetStaticPropsContext,
    NextPage,
} from "next";
import {useRouter} from "next/router";
import {ParsedUrlQuery} from "querystring";


const DetailPage: NextPage = ({datalist}: any) => {
    const {query,isFallback} = useRouter();
    console.log(isFallback)
    if(isFallback){
        return <div>...loading</div>
    }
    return <div>{query.id}디테일입니다.</div>
}

export const getStaticProps = (ctx: GetStaticPropsContext<ParsedUrlQuery>) => {
    console.log(ctx.params?.id as string | undefined)
    return {props: {datalist: []}}
}
export const getStaticPaths = () => {
    return {paths: [{params: {id: "216297"}}], fallback: true}
}
export default DetailPage;