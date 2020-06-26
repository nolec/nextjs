import React, {useState} from "react";
import Context from "./Context";

const ContextProvider: React.FC = ({children}) => {
    const [keyword, setKeyword] = useState("")
    const [headTitle, setHeadTitle] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target.value)
        const value = e.target.value;
        setKeyword(value);
    }
    const handleHeadTitle = (title : string) => {
        setHeadTitle(title)
    }

    const provider = {
        handleChange,
        keyword,
        headTitle,
        handleHeadTitle
    }

    return <Context.Provider value={provider}>{children}</Context.Provider>
}

export default ContextProvider