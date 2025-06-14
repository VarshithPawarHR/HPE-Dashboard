
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getDirectoryNames() {
  const url = `${BASE_URL}directory-name`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch daily predictions: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    console.log(">>>>>>>>>>>>>>>..:", result.recent_directories);
    return result.recent_directories;
  } catch (error) {
    console.error("Error fetching daily predictions:", error);
    throw error;
  }
}
