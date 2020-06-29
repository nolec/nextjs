import Head from "next/head";
import React from "react";
import {NextSeo, BreadcrumbJsonLd} from 'next-seo';

interface IProps {
    title: string
}

const Meta = ({title} : IProps) => {
    return (
        <>
            <NextSeo nofollow={true} title={title}
                     description="This example uses more of the available config options."
                     openGraph={{type: 'website', url: 'https://localhost:3000'}}/>
            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        position: 1,
                        name: 'Books',
                        item: 'https://example.com/books',
                    },
                    {
                        position: 2,
                        name: 'Authors',
                        item: 'https://example.com/books/authors',
                    },
                    {
                        position: 3,
                        name: 'Ann Leckie',
                        item: 'https://example.com/books/authors/annleckie',
                    },
                    {
                        position: 4,
                        name: 'Ancillary Justice',
                        item: 'https://example.com/books/authors/ancillaryjustice',
                    },
                ]}
            />
        </>
    )
}

export default Meta;