import { useState, useEffect } from 'react';

export function useFetch ( url: string, options?: RequestInit ) {
    const [ data, setData ] = useState( null );
    const [ loading, setLoading ] = useState<boolean>( true );
    const [ fetchError, setFetchError ] = useState<Error | null>( null );

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await fetch( url, options );
                const result = await response.json();
                setData( result );
            } catch ( e ) {
                setFetchError( e as Error );
            } finally {
                setLoading( false );
            }
        };
        fetchData();
    }, [ url ] );

    return { data, loading, fetchError };
}