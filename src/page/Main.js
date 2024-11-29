import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 20px;
  margin: 10px;
  background-color: ${(props) => props.color || "#ccc"};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const Main = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>'NICKNAME'님</h1>
      <Button color="#FFD700" onClick={() => navigate("/filter")}>
        모양으로 약 검색하기
      </Button>
      <Button color="#87CEFA" onClick={() => navigate("/saved")}>
        내가 등록한 약 보기
      </Button>
    </Container>
  );
};

export default Main;
