import { render } from '@testing-library/react';

import App from './App';
import { RickMortyProvider } from './providers/RickMortyProvider';

export const renderApp = () => {
    render(
        <RickMortyProvider>
            <App />
        </RickMortyProvider>
    );
};
