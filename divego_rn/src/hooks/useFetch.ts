import set from "lodash/set";
import useBuildSearchParams from "./useBuildSearchParams";
import environmentConfig from "@utils/environmentConfig";

export const APPLICATION_JSON = "application/json";

/**
 * DiveGo fetch wrapper.
 *
 * `params` includes a couple of extra items:
 *   * contentType - content type for the request
 *   * accept - accept type for the request
 *   * params - query params
 */

export interface DiveGoResponse<T> extends Response {
  data?: T | null;
  rawData?: any;
}

export const useFetch = <T>(): ((
  url: string,
  params?: {
    method?: string;
    contentType?: string;
    accept?: string;
    params?: { [key: string]: any };
  },
  type?: any,
) => Promise<Response | DiveGoResponse<T>>) => {
  return (url, params, type) => {
    const inputParams = params || {};
    const {
      contentType = APPLICATION_JSON,
      accept = APPLICATION_JSON,
      params: queryParams,
    } = inputParams;

    const headers = new Headers({
      Accept: accept,
    });

    const finalParams: RequestInit = {
      credentials: "same-origin",
      ...inputParams,
      headers,
    };

    const composedURL = new URL(
      url.includes("api") ? url : `api/${url}`,
      environmentConfig.HOST,
    );

    useBuildSearchParams({
      queryParams,
      searchParams: composedURL.searchParams,
    });

    if (params?.contentType !== null) {
      headers.append("Content-Type", contentType);
    }

    if (contentType === APPLICATION_JSON) {
      finalParams.body = JSON.stringify(finalParams.body);
    }

    let responseAssign: Response | DiveGoResponse<typeof type>;

    return fetch(composedURL, finalParams)
      .then((fetchResponse) => {
        const responseContentType = fetchResponse.headers.get("content-type");

        if (!responseContentType) {
          return fetchResponse;
        }

        if (fetchResponse.ok && !responseContentType.startsWith(accept)) {
          console.warn(`Expected ${accept} got ${responseContentType}`);
          return {
            ...fetchResponse,
            ok: false,
            status: 406,
            statusText: "Not Acceptable",
          };
        }

        if (responseContentType.startsWith(APPLICATION_JSON)) {
          responseAssign = fetchResponse;
        }

        return fetchResponse.json();
      })
      .then((responseJson) => {
        if (responseAssign.ok) {
          set(responseAssign, "data", responseJson);
        }
        return responseAssign;
      })
      .catch((exc) => {
        throw exc;
      });
  };
};

export default useFetch;
