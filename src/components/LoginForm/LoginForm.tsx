import React from 'react';
import FormInput from '../FormInput/FormInput';
import {useLoginForm} from '../../hooks/useLoginForm';
import styles from './LoginForm.module.css';

const Login = ({onLogIn} : { onLogIn?: () => void}) => {
    const {
        email,
        password,
        emailError,
        passwordError,
        passwordType,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        togglePasswordVisibility
    } = useLoginForm(onLogIn);

    const buttonClasses = [
        styles.loginButton,
        !passwordError ? styles.loginButtonNoError : ''
    ].join(' ');

    return (
        <form className={styles.loginForm}>
            <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
            />
            <FormInput
                label="Password"
                type={passwordType}
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                toggleVisibility={togglePasswordVisibility}
                isPassword={true}
            />
            <button
                type="button"
                onClick={handleLogin}
                disabled={!email || !password}
                className={buttonClasses}
            >
                Login
            </button>
        </form>
    );
};

export default Login;
