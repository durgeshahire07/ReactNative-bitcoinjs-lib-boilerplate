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

export const isValidBitcoinPrivateKey = (key) => {
    //TODO: validation
    return true;
}


export const isValidPolygonAddress = (input) => {
    // Polygon address regex pattern
    const polygonAddressRegex = /^0x[0-9a-fA-F]{40}$/;

    // Check if the input matches the Polygon address pattern
    return polygonAddressRegex.test(input);
}


export const canTransferFunds = (walletBalance, amountToSend) => {
    // Check if the amount to send is less than or equal to the wallet balance
    return amountToSend <= walletBalance;
}
