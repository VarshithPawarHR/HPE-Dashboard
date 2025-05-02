const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// fetches past few data points for the line graph
export async function getLineGraph(directory: string) {
  const url = `${BASE_URL}directory-usage?directory=${encodeURIComponent(
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
