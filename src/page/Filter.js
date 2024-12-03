import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const FilterButton = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: ${(props) => (props.$active ? "#FFD700" : "#ccc")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Filter = () => {
  const [filters, setFilters] = useState({
    drug_shape: "",
    drug_color: "",
    line: "",
    form_code: "",
  });
  const navigate = useNavigate();

  const applyFilters = () => {
    navigate("/search", { state: { filters } });
  };

  return (
    <Container>
      <h2>필터 선택</h2>
      <div>
        <FilterButton
          $active={filters.drug_shape === "원형"}
          onClick={() => setFilters({ ...filters, drug_shape: "원형" })}
        >
          원형
        </FilterButton>
        <FilterButton
          $active={filters.drug_shape === "타원형"}
          onClick={() => setFilters({ ...filters, drug_shape: "타원형" })}
        >
          타원형
        </FilterButton>
        <FilterButton
          $active={filters.drug_shape === "장방형"}
          onClick={() => setFilters({ ...filters, drug_shape: "장방형" })}
        >
          장방형
        </FilterButton>
        <FilterButton
          $active={filters.drug_shape === "반원형"}
          onClick={() => setFilters({ ...filters, drug_shape: "반원형" })}
        >
          반원형
        </FilterButton>
        <FilterButton
          $active={filters.drug_shape === "삼각형"}
          onClick={() => setFilters({ ...filters, drug_shape: "삼각형" })}
        >
          삼각형
        </FilterButton>
        <FilterButton
          $active={filters.drug_shape === "사각형"}
          onClick={() => setFilters({ ...filters, drug_shape: "사각형" })}
        >
          사각형
        </FilterButton>
        <FilterButton
          $active={filters.drug_shape === "마름모형"}
          onClick={() => setFilters({ ...filters, drug_shape: "마름모형" })}
        >
          마름모형
        </FilterButton>
      </div>
      <button onClick={applyFilters}>검색하기</button>
    </Container>
  );
};

export default Filter;
