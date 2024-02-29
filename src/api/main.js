import axios from 'axios';

export const axiosCallAdvanced = async ({
    baseURL,
    method = 'get',
    body,
}) => {
    
    try {
        console.log("API HIT ====> ", baseURL)

        const response = await axios({
            baseURL,
            method,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                // Authorization: storedToken,
            },
        });

        return response;
    } catch (error) {
        console.log("error", error)
    }
};
