# analytics-app

In this repo: 
- API health reporting page PoC using Vue.js.
- How to create and document a reusable Vue.js component with [Storybook](https://storybook.js.org/).
- How to write unit tests using [vue-test-utils](https://v1.test-utils.vuejs.org/).
- How to write E2E tests using [Playwright](https://playwright.dev/).

You can find some notes as well as instructions on how to view the various parts in the sections below:

## Project setup

Make sure you have the required versions of [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/about-npm) 
installed in your machine.  

- nodejs >= 16.x
- npm >= 8.x

then run
```bash
npm install
```

## <a name="api-health-page"></a> Proof of concept for an API health analytics page

- Implemented using Vue.js 2 for the frontend and express/SQLite for the backend.
- Used Bootstrap 4 for base elements' styling along with custom SCSS when needed.
- Stats are fetched when each table row expands using last week's date range to shape the request to the backend so that 
frontend receives only the necessary data.

**In order to view the API health analytics page:**

1) Start `express` and `webpack dev server` using
```bash
npm run dev
```

2) Open http://localhost:8080 in your browser

## <a name="create-and-document-a-component"></a> Create and document a Vue.js component

- A reusable `SearchBar` component similar to GitHub and Storybook.
- Includes functionality to focus on the search input when pressing the `/` key.
- Storybook is used for both creating and documenting the component.
- An [additional page](http://localhost:8080/#/search) that includes the `SearchBar` component is created for basic E2E 
testing.

**In order to view Storybook**

1) Start Storybook using
```bash
npm run storybook
```

2) Open http://localhost:6006/?path=/story/design-system-search-bar--default in your browser 

## Run unit tests
There are some unit tests created using [vue-test-utils](https://vue-test-utils.vuejs.org/)/[Jest](https://jestjs.io/), 
you can run them using:
```bash
npm run test:unit
```

## Run E2E tests
There are some E2E tests created using [Playwright](https://playwright.dev/).  
In order to run the E2E tests:

- You have to install Playwright and its deps with `npx playwright install` and `npx playwright install-deps`
- Then, you have to first start `express` and `webpack dev server` (if not already started) using:

```bash
npm run dev
```

and finally run

```bash
npm run test:e2e
```

## Commands detailed

### Backend
express/SQLite as a mock backend.  
```
npm run backend
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run unit tests
```
npm run test:unit
```

### Run E2E tests
```
npm run test:e2e
```

### Storybook

```
npm run storybook
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).