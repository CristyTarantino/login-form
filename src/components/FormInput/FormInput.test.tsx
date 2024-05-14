import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import FormInput from './FormInput'; // Make sure to use the correct relative path to your component

describe('FormInput', () => {
    test('renders input with label', () => {
        render(<FormInput label="Email" type="email" value="" onChange={() => {
        }}/>);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    test('displays the passed value', () => {
        render(<FormInput label="Email" type="email" value="test@example.com" onChange={() => {
        }}/>);
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });

    test('calls onChange handler when changed', () => {
        const handleChange = jest.fn();
        render(<FormInput label="Email" type="email" value="" onChange={handleChange}/>);
        fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'a'}});
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('renders error message when passed', () => {
        const errorMessage = 'Invalid input';
        render(<FormInput label="Email" type="email" value="" onChange={() => {
        }} error={errorMessage}/>);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('does not render error message when not passed', () => {
        render(<FormInput label="Email" type="email" value="" onChange={() => {
        }}/>);
        const errorMessage = screen.queryByText(/invalid input/i);
        expect(errorMessage).toBeNull();
    });

    test('renders as required when isRequired is true', () => {
        render(<FormInput label="Email" type="email" value="" onChange={() => {
        }} isRequired/>);
        expect(screen.getByLabelText('Email')).toBeRequired();
    });

    test('renders visibility toggle when isPassword is true', () => {
        render(<FormInput label="Password" type="password" value="" onChange={() => {
        }} isPassword/>);
        expect(screen.getByText('Show')).toBeInTheDocument();
    });

    test('does not render visibility toggle when isPassword is false', () => {
        render(<FormInput label="Password" type="password" value="" onChange={() => {
        }} isPassword={false}/>);
        const toggleButton = screen.queryByText('Show');
        expect(toggleButton).toBeNull();
    });

    test('toggle visibility button changes text when clicked', () => {
        const toggleVisibility = jest.fn();
        render(<FormInput label="Password" type="password" value="" onChange={() => {
        }} isPassword toggleVisibility={toggleVisibility}/>);

        const button = screen.getByText('Show');
        fireEvent.click(button);
        expect(toggleVisibility).toHaveBeenCalledTimes(1);
    });
});
