import React from 'react';
import type { Character } from '../types/Character.type';

/**
 * Info object from the API
 * @see https://rickandmortyapi.com/documentation/#info-and-pagination
 */
type CharacterResponseInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
};

/**
 * The response we get from the server
 * @see https://rickandmortyapi.com/documentation/#character-schema
 */
type CharacterResponse = {
    info: CharacterResponseInfo;
    results: Array<Character>;
};

// Type for the context.
type RickMortyContextState = CharacterResponse & {
    isLoading: boolean;
    fetchPage: (page: number) => void;
    search: (name: string) => void;
    filterByStatus: (query: string) => void;
    filterByGender: (query: string) => void;
};

// Initial data defaults, this will be the base data state for the app if nothing is loaded.
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
    filterByStatus: /* istanbul ignore next - unused default case */ () => {
        throw new Error('Default case - this should not be used!');
    },
    filterByGender: /* istanbul ignore next - unused default case */ () => {
        throw new Error('Default case - this should not be used!');
    },
};

/**
 * NOTE:
 *  The api servies can be written in multiple ways, but here I chose to write it in a simple direct way
 *  due to time constrains, and also to showcase usage of providers/context in react
 *
 *  I could have merged the filter function easily but chose not to as I feel given this is a provider, its much cleaner even if not fully DRY
 *
 * @param isLoading boolean to check if data is still loading or not
 * @param fetchPage function to fetch a specific page
 * @param search function to search for searching by character name
 * @param filterByStatus function to filter the list by - 'Alive' | 'Dead' | 'unknown';
 * @param filterByGender function to filter the list by - 'Female' | 'Male' | 'Genderless' | 'unknown';
 */
const RickMortyContext = React.createContext<RickMortyContextState>(InitData);

export type { CharacterResponse };
export { InitData, RickMortyContext };
