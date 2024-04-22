import set from "lodash/set";
import useBuildSearchParams from "./useBuildSearchParams";

export const APPLICATION_JSON = "application/json";

/**
 * DiveGo fetch wrapper.
 *
 * `params` includes a couple of extra items:
 *   * contentType - content type for the request
 *   * accept - accept type for the request
 *   * params - query params
 */

export interface DiveGoFetchWrapper {
  url: string;
  params?: {
    contentType?: string;
    accept?: string;
    params?: { [key: string]: any };
  };
}

export interface DiveGoResponse extends Response {
  data?: any;
  rawData?: any;
}

export const useFetch = (): (({
  url,
  params,
}: DiveGoFetchWrapper) => Promise<Response | DiveGoResponse>) => {
  return async ({ url, params }) => {
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
      window.location.origin,
    );

    useBuildSearchParams({
      queryParams,
      searchParams: composedURL.searchParams,
    });

    if (params?.contentType !== null) {
      headers.append("Content-Type", contentType);
    }

    // By default, we will use application/json here, otherwise we'll just leave
    // it like 'multipart/form-data'
    if (contentType === APPLICATION_JSON) {
      finalParams.body = JSON.stringify(finalParams.body);
    }

    const response = await fetch(composedURL, finalParams).catch((exc) => {
      throw exc;
    });

    const responseContentType = response.headers.get("content-type");

    if (!responseContentType) {
      return response;
    }

    if (response.ok && !responseContentType.startsWith(accept)) {
      console.warn(`Expected ${accept} got ${responseContentType}`);
      return {
        ...response,
        ok: false,
        status: 406,
        statusText: "Not Acceptable",
      };
    }

    if (responseContentType.startsWith(APPLICATION_JSON)) {
      set(response, "data", response.json());

      if (response.ok) {
        set(response, "response.data", (response as DiveGoResponse).data);
      }
    }

    return response;
  };
};

export default useFetch;
