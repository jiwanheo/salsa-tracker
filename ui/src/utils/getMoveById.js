export const getMoveById = async (move_id) => {
    try {
        const url = new URL(`${import.meta.env.VITE_API_ENDPOINT}/move-by-id`, window.location.origin);
    
        url.searchParams.append('id', move_id);  

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail);
        } else {
            // If the user was successfully created
            const responseData = await response.json();
            return responseData;
        }
    } catch (error) {
        // Handle any errors
        console.log(error.message);
        return [];
    }
};