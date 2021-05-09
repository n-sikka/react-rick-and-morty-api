# Rick and Morty: Character List

I used [Create React App](https://create-react-app.dev/) as a boilerplate and the [Rick and Morty API](https://rickandmortyapi.com/documentation/#introduction) to fetch the data.
[SCSS(node)](https://sass-lang.com/) is used for styling and [Typescript](https://www.typescriptlang.org/) along with React

## Quick start

At the root directory run these commands to launch the app on `localhost:3000`

-   `npm install`
-   `npm start`

To run the tests run `npm run test-verbose`

PS - I've not implemented the `msw` package efficiently due to the nature of the task (interview) ideally we would add mocks for each api call and use the `req` parament in each handler to check for the correct `queryParam` being sent.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

For verbose mode I've added another command for ease: `npm run test-verbose`

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Notes

### Tests

I've written tests with the perspective of the user interacting with the app, it's sometimes linked to [Behavior driven development](https://www.functionize.com/blog/behavior-driven-development-without-the-pain/). Idea here is to test all user flows and not independent code blocks as I personally feel it holds not much meaning for testing.
I've used [Gerkhin](https://www.functionize.com/blog/what-is-gherkin-how-do-you-write-gherkin-tests/) testing methodology as it allows us to create meaningful user stories that are also readable.
I chose to not cover the app 100% intentionally as it's a test and I hope that the tests I've written showcase my skills enough. I've however left empty tests to showcase what else I would have tested at the least before merging this into the master branch of a prod level code. Of course it doesn't mean those are the only tests one should write, but from my perspective, those are the tests that will allow us to deploy on friday night and have a good night's sleep as it guarantees core functionality to work properly

Ideally the provider would be tests separately and the partials would have dedicated tests to make sure the core functionality works (component unit tests)

PS - I've used the [msw](https://mswjs.io/) package to mock the api for asserting data for our tests.

### SCSS

-   I've utilized BEM (ABEM) inspired naming convention (`<componentName>__<componentChild>--<componentModifier>`) for the components and for utils i've used simple `is-` style of naming classes.
-   For the values of fonts/sizes/spaces etc I've used (slightly cheated) [8 point system](https://medium.com/swlh/the-comprehensive-8pt-grid-guide-aa16ff402179) that the designers use.
-   I've prefered CSS variables over SCSS variables as it allows us to do fun things like adding a dark mode (try changing the mode form the bottom of the page)

### Types

I prefer strictly typed code in my day-to-day and i've done the same here. Using prettier and typescript, it gets super easy in an IDE to write code that predicts errors based on types and helps us write cleaner/bug free code quicker. I've used 2 different ways to do it just for the sake of showcasing them. First one is in a dedicated `type.ts` file, which would generally be pretty useful while working on big projects where types might be shared and Second, within the component files that would be useful more when we are building a component library/design system as it allows us to have all the code for components, strictly types within one file which eases refatoring and reading
