import React, { useState } from "react";
import { fetchMedicineByFilters } from "../../api"; // api.js의 fetch 함수 임포트

const Search = () => {
  const [filters, setFilters] = useState({
    drug_shape: "",
    drug_color: "",
    line: "",
    form_code: "",
  });
  const [results, setResults] = useState([]); // 검색 결과 저장
  const [error, setError] = useState(""); // 에러 메시지 저장

  const handleInputChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // 입력값 반영
    }));
  };

  const handleSearch = async () => {
    try {
      const data = await fetchMedicineByFilters(filters);
      setResults(Array.isArray(data) ? data : [data]); // 결과를 배열 형태로 저장
      setError("");
    } catch (err) {
      console.error(err);
      setError("검색 중 문제가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1>약 검색</h1>
      <div>
        <label>
          모양:
          <input
            type="text"
            name="drug_shape"
            value={filters.drug_shape}
            onChange={handleInputChange}
          />
        </label>
        <label>
          색깔:
          <input
            type="text"
            name="drug_color"
            value={filters.drug_color}
            onChange={handleInputChange}
          />
        </label>
        <label>
          분할선:
          <input
            type="text"
            name="line"
            value={filters.line}
            onChange={handleInputChange}
          />
        </label>
        <label>
          제형:
          <input
            type="text"
            name="form_code"
            value={filters.form_code}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={handleSearch}>검색</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h3>{item.ITEM_NAME}</h3>
              <img
                src={item.ITEM_IMAGE}
                alt={item.ITEM_NAME}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p>효능: {item.CLASS_NAME}</p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
