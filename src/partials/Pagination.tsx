import React from 'react';

interface IPagination extends React.HTMLAttributes<HTMLDivElement> {
    pageCount: number;
    currentPage: number;
    fetch: (count: number) => void;
}

/**
 *
 * @param pageCount: Total number of pages
 * @param currentPage: The page user has currently selected
 * @param fetch: callback function when user clicks on any page number
 */
export const Pagination: React.FC<IPagination> = ({ pageCount, currentPage, fetch, ...props }) => {
    const paginationList = () => {
        // using the count of the pages we recieve in the 'info',
        // We populate the paginated numbers to allow user to jump to a specific page
        return Array.from(Array(pageCount + 1).keys()).splice(1, pageCount + 1);
    };

    return (
        <div className="Pagination" title="pagination">
            {paginationList().map((count) => (
                <i
                    key={`page-${count}`}
                    className={count === currentPage ? 'is-active' : ''}
                    /**
                     * NOTE: Anonymous functions being 'bad' or 'inefficient' is hyper exaggerated. The difference in performance is not realisitc.
                    // Someone was nice enough to bust the exaggeration for the rest of us
                    // @see https://www.matthewgerstman.com/tech/performance-testing-anonymous-functions/
                     */
                    onClick={() => fetch(count)}
                >
                    {count}
                </i>
            ))}
        </div>
    );
};
