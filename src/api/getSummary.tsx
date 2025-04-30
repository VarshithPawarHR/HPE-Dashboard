// a function to fetch sumamry (past 15 minutes data) from the server

export async function getSummary(directory: string) {
  const url = `http://127.0.0.1:8000/summary?directory=${encodeURIComponent(directory)}`;

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