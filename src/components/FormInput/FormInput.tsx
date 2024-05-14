import React, {ChangeEventHandler} from 'react';
import styles from './FormInput.module.css';

export type FormInputProps = {
    label: string;
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    error?: string | null;
    isRequired?: boolean;
    toggleVisibility?: () => void;
    isPassword?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({label, type, value, onChange, error, isRequired,
                                                 toggleVisibility,
                                                 isPassword}) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={type}>{label}</label>
            <div className={styles.inputContainer}>
            <input
                type={type}
                id={type}
                value={value}
                onChange={onChange}
                required={isRequired}
            />
            {isPassword && (
                <button type="button" onClick={toggleVisibility} className={styles.visibilityToggle}>
                    {type === "password" ? "Show" : "Hide"}
                </button>
            )}
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default React.memo(FormInput);
