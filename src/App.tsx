import React, { useEffect, useState } from 'react';
import { SearchBar } from './partials/SearchBar';
import { CharacterList } from './partials/CharacterList';
import { Pagination } from './partials/Pagination';
import { useCharacterProvider } from './providers/RickMortyProvider';

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

    useEffect(() => {
        // Every time the results are updated
        // switch to the first page
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
                    {info && info.pages && (
                        <Pagination pageCount={info.pages} currentPage={page} fetch={fetch} />
                    )}
                    <CharacterList data={results} />
                </>
            ) : (
                <div>"Ohh geez Rick... This is taking too long!"</div>
            )}
        </div>
    );
};

export default App;
