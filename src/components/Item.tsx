import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {NextPage} from "next";
import {useRouter} from "next/router";

const NextLink = styled.a``;

const ItemList = styled.div`
    width : 194px;
    height : 320px;
    padding-top : 5px;
    position: relative;
    border-right: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
`;
const Photo = styled.div`
    overflow: hidden;
    position: relative;
    width: 182px;
    height: 200px;
    margin: 0 auto;
`;
const Text = styled.div`
    .p-name {}
    .price_info {}
`;

interface IProps {
    result: any
}

const ItemLayout: NextPage<IProps> = ({result}) => {
    const {query} = useRouter();
    console.log(query)
    return (
        <Link href="/search/detail/[id]" as={`/search/detail/${result.id}`}>
            <NextLink>
                <ItemList>
                    <Photo>
                        <img src={`https://saracen.azureedge.net/img/template/goods/${result.thumbnail}`}/>
                    </Photo>
                    <Text>
                        <div className="p-name">{result.goods_template.title}</div>
                        <div className="price_info">{result.goods_template.goods_template_price_level.market_price}</div>
                    </Text>
                </ItemList>
            </NextLink>
        </Link>
    )
}
export default ItemLayout;