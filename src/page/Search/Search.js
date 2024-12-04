import React, { useState } from "react";
import { fetchMedicineByFilters } from "../../api";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  max-width: 430px;
  width: 100%;
  height: 100vh;
`;

const Con = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  margin: 10px;
  padding: 15px 10px;
  border-radius: 10px;
`;

const Search = () => {
  const [filters, setFilters] = useState({
    drug_shape: "",
    drug_color: "",
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
    console.log("필터 값:", filters); // 디버깅용 로그
    try {
      const data = await fetchMedicineByFilters(filters);
      console.log("필터링된 데이터:", data);

      if (data.length === 0) {
        setError("검색 결과가 없습니다.");
        setResults([]);
      } else {
        setResults(data);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("검색 중 문제가 발생했습니다.");
    }
  };

  return (
    <Container>
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
      </div>
      <button onClick={handleSearch}>검색</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {results.length > 0 ? (
          results.map((item, index) => (
            <Con key={index}>
              <img
                src={item.ITEM_IMAGE}
                alt={item.ITEM_NAME}
                style={{
                  width: "380px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3>{item.ITEM_NAME}</h3>
              <p>효능: {item.CLASS_NAME || "정보 없음"}</p>
            </Con>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </Container>
  );
};

export default Search;
