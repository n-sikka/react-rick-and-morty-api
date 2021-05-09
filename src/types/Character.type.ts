/**
 * Schema for the Character
 * @see https://rickandmortyapi.com/documentation/#character-schema
 */

type CharacterLocation = {
    name: string;
    url: string;
};

type CharacterOrigin = {
    name: string;
    url: string;
};

type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type Character = {
    id: 1;
    name: string;
    status: CharacterStatus;
    species: string;
    type: string;
    gender: CharacterGender;
    origin: CharacterOrigin;
    location: CharacterLocation;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
};
