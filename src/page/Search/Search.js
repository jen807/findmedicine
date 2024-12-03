import React, { useState } from "react";
import { fetchMedicineByFilters, fetchMedicineDetails } from "../../api";

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
      if (data.length === 0) {
        setError("검색 결과가 없습니다.");
        setResults([]);
        return;
      }

      // 두 번째 API 호출로 세부 정보 추가
      const detailedResults = await Promise.all(
        data.map(async (item) => {
          const details = await fetchMedicineDetails(item.ITEM_SEQ);
          return {
            ...item,
            효능: details.효능,
            복용법: details.복용법,
            보관법: details.보관법,
          };
        })
      );

      setResults(detailedResults);
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
                style={{ width: "200px", height: "100px", objectFit: "cover" }}
              />
              <p>효능: {item.효능}</p>
              <p>복용법: {item.복용법}</p>
              <p>보관법: {item.보관법}</p>
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
