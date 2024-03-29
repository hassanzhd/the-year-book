export enum HttpHeader {
  CONTENT_TYPE = "Content-Type",
  AUTHORIZATION = "Authorization",
}

type HttpHeaders = Partial<Record<HttpHeader, string>>;
class API {
  private headers: HttpHeaders;
  constructor(__headers: HttpHeaders = {}) {
    this.headers = {
      "Content-Type": "application/json",
      ...__headers,
    };
  }

  async handleAndConvertResponse(__response: Response) {
    if (!__response.ok) {
      const data = await __response.json();
      throw new Error(data.message[0]);
    }
    const data = await __response.json();
    return data;
  }

  async getRequest(__url: string) {
    const response = await fetch(__url, {
      headers: this.headers,
      credentials: "include",
    });
    const data = await this.handleAndConvertResponse(response);
    return data;
  }

  async postRequest(__url: string, __body: any = {}) {
    const response = await fetch(__url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(__body),
    });
    const data = await this.handleAndConvertResponse(response);
    return data;
  }

  async formDataPostRequest(__url: string, __formDataBody: any) {
    const response = await fetch(__url, {
      method: "POST",
      body: __formDataBody,
      credentials: "include",
    });
    const data = await this.handleAndConvertResponse(response);
    return data;
  }
}

export default API;
