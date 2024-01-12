interface ApiResponse<T> {
  resp: T[];
  success: boolean;
}
export const fetchUserData = async <T>(
  url: string,
  Method: string
): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    method: Method,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const data = await response.json();
  return data;
};
