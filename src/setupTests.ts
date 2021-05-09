// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock data for the server response
import {
    CharacterListData,
    SearchResultData,
    FilterByGenderData,
    FilterByStatusData,
} from './mocks';

// This can be replaced with a server url that's on staging to avoid mains server getting needless hits, if at all
export const BASE_MOCK_URL = 'https://rickandmortyapi.com/api/character';

export const server = setupServer(
    // Call for getting list of all characters
    rest.get(`${BASE_MOCK_URL}`, (req, res, ctx) => {
        return res(ctx.json(CharacterListData));
    })
);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'warn',
    })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
