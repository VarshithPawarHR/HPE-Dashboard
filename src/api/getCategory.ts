import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export type CategoryRequestData = {
  [key: string]: number;
};

export async function getCategory(data: CategoryRequestData) {
  try {
    const response = await axios.post(
      `${BASE_URL}predictions/category`, // Use BASE_URL here
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}