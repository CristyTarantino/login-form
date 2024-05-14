import React, {useState, useCallback} from 'react';
import {validateEmail} from '../utils/emailValidation';
import {validatePassword} from '../utils/passwordValidation';

export const useLoginForm = (onLogIn?: () => void ) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordType, setPasswordType] = useState<string>("password");

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(null);
    }, []);

    const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(null);
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordType(prevType => prevType === "password" ? "text" : "password");
    }, []);

    const handleLogin = async () => {
        const validEmail = validateEmail(email);
        const validPassword = await validatePassword(password);

        if (validEmail && validPassword) {
            localStorage.setItem("email", email);
            setEmailError(null);
            setPasswordError(null);
            !!onLogIn && onLogIn()
        } else {
            setEmailError(validEmail ? null : "Invalid email format");
            setPasswordError(validPassword ? null : "Password has been compromised. Please choose a different one.");
        }
    };

    return {
        email,
        password,
        emailError,
        passwordError,
        passwordType,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        togglePasswordVisibility
    };
};
