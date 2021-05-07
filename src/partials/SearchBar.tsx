import React, { useEffect, useState } from 'react';
import { useCharacterProvider } from '../providers/RickMortyProvider';

interface ISearchBar extends React.HTMLAttributes<HTMLInputElement> {
    onSearch?: (searchTerm: string) => void;
    value?: string;
}

export const SearchBar: React.FC<ISearchBar> = ({ onSearch, ...props }) => {
    const { search } = useCharacterProvider();
    const [value, setValue] = useState(props.value ? props.value : '');

    const onClickHandler = () => {
        if (value.length > 0 && onSearch) {
            search(value);
        }
    };

    useEffect(() => {
        if (value.length > 0) search(value);
    }, [value]);

    return (
        <div className="SearchBar">
            <input
                {...props}
                value={value}
                type="text"
                onChange={(e) => setValue(e.currentTarget.value)}
                placeholder="eg. Rick Sanches"
                id="search-bar"
                className="SearchBar__input"
                autoComplete="off"
            />
            <button className="SearchBar__button" onClick={onClickHandler}>
                Go
            </button>
        </div>
    );
};
