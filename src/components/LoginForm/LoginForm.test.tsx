import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './LoginForm'; // Adjust the import path as necessary
import {FormInputProps} from '../FormInput/FormInput';
import {useLoginForm} from '../../hooks/useLoginForm';

jest.mock('../../hooks/useLoginForm', () => ({
    useLoginForm: jest.fn(() => ({
        email: '',
        password: '',
        emailError: null,
        passwordError: null,
        passwordType: 'password',
        handleEmailChange: jest.fn(),
        handlePasswordChange: jest.fn(),
        handleLogin: jest.fn(),
        togglePasswordVisibility: jest.fn(),
    })),
}));

jest.mock("../FormInput/FormInput", () => ({label, type, value, onChange, error, toggleVisibility, isPassword}: FormInputProps) => {
    return <div>
        <label>{label}</label>
        <input type={type} value={value} onChange={onChange} data-testid={label}/>
        {isPassword && (
            <button onClick={toggleVisibility} data-testid="toggleVisibility">Toggle</button>
        )}
        {error && <div data-testid="error">{error}</div>}
    </div>
});

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();

    });


    test('renders form inputs for email and password', () => {
        (useLoginForm as jest.Mock).mockReturnValue({
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            passwordType: 'password',
            handleEmailChange: jest.fn(),
            handlePasswordChange: jest.fn(),
            handleLogin: jest.fn(),
            togglePasswordVisibility: jest.fn(),
        });

        render(<Login onLogIn={jest.fn} />);
        expect(screen.getByTestId('Email')).toBeInTheDocument();
        expect(screen.getByTestId('Password')).toBeInTheDocument();
    });

    test('calls handleLogin when login button is clicked', () => {
        const mockHandleLogin = jest.fn();

        // Mock the useLoginForm hook to respond to input changes
        (useLoginForm as jest.Mock).mockReturnValue({
            email: 'test@example.com', // Start with empty
            password: 'password123', // Start with empty
            emailError: null,
            passwordError: null,
            passwordType: 'password',
            handleEmailChange: jest.fn().mockImplementation((event) => {
                (useLoginForm as jest.Mock).mockReturnValue({
                    ...useLoginForm(),
                    email: event.target.value // Simulate updating email
                });
            }),
            handlePasswordChange: jest.fn().mockImplementation((event) => {
                (useLoginForm as jest.Mock).mockReturnValue({
                    ...useLoginForm(),
                    password: event.target.value // Simulate updating password
                });
            }),
            handleLogin: mockHandleLogin,
            togglePasswordVisibility: jest.fn(),
        });

        render(<Login/>);

        const button = screen.getByRole('button', {name: /login/i});

        userEvent.click(button);
        expect(mockHandleLogin).toHaveBeenCalledTimes(1);
    });

    test('disables login button when email or password is empty', () => {

        (useLoginForm as jest.Mock).mockReturnValue({
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            passwordType: 'password',
            handleEmailChange: jest.fn(),
            handlePasswordChange: jest.fn(),
            handleLogin: jest.fn(),
            togglePasswordVisibility: jest.fn(),
        });


        render(<Login/>);
        const button = screen.getByRole('button', {name: /login/i});
        expect(button).toBeDisabled();
    });

    test('enables login button when both email and password are provided', async () => {
        // Mock the useLoginForm hook to respond to input changes
        (useLoginForm as jest.Mock).mockReturnValue({
            email: 'test@example.com', // Start with empty
            password: 'password123', // Start with empty
            emailError: null,
            passwordError: null,
            passwordType: 'password',
            handleEmailChange: jest.fn().mockImplementation((event) => {
                (useLoginForm as jest.Mock).mockReturnValue({
                    ...useLoginForm(),
                    email: event.target.value // Simulate updating email
                });
            }),
            handlePasswordChange: jest.fn().mockImplementation((event) => {
                (useLoginForm as jest.Mock).mockReturnValue({
                    ...useLoginForm(),
                    password: event.target.value // Simulate updating password
                });
            }),
            handleLogin: jest.fn(),
            togglePasswordVisibility: jest.fn(),
        });

        render(<Login/>);

        const button = screen.getByRole('button', {name: /login/i});
        expect(button).not.toBeDisabled();
    });

    test('renders password visibility toggle for password input', () => {

        (useLoginForm as jest.Mock).mockReturnValue({
            email: 'test@example.com',
            password: 'password123',
            emailError: null,
            passwordError: null,
            passwordType: 'password',
            handleEmailChange: jest.fn(),
            handlePasswordChange: jest.fn(),
            handleLogin: jest.fn(),
            togglePasswordVisibility: jest.fn(),
        });

        render(<Login/>);
        expect(screen.getByTestId('toggleVisibility')).toBeInTheDocument();
    });
});
