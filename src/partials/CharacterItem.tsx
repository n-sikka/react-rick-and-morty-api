import React from 'react';
import type { Character } from '../types/Character.type';

interface ICharacterItem extends React.HTMLAttributes<HTMLSpanElement> {
    character: Character;
    onShowDetails: (character: Character) => void;
}

/**
 *
 * @param character: details of the individual character in the list
 * @param onShowDetails: callback function for when user clicks on the character to see the details
 * @returns
 */
export const CharacterItem: React.FC<ICharacterItem> = ({ onShowDetails, character, ...props }) => {
    return (
        <span
            className="CharacterList__item"
            {...props}
            onClick={() => onShowDetails(character)}
            title={`${character.name}`}
        >
            <span className={`Character__status is-${character.status.toLowerCase()}`}>
                {character.status}
            </span>

            <img src={character.image} alt={`${character.name} thumbnail`} />

            <div className="Character__info">
                <h3 className="Character__name">{character.name}</h3>

                <small className="Character__bio">
                    <b>
                        {character.species} ({character.gender})
                    </b>
                </small>

                {character.type && (
                    <small>
                        Type: <b>{character.type}</b>
                    </small>
                )}
                <small>
                    Episode Count: <b>{character.episode.length}</b>
                </small>
            </div>
        </span>
    );
};
