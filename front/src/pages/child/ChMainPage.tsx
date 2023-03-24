import React from 'react';
import styled from 'styled-components';

import SearchStore from '../../common/SearchStore';

const SearchStoreDiv = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding-top: 20px;
`;

const ComponentDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentDiv = styled.div`
  // padding: 20px;
`;

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  width: 70%;
  margin: 30px;
  height: 70%;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  float: left;
  overflow-y: auto;
`;

function ChMainPage() {
  return (
    <ComponentDiv>
      <BoxDiv>
        <SearchStoreDiv>가게 찾기</SearchStoreDiv>
        <h3>내 근처의 식당을 찾아보세요.</h3>
        <ContentDiv>
          <SearchStore />
        </ContentDiv>
      </BoxDiv>
    </ComponentDiv>
  );
}
export default ChMainPage;
