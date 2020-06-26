import Layout from "../components/Layout";
import React, {useContext} from "react";
import Context from "../Context";

export default () => {
    const {handleChange, keyword} = useContext(Context);
    return (
        <Layout>
            <input type="text" onChange={handleChange} value={keyword}/>
            <div>메인 페이지</div>
        </Layout>
    )
}