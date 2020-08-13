import React from "react";
import ContextProvider from "../ContextProvider";
import GlobalStyle from "../components/Globalstyle";
import {Router} from "next/dist/client/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import {ApolloProvider} from "@apollo/react-hooks";
import {useApollo} from "../lib/apolloClient";
import {NextComponentType} from "next";
import {AppContext, AppInitialProps, AppProps} from "next/app";

NProgress.configure({showSpinner: false, trickleSpeed: 300})

Router.events.on('routeChangeStart', () => {
    NProgress.start();
})

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
})

Router.events.on('routeChangeError', () => {
    NProgress.done();
})

const MyApp : NextComponentType<AppContext, AppInitialProps, AppProps>  = ({Component, pageProps}) => {
    const apolloClient = useApollo(pageProps.initialApolloState);
    console.log(pageProps)
    return (
        <ApolloProvider client={apolloClient}>
            <ContextProvider>
                <GlobalStyle/>
                <Component {...pageProps}/>
            </ContextProvider>
        </ApolloProvider>
    )
}

export default MyApp;