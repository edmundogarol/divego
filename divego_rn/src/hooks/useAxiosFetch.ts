import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import environmentConfig from "@utils/environmentConfig";
import { isJson } from "@utils/utils";

export const APPLICATION_JSON = "application/json";

export interface AxiosFetchWrapperResponse<T> {
  fetch: () => Promise<{ data: T | undefined; error: object | undefined }>;
  data: T | undefined;
  loading: boolean;
  error: object | undefined;
}

const useAxiosFetch = <T>(
  url: string,
  params?: {
    data?: object;
    method?: string;
    contentType?: string;
    accept?: string;
    params?: { [key: string]: any };
  },
): AxiosFetchWrapperResponse<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<object | undefined>(undefined);
  const baseUrl = (url: string) => `${environmentConfig.HOST}/api/${url}`;

  const fetch = useCallback(async () => {
    let fetchData;
    let fetchError;

    setLoading(true);
    try {
      const response = await axios({
        url: baseUrl(url),
        headers: {
          Accept: APPLICATION_JSON,
        },
        ...params,
      });

      fetchData = response.data || response.config.data;
      if (!!fetchData) {
        console.debug("Ok!", response.config.url);
      } else if (response.status === 403) {
        console.debug("Login required");
      } else if (response.status === 503) {
        console.error("Timeout", response);
      } else {
        console.error("Bad request", response.status, url);
      }
      setData(fetchData);
    } catch (responseError) {
      const errors = responseError as Error | AxiosError;

      if (axios.isAxiosError(errors)) {
        if (isJson(errors.request?._response)) {
          setError(JSON.parse(errors.request?._response));
          fetchError = JSON.parse(errors.request?._response);
        } else {
          setError({ error: errors.request?._response });
          fetchError = { error: errors.request?._response };
        }
      } else {
        setError({ error: responseError as unknown as string });
        fetchError = { error: responseError as unknown as string };
      }
      console.log("Fetch error: ", fetchError, url);
    } finally {
      setLoading(false);
    }

    return { data: fetchData, error: fetchError };
  }, [url, params, data, error, loading]);

  return {
    fetch,
    data,
    loading,
    error,
  };
};

export default useAxiosFetch;
