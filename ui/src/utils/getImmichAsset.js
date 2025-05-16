export const getImmichAsset = async (asset_id) => {
    try {
        const url = new URL(`${import.meta.env.VITE_API_ENDPOINT}/media`, window.location.origin);
        url.searchParams.append('asset_id', asset_id); 
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'video/mp4'
            }
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail);
        } else {
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
            return objectURL;
        }
    } catch (error) {
        // Handle any errors
        console.error("Error fetching Immich asset:", error.message);
        return null;
    }
};