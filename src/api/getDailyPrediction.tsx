// daily predictions for the 4 directories
import { BASE_URL } from "@/constants/config";

export async function getDailyPrediction() {
  const url = `${BASE_URL}predictions/daily`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch daily predictions: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Daily Predictions Data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching daily predictions:", error);
    throw error;
  }
}