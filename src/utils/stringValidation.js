export const isPolygonPrivateKeyValid = (input) => {
    if (input?.length !== 64) {
        return false;
    }

    for (let i = 0; i < input.length; i++) {
        if (!isValidCharacter(input?.charAt(i))) {
            return false;
        }
    }
    return true;
}

export const isValidCharacter = (char) => {
    // Regular expression to check if the character is alphanumeric
    const alphanumericRegex = /^[a-zA-Z0-9]$/;

    // Test if the character matches the alphanumeric pattern
    return alphanumericRegex.test(char);
}

