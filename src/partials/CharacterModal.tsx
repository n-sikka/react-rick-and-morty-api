import React, { useEffect } from 'react';
import type { Character } from '../types/Character.type';

interface ICharacterDetailsModal extends React.HTMLAttributes<HTMLDivElement> {
    character: Character;
    onClose: () => void;
}

export const CharacterDetailsModal: React.FC<ICharacterDetailsModal> = ({ onClose, character }) => {
    useEffect(() => {
        // Press Escape to close
        const close = (e: KeyboardEvent) => {
            // keyCode is deprecated by MDN, but it is still supported by all major browsers.
            // @see https://caniuse.com/?search=keyCode
            if (e.keyCode === 27) {
                onClose();
            }
        };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, []);

    return (
        <div className="CharacterDetailModal">
            <div className="Content">
                <div className="Content__body">
                    <img src={character.image} alt={`${character.name} image`} />
                    <div className="Character__info">
                        <h3 className="CharacterItem__name">{character.name}</h3>
                        <p>
                            Appeared in <b>{character.episode.length}</b> Episodes
                        </p>
                        <p>
                            Status: <b>{character.status}</b>
                        </p>
                        <p>
                            Species: <b>{character.species}</b>
                        </p>
                        <p>
                            Gender: <b>{character.gender}</b>
                        </p>
                        {character.type && (
                            <p>
                                Type: <b>{character.type}</b>
                            </p>
                        )}
                        {character.origin && (
                            <p>
                                Origin: <b>{character.origin.name}</b>
                            </p>
                        )}
                        {character.location && (
                            <p>
                                Location: <b>{character.location.name}</b>
                            </p>
                        )}
                    </div>
                </div>
                <button className="Button is-block" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};
