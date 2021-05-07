import React from 'react';

interface IPagination extends React.HTMLAttributes<HTMLDivElement> {
    pageCount: number;
    currentPage: number;
    fetch: (count: number) => void;
}

export const Pagination: React.FC<IPagination> = ({ pageCount, currentPage, fetch, ...props }) => {
    const paginationList = () => {
        // using the count of the pages we recieve in the 'info',
        // We populate the paginated numbers to allow user to jump to a specific page
        return Array.from(Array(pageCount + 1).keys()).splice(1, pageCount + 1);
    };

    return (
        <div className="Pagination">
            {paginationList().map((count) => (
                <i
                    key={`page-${count}`}
                    className={count === currentPage ? 'is-active' : ''}
                    onClick={() => fetch(count)}
                >
                    {count}
                </i>
            ))}
        </div>
    );
};
