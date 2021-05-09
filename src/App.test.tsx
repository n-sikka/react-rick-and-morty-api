import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import {
    CharacterListData,
    FilterByGenderData,
    FilterByStatusData,
    SearchResultData,
} from './mocks';
import { server, BASE_MOCK_URL } from './setupTests';

import { renderApp } from './test-utils';

describe('App renders', () => {
    it('renders the base app without correct heading', async () => {
        //    GIVEN user lands on the character list page
        renderApp();

        // THEN the page title should be correctly visible
        const pageTitle = await screen.findByText('Rick and Morty Encyclopedia');
        expect(pageTitle).toBeVisible();

        // AND the pagination should be correctly visible
        const pagination = await screen.findByTitle('pagination');
        expect(pagination).toBeVisible();

        // AND the character list should be correctly visible
        const charList = await screen.findByTitle('character list');
        expect(charList).toBeVisible();

        // AND the total number of characters dispalyed should be 5 (mock data)
        expect(charList.childElementCount).toBe(5);
    });
});

/**
 * Tests for checking the Search functionality
 */
describe('Search works', () => {
    it('displays the result on searching', async () => {
        // setting up mock handler for search query for msw
        server.use(
            // Call for searching by name (rick sanchez)
            rest.get(`${BASE_MOCK_URL}/?name=:name`, (req, res, ctx) => {
                return res(ctx.json(SearchResultData));
            })
        );

        // GIVEN the user lands on the character list page
        renderApp();

        // WHEN the user searches for 'rick sanchez'
        const searchBar = await screen.findByRole('search');
        await fireEvent.change(searchBar, { target: { value: 'rick sanchez' } });

        expect(searchBar).toHaveValue('rick sanchez');

        // THEN the list of characters is updated with characters that have 'rick' in their name
        const charList = await screen.findByTitle('character list');
        expect(charList.childElementCount).toBe(1);

        // AND total results for 'rick sanchez' should be 1 (mock data)
        const character = await screen.findAllByText('rick sanchez', { exact: false });
        expect(character.length).toBe(1);
    });

    it('makes search when user ', () => {});

    it('displays error when no results are found', () => {});
});

/**
 * Tests for checking the filtering functionality
 */
describe('Filter Works', () => {
    it('filters the result based on status', async () => {
        // setting up mock handler for search query for msw
        server.use(
            // Call for searching by name (rick)
            rest.get(`${BASE_MOCK_URL}/?status=:status`, (req, res, ctx) => {
                return res(ctx.json(FilterByStatusData));
            })
        );

        // GIVEN the user lands on the character list page
        renderApp();

        // WHEN the user selects the 'dead' filter
        const statusFilter = await screen.findByTitle('status filter');
        userEvent.selectOptions(statusFilter, 'dead');

        // THEN the result displays all the characters that are dead
        const charList = await screen.findByTitle('character list');
        expect(charList.childElementCount).toBe(1);

        // AND the character should be Jerry Smith (mock data)
        const character = await screen.findByText('Jerry Smith');
        expect(character).toBeVisible();
    });

    it('filters the result based on gender', async () => {
        // THEN the result displays all the characters that are Males
        // setting up mock handler for search query for msw
        server.use(
            // Call for searching by name (rick)
            rest.get(`${BASE_MOCK_URL}/?gender=:gender`, (req, res, ctx) => {
                return res(ctx.json(FilterByGenderData));
            })
        );

        // GIVEN the user lands on the character list page
        renderApp();

        // WHEN the user selects the 'male' filter
        const genderFilter = await screen.findByTitle('gender filter');
        userEvent.selectOptions(genderFilter, 'male');

        // THEN the result displays all the characters that are dead
        const charList = await screen.findByTitle('character list');
        expect(charList.childElementCount).toBe(3);

        // AND total 'male' characters should be 3 in the list (mock data)

        // Because in the implementation "Human (:gender)" is one element so it's easier to get
        // Also, this enforces design and will warn the developer whilre refactoring in case they change it
        const character = await screen.findAllByText('Human (Male)');
        expect(character.length).toBe(3);
    });
});

/**
 * Tests for checking if the character item is displayed correctly
 */
describe('Character card is displayed', () => {
    it('displays most important information about the characters', () => {
        /**
         * Note: I chose to not write this test due to the nature of implementation
         * But, in my opinion, this test would only be useful if we are writing tests for the UI
         * where things we want user to see, is all rendered correctly
         * This won't be user functionality testing approach,
         * that I've taken here which focuses more on user flows and not the literal data
         */
    });
});

/**
 * Tests to check if the individual character details functions properly
 */
describe('Character details are displayed correctly', () => {
    it('opens the modal', async () => {
        // GIVEN the user lands on the character list page
        renderApp();

        const rickCharacterItem = await screen.findByText('Rick Sanchez');

        // THEN the character card for Rick Sanchez should be visible (mock data)
        expect(rickCharacterItem).toBeInTheDocument();

        // WHEN the user clicks on a character card (mock data, Rick Sanchez)
        userEvent.click(rickCharacterItem);

        // THEN they can see the details of that character
        const characterModal = await screen.findByRole('dialog');
        expect(characterModal).toBeVisible();

        // AND the character image should be visible
        const charImg = await screen.findByAltText('Rick Sanchez image');
        expect(charImg).toBeVisible();

        // AND the character name should be visible

        /**
         * NOTE: within() is useful in certain scenarios when we wanna make sure we are getting the element
         * inside a certain scope and not from outside
         * Here technically the screen holds 2 elements with text "Rick Sanchez"
         * Hence we want the one inside the mdoal
         */
        const charName = within(characterModal).getByText('Rick Sanchez');
        expect(charName).toBeVisible();
    });

    it('displays data corectly', () => {});

    it('closes the modal', () => {});
});
