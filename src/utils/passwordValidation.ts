import axios from "axios";
import sha1 from "sha1";

// API endpoint for Have I Been Pwned service
const HIBP_API_URL = "https://api.pwnedpasswords.com/range/";

export const validatePassword = async (password:string) => {
    if (password.length < 8) {
        return false;
    }

    const hashedPassword = sha1(password).toUpperCase();
    const prefix = hashedPassword.slice(0, 5);
    const suffix = hashedPassword.slice(5);

    try {
        const response = await axios.get(`${HIBP_API_URL}${prefix}`);

        // client-side password hashing technique called k-anonymity.
        // Instead of sending the entire hashed password to the API,
        // you can send only the first five characters of the hashed password (the prefix).
        // Then, you can compare the remaining hash suffixes returned by the API
        // with the suffix of the hashed password locally in the browser.
        // This approach reduces the amount of data sent over the network and improves performance.
        const suffixes = response.data.split("\n").map((line: string) => line.split(":")[0]);

        const found = suffixes.includes(suffix);
        return !found;
    } catch (error) {
        console.error("Error checking password:", error);
        return true;
    }
};
