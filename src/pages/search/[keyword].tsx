import {NextPage, NextPageContext} from "next";
import axios, {AxiosRequestConfig} from "axios";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import ItemLayout from "../../components/Item";

const Container = styled.div`
  max-width: 1200px;
  margin : 0 auto;
`;
const CategoryBox = styled.div`
    width: 1000px;
    padding: 0 0 0 30px;
    .categoryBox_fix {
        h3{
            margin-top: 35px;
            padding-bottom: 5px;
            border-bottom: 2px solid #343434;
            font-size: 16px;
            color: #313131;
        }
    }
    .categoryBox_item {
        display : flex;
        flex-wrap: wrap;
    }
`;

interface IProps {
    datalist: any
}

const Search: NextPage<IProps> = ({datalist}) => {
    const [dataResult, setDataResult] = useState(datalist);
    const router = useRouter();
    console.log(router);
    // const DynamicComponentWithCustomLoading = dynamic(() => {
    // }, {loading: () => <div></div>})

    useEffect(() => {

        // const clientLoadData = async (query: ParsedUrlQuery) => {
        //     const baseUrl = "https://admin-local.thesaracen.com/md/goods/list-api/goods";
        //     const keyword = `[${query.keyword}`;
        //     const config: AxiosConfig = {
        //         header: {
        //             "Content-Type": "application/json",
        //             Accept: "application/json",
        //         },
        //         params: {search_keyword: keyword.trim(), page: 1}
        //     };
        //     const result = await axios.get(baseUrl, config);
        //     setDataResult(result.data.datalist);
        // }
        // if (datalist.length === 0) clientLoadData(query);
        // console.log(datalist);
    }, [])

    // if (dataResult.length === 0) {
    //     return <div>...loading</div>
    // }
    return (
        <Container>
            {/*<DynamicComponentWithCustomLoading/>*/}
            <CategoryBox>
                <div className="categoryBox_fix">
                    <h3>'{router.query.keyword}' 검색결과
                        총 {dataResult.length}개</h3>
                    <div className="categoryBox_item">
                        {dataResult.map((item: any, i: number) => <ItemLayout key={i} result={item}/>)}
                    </div>
                </div>
            </CategoryBox>
        </Container>)
}

interface SearchPageContext extends NextPageContext {
    query: {
        keyword: string
    }
}

export interface AxiosConfig extends AxiosRequestConfig {
    header: { "Content-Type": String, Accept: String }
}

export const getServerSideProps = async ({query, req}: SearchPageContext) => {
    const baseUrl = "https://admin-local.thesaracen.com/md/goods/list-api/goods";
    const keyword = `[${query.keyword}`;
    const config: AxiosConfig = {
        header: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        params: {search_keyword: keyword.trim(), page: 1}
    };
    const result = await axios.get(baseUrl, config);
    let datalist: any = result.data.datalist
    if (!req) {
        datalist = [];
        return {props: {datalist}}
    }
    return {props: {datalist}}
}
export default Search;