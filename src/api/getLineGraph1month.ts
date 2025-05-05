const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetches past data points for the line graph
export async function getLineGraph1month(directory: string) {
  const sanitizedDir = directory.replace(/^\//, ''); // Remove leading slash
  const url = `${BASE_URL}predictions/monthly-line/${encodeURIComponent(sanitizedDir)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch line graph data: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching line graph data:", error);
    throw error;
  }
}
