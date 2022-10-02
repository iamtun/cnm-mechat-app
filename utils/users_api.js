import API from "./APIManager";

export const user_login =  async(data) => {
  try {
    const result = await API("/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: data,
    });
    return result;
  } catch (err) {
    return "bac.."+err.response.data;
  }
};
