import axios from "../until/customize-axios";

export const callGetAllPromotions = async () => {

    try {
        const response = await axios.get(
            `/api/v1/promotions/get-all`
        );
        return response;
    } catch (error) {
        console.error("Get promotions error:", error.response?.data || error.message);
        throw error;
    }
}