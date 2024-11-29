import React, { useState } from "react";
import { fetchMedicineByFilters } from "../../api";

const Search = () => {
  const [filters, setFilters] = useState({
    drug_shape: "",
    drug_color: "",
    line: "",
    form_code: "",
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const data = await fetchMedicineByFilters(filters);
      setResults(data.body.items); // API 응답에서 items를 가져옴
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

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                width: "200px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {item.ITEM_IMAGE ? (
                <img
                  src={item.ITEM_IMAGE}
                  alt={item.ITEM_NAME}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>이미지 없음</p>
                </div>
              )}
              <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                {item.ITEM_NAME}
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {item.CLASS_NAME}
              </p>
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
