import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";

export const getCategory = async () => {
    try {
        // await new Promise(resolve => setTimeout(resolve, 5000));
        const response = await axios.get(`${mainDomain}/api/categorys`);
        return response.data;
    } catch (error) {
        return {type:'error',message:error.response?.data ? error.response?.data : "خطای شبکه"}
    }
};
