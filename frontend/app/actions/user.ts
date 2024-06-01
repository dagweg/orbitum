import { API_ORIGIN } from "../config/apiConfig";
import { SESSION_TOKEN } from "../config/constants";

export async function checkLoginStatus(sessionToken: string) {
  try {
    const res = await fetch(`${API_ORIGIN}/api/v1/user/status`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `${SESSION_TOKEN}=${sessionToken}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    return data.loggedIn;
  } catch (error) {
    console.log("ERROR CHECKING LOGGED IN STATUS: ", (error as Error).message);
    return false;
  }
}
