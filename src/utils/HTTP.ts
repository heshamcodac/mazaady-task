import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { validURL } from "@utils";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface HttpArgs {
  method: HttpMethod;
  endpoint: string;
  data?: unknown;
  auth?: boolean;
  contentType?: string;
  headers?: Record<string, string>;
  options?: AxiosRequestConfig & {
    throwError?: boolean;
    return_full_response?: boolean;
    handlePermissionError?: boolean;
  };
  version?: string;
}

const HTTP_REQUEST = async ({
  method,
  endpoint,
  data = {},
  auth = true,
  contentType = "application/json",
  headers = {},
  options = {
    throwError: false,
  },
  version = "v1",
}: HttpArgs) => {
  // ? why I can't access process.env.NEXT_PUBLIC_PRIVATE_KEY
  try {
    const res = await axios({
      method,
      headers: {
        ...headers,
        "Content-Type": contentType,
        "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
      },
      url: validURL(endpoint)
        ? endpoint
        : `${process.env.NEXT_PUBLIC_API_URL}/${version}/${endpoint}`,
      data: data,
      ...options,
    }).then((res: AxiosResponse) => {
      if (options.return_full_response) return res;
      return res?.data || res;
    });
    return res;
  } catch (err: any) {
    if (err?.response?.status === 401) {
      let redirect = "";
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/logout"
      ) {
        redirect = `?redirect=${window.location.pathname}`;
      }
      if (window.location.pathname !== "/login") {
        window.location.href = `/login${redirect}`;
      }
      window.localStorage.removeItem("giza_system_access_token");
      return err.response;
    }
    if (
      err?.response?.status === 403 &&
      (options.handlePermissionError || method !== "GET")
    ) {
      window.location.href = "/403";
      return;
    }
    return err.response || err;
  }
};

export const GET = (config: Omit<HttpArgs, "method">) =>
  HTTP_REQUEST({
    method: "GET",
    ...config,
  });

export const POST = (config: Omit<HttpArgs, "method">) =>
  HTTP_REQUEST({
    method: "POST",
    ...config,
  });

export const PATCH = (config: Omit<HttpArgs, "method">) =>
  HTTP_REQUEST({
    method: "PATCH",
    ...config,
  });

export const PUT = (config: Omit<HttpArgs, "method">) =>
  HTTP_REQUEST({
    method: "PUT",
    ...config,
  });

export const DELETE = (config: Omit<HttpArgs, "method">) =>
  HTTP_REQUEST({
    method: "DELETE",
    ...config,
  });
