import React, { useState } from "react";
import { fetchMedicineByFilters } from "../../api";
import styled from "styled-components";
import Group from "../../img/Logo.svg";

const Container = styled.div`
  margin: 0 auto;
  max-width: 430px;
  width: 100%;
  height: 100vh;
`;

const Logo = styled.div`
  background-image: url(${Group});
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 156px;
  height: 110px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const PanelButton = styled.button`
  background-color: ${(props) => (props.active ? "#FFD700" : "#FFF8DC")};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #ffeb99;
  }
`;

const SearchResults = styled.div`
  margin-top: 20px;
`;

const MedicineCard = styled.div`
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
`;

const Search = () => {
  const [filters, setFilters] = useState({
    drug_shape: "",
    drug_color: "",
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const shapes = [
    "원형",
    "타원형",
    "장방형",
    "반원형",
    "삼각형",
    "사각형",
    "마름모형",
    "오각형",
    "육각형",
    "팔각형",
  ];
  const colors = [
    "하양",
    "노랑",
    "주황",
    "분홍",
    "연두",
    "초록",
    "청록",
    "파랑",
    "남색",
    "자주",
    "보라",
    "회색",
    "검색",
    "투명",
  ];

  const handleShapeClick = (shape) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      drug_shape: shape === prevFilters.drug_shape ? "" : shape,
    }));
  };

  const handleColorClick = (color) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      drug_color: color === prevFilters.drug_color ? "" : color,
    }));
  };

  const handleSearch = async () => {
    console.log("필터 값:", filters);
    try {
      const data = await fetchMedicineByFilters(filters);
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
      <Title>
        <Logo />
      </Title>
      <FilterContainer>
        <div>
          <h2>약의 모양은 어떤가요?</h2>
          <PanelGrid>
            {shapes.map((shape) => (
              <PanelButton
                key={shape}
                active={filters.drug_shape === shape}
                onClick={() => handleShapeClick(shape)}
              >
                {shape}
              </PanelButton>
            ))}
          </PanelGrid>
        </div>
        <div>
          <h2>약의 색깔은 어떤가요?</h2>
          <PanelGrid>
            {colors.map((color) => (
              <PanelButton
                key={color}
                active={filters.drug_color === color}
                onClick={() => handleColorClick(color)}
              >
                {color}
              </PanelButton>
            ))}
          </PanelGrid>
        </div>
        <button onClick={handleSearch}>검색</button>
      </FilterContainer>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <SearchResults>
        {results.length > 0
          ? results.map((item, index) => (
              <MedicineCard key={index}>
                <img
                  src={item.ITEM_IMAGE}
                  alt={item.ITEM_NAME}
                  style={{ width: "100%", objectFit: "cover" }}
                />
                <h3>{item.ITEM_NAME}</h3>
                <p>효능: {item.CLASS_NAME || "정보 없음"}</p>
              </MedicineCard>
            ))
          : !error && <p>검색 결과가 없습니다.</p>}
      </SearchResults>
    </Container>
  );
};

export default Search;
