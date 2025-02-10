# Corsearc assignment

## Project summary

Build a simple dashboard that displays a list of users fetched from a REST API and allows the user to filter
and sort the list. Additionally, ensure the layout adapts to different screen sizes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisite

Node v20.17.0

### Installation

1. Clone the repo using the following command on your terminal

```js
git clone git@github.com:sazzadrupak/corsearch-assignment.git
```

2. Install npm packages
   Go inside the project directory which is `corsearch-assignment` and run the following command in your terminal

```js
npm i
```

3. Run the project

```js
npm run dev
```

At this point, the project would run successfully and you can access the project using your browser via this link

```js
http://localhost:5173
```

<b>N.B. Once you access the application via browser, the initial page is shown Home page which does not have any content. I suggest you to go click the `Users` menu where all the tasks have been implemented.</b>

### Build with

- React.JS
- TypeScript
- HTML
- CSS
- Vite (Build tool to make the local development faster and more)

### Packages

- `axios` (to make http request to fetch users from the given API)
- `classnames` (for conditionally joining classnames together)
- `react-icons` (for showing icons on navbar menu)
- `react-loading-skeleton` (mimic the layout of users page content while data is being fetched from API)
- `react-query` (for fetching and caching data from the given API and handleing state management)
- `sass` (for using global variables in the application)
