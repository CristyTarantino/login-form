// Email validation

// ^(?!.*\.\.): Ensures no consecutive dots anywhere.
// (?!.*\.$): Ensures the local part does not end with a dot.
// (?!^\.): Ensures the local part does not start with a dot.
// [a-zA-Z0-9._%+-]+: Matches one or more of the allowed characters in the local part.
// @: The at-symbol separator.
// (?!-): Ensures the domain does not start with a hyphen.
// (?!.*--): Ensures the domain does not contain consecutive hyphens.
// [a-zA-Z0-9-]+: Matches one or more of the allowed characters in the domain labels.
// (\.[a-zA-Z0-9-]+)*: Matches zero or more domain labels separated by dots.
// \.[a-zA-Z]{2,}: Ensures the top-level domain (TLD) is at least two characters long.
const emailRegex = /^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-zA-Z0-9._%+-]+@(?!-)(?!.*--)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

export const validateEmail = (email: string) => {
    return emailRegex.test(email);
};
