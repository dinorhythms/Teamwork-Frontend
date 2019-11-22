/**
 * post API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParams - body parameters of request
 */
export const postRequest = async (endpoint, data, token=null) => {
  const backend = process.env.REACT_APP_BACKEND;
  const url = `${backend}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    new Error(error.message);
  }
};
