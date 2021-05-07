import React, { useState, useEffect, useContext } from 'react';
import type { Character } from '../types/Character.type';

export type CharacterResponseInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
};

type CharacterResponse = {
    info: CharacterResponseInfo;
    results: Array<Character>;
};

// provider context state
type RickMortyContextState = CharacterResponse & {
    fetchPage: (page: number) => void;
    isLoading: boolean;
    search: (name: string) => void;
};

// create Context
const BASE_URL = 'https://rickandmortyapi.com/api/character';

// initial data state
const InitData = {
    info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
    },
    results: [],
    isLoading: true,
    fetchPage: /* istanbul ignore next - unused default case */ () => {
        throw new Error('Default case - this should not be used!');
    },
    search: /* istanbul ignore next - unused default case */ () => {
        throw new Error('Default case - this should not be used!');
    },
};

const RickMortyContext = React.createContext<RickMortyContextState>(InitData);

// create Provider
export const RickMortyProvider: React.FC = ({ children }) => {
    const [results, setResults] = useState<CharacterResponse['results']>([]);
    const [info, setInfo] = useState<CharacterResponse['info']>(InitData.info);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Call API for Promise and setResults
    useEffect(() => {
        fetchData(BASE_URL);
    }, []);

    const fetchData = async (query: string) => {
        const response = await fetch(query);

        response
            .json()
            .then((res: CharacterResponse) => {
                setResults(res.results);
                setInfo(res.info);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(true));
    };

    const fetchPage = (page: number) => {
        let query = `${BASE_URL}/?page=${page}`;

        if (searchTerm && searchTerm.length > 0) {
            query = `${BASE_URL}/?page=${page}&name=${searchTerm}`;
        }
        fetchData(query);
    };

    const search = (name: string) => {
        let query = `${BASE_URL}/?name=${name}`;
        setSearchTerm(name);
        fetchData(query);
    };

    return (
        <RickMortyContext.Provider
            value={{
                info,
                results,
                fetchPage,
                isLoading,
                search,
            }}
        >
            {children}
        </RickMortyContext.Provider>
    );
};

export function useCharacterProvider() {
    return useContext(RickMortyContext);
}
