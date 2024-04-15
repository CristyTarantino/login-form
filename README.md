# React Login Application

This repository contains a simple React application designed to demonstrate login functionality using native React
features without relying on third-party libraries. The purpose of this approach is to showcase the ability to handle
common web development patterns using React's core functionalities within the constraints of a test timeframe.
The application conditionally renders content based on whether a user has logged in or not and provides
an interface for logging in.

## Folder Structure

The project is organized into several directories and files, each serving a specific purpose in the application. Here's
an overview of the key directories and files:

Certainly! Here is a cleaned-up version of your folder structure in Markdown format. This format provides a clear and
structured layout of your source directory, which is easy to read and understand.

Certainly! Here is a cleaned-up version of your folder structure in Markdown format. This format provides a clear and
structured layout of your source directory, which is easy to read and understand.

```bash
/src/ # Source files for the application
├── components/ # Reusable UI components
│ ├── LoginForm/ # LoginForm component handling user inputs
│ │ ├── LoginForm.js # LoginForm component implementation
│ │ └── LoginForm.css # Styles specific to LoginForm
│ └── FormInput/ # Generic input component for forms
│ ├── FormInput.js # FormInput component implementation
│ └── FormInput.css # Styles specific to FormInput
│
├── hooks/ # Custom React hooks
│ └── useLoginForm.js # Custom hook for managing login form state
│
├── App.js # Main application component
├── App.css # Application-wide styles
├── index.js # Entry point for React rendering
└── index.css # Global styles
```

## Application Components

### `App`

The main component that orchestrates the rendering of the `LoginForm` and the display of the logged-in state. It uses a
state hook to track whether the user is logged in.

### `LoginForm`

This component handles the user inputs for logging in. It utilizes the `useLoginForm` hook to manage form state,
including input values and validation. It is responsible for triggering the login process.

### `FormInput`

A reusable component designed to handle individual input elements of forms. It supports text, password, and other types
of inputs, and can display errors and manage visibility toggling for passwords.

## Custom Hooks

### `useLoginForm`

A custom React hook encapsulating the logic for form state management, including handling changes, submissions, and
validation.

## Thinking Process

The application was designed with modularity and reusability in mind withing the 2h timeframe:

- **Componentization**: Breaking down the UI into components (`LoginForm`, `FormInput`) allows for better manageability
  and reuse. Each component has a well-defined responsibility, adhering to the single-responsibility principle.
- **Custom Hooks**: The use of custom hooks (e.g., `useLoginForm`) helps abstract and manage stateful logic related to
  forms, making the components cleaner and focused more on rendering and less on behavior.
- **State Management**: Central state management within the `App` component allows for control over application-wide
  state transitions, like switching between the logged-in and logged-out views.
- **Styling and Layout**: CSS modules are used for component-specific styling to avoid style leakage and enhance
  maintainability.

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

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
