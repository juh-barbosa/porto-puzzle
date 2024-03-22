import {createContext} from 'react'

export const GlobalContext = createContext({})

export function RoutesProvider({children}: any) {

    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
}
