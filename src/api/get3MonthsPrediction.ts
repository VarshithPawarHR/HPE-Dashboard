const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function get3MonthsPrediction() {
  const url = `${BASE_URL}predictions/3_months`;

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