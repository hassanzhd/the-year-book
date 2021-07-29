class API {
  static async postRequest(__url: string, __body: any) {
    const response = await fetch(__url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(__body),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message[0]);
    }
    const data = await response.json();
    return data;
  }
}

export default API;
