import React, { useEffect, useState } from 'react';
import { useCharacterProvider } from './providers/RickMortyProvider';
import { SearchBar, CharacterList, Pagination, FilterBar } from './partials';

const App: React.FC = () => {
    const { isLoading, results, info, fetchPage } = useCharacterProvider();
    const [page, setPage] = useState(1);

    const fetch = (pageNo: number) => {
        // run when user clicks on a different page
        if (pageNo != page) {
            fetchPage(pageNo);
            setPage(pageNo);
        }
    };

    const onModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMode = e.currentTarget.value;
        document.body.classList.add(`Mode--${selectedMode}`);
    };

    useEffect(() => {
        // Every time the results are updated switch to the first page
        // Only if the current page is not the first one
        if (info && info.prev === null) {
            setPage(1);
        }
    }, [info]);

    return (
        <div className="App">
            <h1 className="title">Rick and Morty Encyclopedia</h1>

            {!isLoading ? (
                <>
                    <SearchBar />

                    {/* If info state exists and has pages render pagination items */}
                    {info && info.pages && (
                        <Pagination pageCount={info.pages} currentPage={page} fetch={fetch} />
                    )}
                    <div className="Results">
                        <FilterBar />
                        <CharacterList data={results} />
                    </div>
                </>
            ) : (
                <div>"Ohh geez Rick... This is taking too long!"</div>
            )}

            <div className="ModeSelector">
                <select onChange={onModeChange}>
                    <option value="">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </div>
    );
};

export default App;
