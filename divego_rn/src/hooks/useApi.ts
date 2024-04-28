import useFetch, { DiveGoResponse } from "./useFetch";

/**
 * Make an API call using the appropriate fetcher.
 */
export const useApi = <T>(): ((
  url: string,
  params?: {
    body?: string;
    method?: string;
    contentType?: string;
    accept?: string;
    params?: { [key: string]: any };
  },
) => Promise<Response | DiveGoResponse<T>>) => {
  return (url, params) => {
    const diveGofetch = useFetch<T>();

    return diveGofetch(url, params)
      .then((response) => {
        if (response.ok) {
          console.debug("Ok!", response.url);
        } else if (response.status === 403) {
          console.debug("Login required");
        } else if (response.status === 503) {
          console.error("Timeout", response);
        } else {
          console.error("Bad request", response.status, response.url);
        }

        return response;
      })
      .catch((error) => {
        console.error("Error talking to DiveGo:", error);
        if (error.offline) {
          console.error("You are offline.", error);
        }

        const errorResponse = Response.error();
        return {
          ...errorResponse,
          ok: false,
          exception: true,
          status: error.name,
          statusText: error.toString(),
          data: error,
        };
      });
  };
};

export default useApi;
