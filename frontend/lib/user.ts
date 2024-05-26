import { API_ORIGIN } from "@/app/config/apiConfig";

export async function isUserLoggedIn(authToken: string) {
  const response = await fetch(`${API_ORIGIN}/api/v1/user/isLoggedIn`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      "Failed to check login status:",
      response.status,
      response.statusText
    );
    return false;
  }

  const data = await response.json();

  return true;
}
