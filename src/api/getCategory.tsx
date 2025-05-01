import axios from "axios";
export type CategoryRequestData = {
  [key: string]: number;
};

export async function getCategory(data: CategoryRequestData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predictions/category",
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
