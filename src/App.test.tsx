import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import App from './App';

// Mock LoginForm if it does not have side effects
jest.mock('./components/LoginForm/LoginForm', () => ({
  __esModule: true,
  default: ({onLogIn}: {onLogIn: () => void}) => (
      <button onClick={onLogIn} data-testid="login-button">Log In</button>
  )
}));

describe('App Component', () => {
  it('initially shows the Login header and login form', () => {
    render(<App/>);

    const loginHeader = screen.getByRole('heading', {name: 'Login'});
    expect(loginHeader).toBeInTheDocument();

    const loginButton = screen.getByTestId('login-button'); // Assuming LoginForm renders this button
    expect(loginButton).toBeInTheDocument();
  });

  it('shows success message after logging in', async () => {
    render(<App/>);
    const loginButton = screen.getByTestId('login-button');

    fireEvent.click(loginButton);

    const successHeader = screen.getByRole('heading', {name: 'You are now logged In'});
    expect(successHeader).toBeInTheDocument();
  });
});
