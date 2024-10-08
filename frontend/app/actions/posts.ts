import { API_ORIGIN } from "../config/apiConfig";
import { SESSION_TOKEN } from "../config/constants";

// export async function getUserPosts() {
//   try {
//     const response = await fetch(`${API_ORIGIN}/api/v1/user/post`, {
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const posts = await response.json();
//     return posts;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//   }
// }

export async function getPosts(sessionToken: string | undefined) {
  try {
    const response = await fetch(`${API_ORIGIN}/api/v1/posts`, {
      credentials: "include",
      headers: {
        Cookie: `${SESSION_TOKEN}=${sessionToken}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching posts:`, error);
  }
}
