import { createContext, useState, useContext, type FC, type Dispatch, type SetStateAction } from "react";

const AccessToken = createContext<[ string, Dispatch<SetStateAction<string>> ] | undefined>( undefined );

export const AccessTokenProvider: FC<React.PropsWithChildren> = ( props ) => {
    const [ accessToken, setAccessToken ] = useState<string>( "" )
    return (
        <AccessToken.Provider
            value={ [ accessToken, setAccessToken ] }
            { ...props }
        />
    )
}

export const useAccessToken = () => useContext( AccessToken )