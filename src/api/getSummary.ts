// a function to fetch sumamry (past 15 minutes data) from the server
const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export async function getSummary(directory: string) {
  const url = `${BASE_URL}summary?directory=${encodeURIComponent(directory)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch summary: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Summary data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
}