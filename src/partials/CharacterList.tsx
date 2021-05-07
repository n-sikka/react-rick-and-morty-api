import React, { useState } from 'react';
import type { Character } from '../types/Character.type';
import { CharacterItem } from './Character';
import { CharacterDetailsModal } from './CharacterModal';

interface ICharacterList extends React.HTMLAttributes<HTMLDivElement> {
    data: Character[];
}

export const CharacterList: React.FC<ICharacterList> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character>();

    const showDetails = (character: Character) => {
        document.body.classList.toggle('modal-open');
        setIsModalOpen(!isModalOpen);
        setSelectedCharacter(character);
    };

    const hideDetails = () => {
        document.body.classList.toggle('modal-open');
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            {data && data.length ? (
                <div className="CharacterList">
                    {data.map((character) => (
                        <CharacterItem
                            character={character}
                            key={character.id}
                            onModalOpen={showDetails}
                        />
                    ))}
                </div>
            ) : (
                <div className="NotFound">
                    <h3 className="subtitle">
                        Infinite universes with infinite possibilities and yet you can't find what
                        you're looking for
                    </h3>
                    <p>But, here are some reasons, you should still hire me</p>
                    <img src="./404.jpg" alt="No results found image" />
                </div>
            )}
            {isModalOpen && selectedCharacter && (
                <CharacterDetailsModal character={selectedCharacter} onClose={hideDetails} />
            )}
        </>
    );
};
