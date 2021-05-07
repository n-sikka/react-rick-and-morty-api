import React from 'react';
import type { Character } from '../types/Character.type';

interface ICharacterItem extends React.HTMLAttributes<HTMLSpanElement> {
    character: Character;
    onModalOpen: (character: Character) => void;
}

export const CharacterItem: React.FC<ICharacterItem> = ({ onModalOpen, character, ...props }) => {
    return (
        <span className="CharacterItem" {...props} onClick={() => onModalOpen(character)}>
            <span className={`CharacterItem__status is-${character.status.toLowerCase()}`}>
                {character.status}
            </span>
            <img src={character.image} alt={`${character.name} image`} />
            <div className="CharacterItem__info">
                <h3 className="CharacterItem__name">{character.name}</h3>
                <small className="CharacterItem__bio">
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
