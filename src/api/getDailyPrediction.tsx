// daily predictions for the 4 directories
export async function getDailyPrediction() {
  const url = "http://127.0.0.1:8000/predictions/daily";

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