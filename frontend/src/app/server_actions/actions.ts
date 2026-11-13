export const getStats = async (token: string, id: string) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/stats/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
};
