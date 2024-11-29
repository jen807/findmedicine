const BASE_URL =
  "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01";
const API_KEY =
  "Y2zUAeVXmIKWdNkUeoLVnA+fvwI8M+6y6/PP6c0pmG4E4Vq87OGJmkC1dWD+Vb9Ylhxx6QGMSes+3+XXeGf9hw==";

export const fetchMedicineByFilters = async (filters) => {
  const queryParams = new URLSearchParams({
    serviceKey: API_KEY,
    type: "json",
    ...filters,
  });

  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    console.log(`Request URL: ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching medicine data:", error);
    throw error;
  }
};
