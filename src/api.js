const BASE_URL =
  "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01";
const API_KEY =
  "Y2zUAeVXmIKWdNkUeoLVnA+fvwI8M+6y6/PP6c0pmG4E4Vq87OGJmkC1dWD+Vb9Ylhxx6QGMSes+3+XXeGf9hw==";

export const fetchMedicineByFilters = async (filters) => {
  const queryParams = new URLSearchParams({
    serviceKey: API_KEY,
    type: "json", // JSON 형식으로 응답받기
    ...filters, // 필터 조건 추가
  });

  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json", // JSON 응답을 명시
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // JSON 응답 처리
    return data.body.items.item; // 데이터에서 필요한 부분만 반환
  } catch (error) {
    console.error("Error fetching medicine data:", error);
    throw error;
  }
};
