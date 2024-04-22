// import { message } from "antd";
import useFetch, { DiveGoFetchWrapper, DiveGoResponse } from "./useFetch";

/**
 * Make an API call using the appropriate fetcher.
 */
export const api = (): (({
  url,
  params,
}: DiveGoFetchWrapper) => Promise<Response | DiveGoResponse>) => {
  return async ({ url, params }) => {
    const diveGofetch = useFetch();
    try {
      const response = await diveGofetch({ url, params });

      if (response.ok) {
        console.debug("Ok!", response);
      } else if (response.status === 403) {
        console.debug("Login required");

        if (
          (response as DiveGoResponse).data.detail &&
          (response as DiveGoResponse).data.detail.includes(
            "Authentication credentials were not provided.",
          )
        ) {
          console.debug("Not logged in");
          // yield put(logoutSuccess());
          // yield put(doCheckLogin());
        }
      } else if (response.status === 503) {
        console.error("Timeout", response);
      } else {
        console.error("Bad request", response);
      }

      return response;
    } catch (error: any) {
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
    }
  };
};
