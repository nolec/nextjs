import React, {useContext, useEffect} from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import Context from "../Context";
import {GetServerSidePropsContext, NextPage} from "next";
import {useRouter} from "next/router";
import {ParsedUrlQuery} from "querystring";


const Header = styled.header``;
const Footer = styled.footer``;
interface IProps {
    title: any
}
const Layout: NextPage<IProps> = ({children,title}) => {

    const {keyword, headTitle,handleHeadTitle} = useContext(Context);
    const router = useRouter();
    useEffect(() => {
        handleHeadTitle(title)
    },[router.pathname])
    return (
        <>
            <Header>
                <Link href="/search/[keyword]" as={`/search/${keyword}`}>
                    <a>search_page</a>
                </Link>
            </Header>
            {children}
            <Footer></Footer>
        </>
    )
}

export const getServerSideProps = (ctx : GetServerSidePropsContext<ParsedUrlQuery>) => {
    const title = "검색페이지";
    return {props : {title}}
}
export default Layout;