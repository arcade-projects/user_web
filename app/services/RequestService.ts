import Cookies from "universal-cookie";
import toastService from "./ToastService";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const APPLICATION_JSON = "application/json";

class RequestService {
  private readonly endpoint: string;
  private cookies: Cookies;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.cookies = new Cookies(null, { path: "/" });
  }

  async get(params = ""): Promise<any> {
    try {
      const response = await fetch(BASE_URL + this.endpoint + params, {
        method: "GET",
        headers: this.getHeaders(),
        credentials: "include",
      });

      if (!response.ok) throw new Error("خطا در دریافت اطلاعات");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async post(payload?: object): Promise<any> {
    const toastId = toastService.showLoading();

    try {
      const isFormData = payload instanceof FormData;

      const response = await fetch(BASE_URL + this.endpoint, {
        method: "POST",
        headers: {
          ...this.getHeaders(),
          ...(isFormData ? {} : { "Content-Type": APPLICATION_JSON }),
        },
        body: isFormData ? payload : JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toastService.updateSuccess(toastId, data?.message);
      } else {
        toastService.updateError(toastId, data?.message || "خطایی از سمت سرور رخ داد");
      }

      return data;
    } catch (error: any) {
      toastService.updateError(toastId, error?.message || "خطای شبکه رخ داده است");
      return null;
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: APPLICATION_JSON,
    };

    const token = this.cookies.get("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }
}

export default RequestService;