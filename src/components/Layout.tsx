import React, { useContext, useEffect, PropsWithChildren, Props } from "react";
import styled from "styled-components";
import Link from "next/link";
import Context from "../Context";
import { GetServerSidePropsContext, NextComponentType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const Header = styled.header``;
const Footer = styled.footer``;
interface IProps {
  title: String;
  children: PropsWithChildren<Element[]>;
}
const Layout: NextComponentType<IProps> = ({ children }, { title }) => {
  const { keyword, headTitle, handleHeadTitle } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    handleHeadTitle(title);
  }, [router.pathname]);
  return (
    <>
      <Header>
        <Link href="/search/[keyword]" as={`/search/${keyword}`}>
          <a>search_page</a>
        </Link>
        <Link href="/search/graphql">
          <a>graphql_page</a>
        </Link>
      </Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export const getServerSideProps = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const title = "검색페이지";
  return { props: { title } };
};
export default Layout;
