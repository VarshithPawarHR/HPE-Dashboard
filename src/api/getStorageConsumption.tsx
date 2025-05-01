// Gets the total storage consumption for the specified directory
const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export async function getStorageConsumption(directory: string) {
  const url = `${BASE_URL}total-consumption?directory=${encodeURIComponent(directory)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch storage consumption: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Storage Consumption Data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching storage consumption:", error);
    throw error;
  }
}