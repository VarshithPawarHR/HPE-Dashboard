// Gets the growth rate for the specified directory for the last 24 hours
export async function getGrowthRate(directory: string) {
  const url = `http://127.0.0.1:8000/growth-rate?directory=${encodeURIComponent(
    directory
  )}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch growth rate: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Growth Rate Data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching growth rate:", error);
    throw error;
  }
}
