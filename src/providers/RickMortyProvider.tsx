import React, { useState, useEffect, useContext } from 'react';
import type { CharacterResponse } from '../contexts/RickMortyContext';
import { InitData, RickMortyContext } from '../contexts/RickMortyContext';

// create Context
const BASE_URL = 'https://rickandmortyapi.com/api/character';

/**
 * I'm creating a hook here to wrap the context and be used as any other react hook like useState or useEffect
 * This component defines functions that the context requires and then provides those to the app
 *
 * The main app is wrapped with this provider to inject the context value from one point
 * I am definitely misusing context here a little bit along with in some individual partial components but,
 * I hope this showcases some skills of mine in react for the test purpose
 *
 */
export const RickMortyProvider: React.FC = ({ children }) => {
    const [results, setResults] = useState<CharacterResponse['results']>([]);
    const [info, setInfo] = useState<CharacterResponse['info']>(InitData.info);
    const [isLoading, setIsLoading] = useState(true);

    const [query, setQuery] = useState(BASE_URL);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');

    useEffect(() => {
        // Flag to keep track of mount status
        // It's needed to avoid memory leaks in app
        let unmounted = false;

        // Call API for Promise and setResults
        const fetchData = async () => {
            const response = await Promise.resolve(fetch(query));

            const json = await response.json();

            // if the component is unmounted then return
            if (unmounted) {
                return;
            }

            setResults(json.results);
            setInfo(json.info);
            setIsLoading(false);
        };

        fetchData();

        // this is a clean up function for useEffect by setting the mount status flag to false if unmounted
        return () => {
            unmounted = true;
        };
    }, [query]);

    const fetchPage = (page: number) => {
        let query = `${BASE_URL}/?page=${page}`;

        if (searchTerm && searchTerm.length > 0) {
            query = `${query}&name=${searchTerm}`;
        }

        if (statusFilter && statusFilter.length > 0) {
            query = `${query}&status=${statusFilter}`;
        }
        if (genderFilter && genderFilter.length > 0) {
            query = `${query}&gender=${genderFilter}`;
        }

        setQuery(query);
    };

    const search = (name: string) => {
        let query = `${BASE_URL}/?name=${name}`;
        setSearchTerm(name);

        if (statusFilter && statusFilter.length > 0) {
            query = `${query}&${statusFilter}`;
        }
        setQuery(query);
    };

    const filterByStatus = (filter: string) => {
        let query = `${BASE_URL}/?status=${filter}`;
        setStatusFilter(filter);

        if (genderFilter && genderFilter.length > 0) {
            query = `${query}&gender=${genderFilter}`;
        }

        if (searchTerm && searchTerm.length > 0) {
            query = `${query}&name=${searchTerm}`;
        }

        setQuery(query);
    };

    const filterByGender = (filter: string) => {
        let query = `${BASE_URL}/?gender=${filter}`;
        setGenderFilter(filter);

        if (statusFilter && statusFilter.length > 0) {
            query = `${query}&status=${statusFilter}`;
        }

        if (searchTerm && searchTerm.length > 0) {
            query = `${query}&name=${searchTerm}`;
        }

        setQuery(query);
    };

    return (
        <RickMortyContext.Provider
            value={{
                info,
                results,
                isLoading,
                fetchPage,
                search,
                filterByStatus,
                filterByGender,
            }}
        >
            {children}
        </RickMortyContext.Provider>
    );
};

export function useCharacterProvider() {
    return useContext(RickMortyContext);
}
