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
    return data.body?.items || [];
  } catch (error) {
    console.error("Error fetching medicine data:", error);
    throw error;
  }
};

const DETAILS_BASE_URL =
  "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService02/getMdcinDrugInfoList01";

export const fetchMedicineDetails = async (itemSeq) => {
  const queryParams = new URLSearchParams({
    serviceKey: API_KEY,
    type: "json",
    itemSeq,
  });

  const url = `${DETAILS_BASE_URL}?${queryParams.toString()}`;
  console.log("세부 정보 요청 URL:", url);

  try {
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
    console.log("세부 정보 응답 데이터:", data);

    if (!data.body || !data.body.items || !data.body.items[0]) {
      throw new Error("API에서 유효한 데이터를 받지 못했습니다.");
    }

    const details = data.body.items[0];
    console.log("세부 정보 아이템:", details);

    return {
      효능: details.EFCN || "정보 없음",
      복용법: details.USE_METHOD_QTY || "정보 없음",
      보관법: details.STORAGE_METHOD || "정보 없음",
    };
  } catch (error) {
    console.error("Error fetching medicine details:", error);
    throw error;
  }
};
