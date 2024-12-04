export const fetchMedicineByFilters = async (filters) => {
  const baseUrl =
    "https://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01";

  const queryParams = new URLSearchParams({
    serviceKey:
      "Y2zUAeVXmIKWdNkUeoLVnA+fvwI8M+6y6/PP6c0pmG4E4Vq87OGJmkC1dWD+Vb9Ylhxx6QGMSes+3+XXeGf9hw==", // 여기에 실제 API 키를 입력하세요
    type: "json",
    numOfRows: "300", // 필요한 데이터 양에 맞게 설정
  });

  try {
    const response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    const data = await response.json();

    if (!data.body || !data.body.items) {
      throw new Error("데이터를 가져올 수 없습니다.");
    }

    // 필터링 로직
    const filteredData = data.body.items.filter((item) => {
      // 필터 조건
      const matchesShape = filters.drug_shape
        ? item.DRUG_SHAPE.includes(filters.drug_shape)
        : true;
      const matchesColor = filters.drug_color
        ? item.COLOR_CLASS1?.includes(filters.drug_color) ||
          item.COLOR_CLASS2?.includes(filters.drug_color)
        : true;

      return matchesShape && matchesColor;
    });

    return filteredData;
  } catch (err) {
    console.error("API 요청 중 오류 발생:", err);
    throw err;
  }
};
