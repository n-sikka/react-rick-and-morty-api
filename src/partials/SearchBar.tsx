import React, { useEffect, useState } from 'react';
import { useCharacterProvider } from '../providers/RickMortyProvider';

interface ISearchBar extends React.HTMLAttributes<HTMLInputElement> {
    value?: string;
}

/**
 * This component handles the search
 * It works whenever the input has a change
 *
 */
export const SearchBar: React.FC<ISearchBar> = ({ ...props }) => {
    const { search } = useCharacterProvider();
    const [value, setValue] = useState(props.value ? props.value : '');

    const onChangeHandler = (newVal: string) => {
        search(newVal);
        setValue(newVal);
    };

    return (
        <div className="SearchBar">
            <input
                {...props}
                role="search"
                id="search-bar"
                type="text"
                value={value}
                autoComplete="off"
                placeholder="eg. Rick Sanches"
                className="SearchBar__input"
                onChange={(e) => onChangeHandler(e.currentTarget.value)}
            />
        </div>
    );
};
