import { useState, useCallback } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse {
  [key: string]: any;
}

interface UseApiResult {
  isLoading: boolean;
  error: string | null;
  get: (endpoint: string, headers?: HeadersInit) => Promise<ApiResponse>;
  post: (endpoint: string, body: ApiResponse, headers?: HeadersInit) => Promise<ApiResponse>;
  put: (endpoint: string, body: ApiResponse, headers?: HeadersInit) => Promise<ApiResponse>;
  del: (endpoint: string, headers?: HeadersInit) => Promise<ApiResponse>;
}

const useApi = (baseUrl: string): UseApiResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (endpoint: string, method: RequestMethod = "GET", body: ApiResponse | null = null, headers: HeadersInit = {}): Promise<ApiResponse> => {
      setIsLoading(true);
      setError(null);
      try {
        const config: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        };
        if (body) config.body = JSON.stringify(body);

        const response = await fetch(`${baseUrl}${endpoint}`, config);
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  const get = useCallback(
    (endpoint: string, headers?: HeadersInit): Promise<ApiResponse> => request(endpoint, "GET", null, headers),
    [request]
  );

  const post = useCallback(
    (endpoint: string, body: ApiResponse, headers?: HeadersInit): Promise<ApiResponse> => request(endpoint, "POST", body, headers),
    [request]
  );

  const put = useCallback(
    (endpoint: string, body: ApiResponse, headers?: HeadersInit): Promise<ApiResponse> => request(endpoint, "PUT", body, headers),
    [request]
  );

  const del = useCallback(
    (endpoint: string, headers?: HeadersInit): Promise<ApiResponse> => request(endpoint, "DELETE", null, headers),
    [request]
  );

  return { isLoading, error, get, post, put, del };
};

export default useApi;
