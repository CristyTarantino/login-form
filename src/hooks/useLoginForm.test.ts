import {renderHook, act, waitFor} from '@testing-library/react';
import {useLoginForm} from './useLoginForm';
import {validateEmail} from '../utils/emailValidation';
import {validatePassword} from '../utils/passwordValidation';

// At the top of your test file
jest.mock('../utils/emailValidation', () => ({
    validateEmail: jest.fn()
}));

jest.mock('../utils/passwordValidation', () => ({
    validatePassword: jest.fn()
}));

// Then set up your mock implementations
beforeEach(() => {
    (validateEmail as jest.Mock).mockReturnValue(true);
    (validatePassword as jest.Mock).mockResolvedValue(true);
});

describe('useLoginForm', () => {
    it('should initiate with default values', () => {
        const {result} = renderHook(() => useLoginForm());

        expect(result.current.email).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.emailError).toBeNull();
        expect(result.current.passwordError).toBeNull();
        expect(result.current.passwordType).toBe("password");
    });

    it('should handle email changes', () => {
        const {result} = renderHook(() => useLoginForm());
        const testEmail = "test@example.com";

        act(() => {
            result.current.handleEmailChange({target: {value: testEmail}} as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.email).toBe(testEmail);
        expect(result.current.emailError).toBeNull();
    });

    it('should handle password changes', () => {
        const {result} = renderHook(() => useLoginForm());
        const testPassword = "password123";

        act(() => {
            result.current.handlePasswordChange({target: {value: testPassword}} as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.password).toBe(testPassword);
        expect(result.current.passwordError).toBeNull();
    });

    it('should toggle password visibility', () => {
        const {result} = renderHook(() => useLoginForm());

        act(() => {
            result.current.togglePasswordVisibility();
        });

        expect(result.current.passwordType).toBe("text");

        act(() => {
            result.current.togglePasswordVisibility();
        });

        expect(result.current.passwordType).toBe("password");
    });

    it('should handle login with valid credentials', async () => {
        const onLogIn = jest.fn();
        const {result} = renderHook(() => useLoginForm(onLogIn));

        act(() => {
            result.current.handleEmailChange({target: {value: "user@example.com"}} as React.ChangeEvent<HTMLInputElement>);
            result.current.handlePasswordChange({target: {value: "safePassword123!"}} as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.handleLogin();
        });

        await waitFor(() => {
            expect(validateEmail).toHaveBeenCalledWith("user@example.com");
        });

        await waitFor(() => {
            expect(validatePassword).toHaveBeenCalledWith("safePassword123!");
        });

        await waitFor(() => {
            expect(onLogIn).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(localStorage.getItem("email")).toBe("user@example.com");
        });
    });

    it('should handle login with invalid credentials', async () => {
        (validateEmail as jest.Mock).mockReturnValueOnce(false);
        (validatePassword as jest.Mock).mockResolvedValueOnce(false);
        const {result} = renderHook(() => useLoginForm());

        act(() => {
            result.current.handleLogin();
        });

        await waitFor(() => {
            expect(result.current.emailError).toBe("Invalid email format");
        });

        await waitFor(() => {
            expect(result.current.passwordError).toBe("Password has been compromised. Please choose a different one.");
        })
    });
});
