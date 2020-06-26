import React, {createContext} from 'react';

interface IInit {
    keyword: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Context = createContext({} as IInit | any);

export default Context;