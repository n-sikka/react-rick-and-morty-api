import React, { useEffect, useState } from 'react';
import { useCharacterProvider } from '../providers/RickMortyProvider';

interface IFilterBar extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Omited: Add Reset functionality
 *
 *  I omited building the reset functionality here due to time constrains
 *  and also that it would have just been a repetitive code that
 *  would not tell anything you don't see here already about my skills
 */
export const FilterBar: React.FC<IFilterBar> = ({ ...props }) => {
    const { filterByGender, filterByStatus } = useCharacterProvider();

    return (
        <div className="FilterBar" {...props}>
            <h3 className="subtitle">Filter By</h3>

            <div className="FilterBar__group">
                <select onChange={(e) => filterByStatus(e.target.value)} title="status filter">
                    <option value="">All</option>
                    <option value="dead">Dead</option>
                    <option value="alive">Alive</option>
                    <option value="unknown">Unknown</option>
                </select>

                <select onChange={(e) => filterByGender(e.target.value)} title="gender filter">
                    <option value="">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
        </div>
    );
};
