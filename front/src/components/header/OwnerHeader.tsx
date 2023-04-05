import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Store, owStoreState, selectedStoreState } from '../../store/atoms';
import UserTypeSelector from './UserTypeSelector';

const NavUl = styled.ul`
  display: flex;
  list-style: none;
  cursor: pointer;
`;

const NavLi = styled.li`
  position: relative;
  margin: 30px;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #5D5A88;
    transition: width 0.3s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }

  &:not(:hover)::before {
    right: 0;
    left: auto;
  }
`;

const StoreDropdown = styled.ul<{ show: boolean }>`
  display: none;
  position: absolute;
  //left: 75%;
  //transform: translateX(-50%);
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
  padding: 10px;

  ${({ show }) =>
    show &&
    `
    display: block;
  `}
`;

const StoreDropdownItem = styled.li`
  cursor: pointer;
  list-style: none;

  &:hover {
    color: white;
    background-color: #3f51b5;
  }
`;

interface OwnerHeaderProps {
  toOwStore: () => void;
  onLogout: () => void;
  onSelect: (item: string) => void;
  items: string[];
  selectedItem: string | undefined;
  role: string;
}

function OwnerHeader(props: OwnerHeaderProps) {
  const [stores, setStores] = useRecoilState(owStoreState);
  const [selectedStore, setSelectedStore] = useRecoilState<null | Store>(
    selectedStoreState
  );
  const [storeDrop, setStoreDrop] = useState(false);
  const { onLogout, toOwStore, onSelect, items, selectedItem, role } = props;

  const navigate = useNavigate();

  useEffect(() => {}, [selectedStore]);

  const toOwBooking = () => {
    navigate(`/owstore/${selectedStore?.storeId ?? ''}/booking`);
  };

  const selectStore = (store: Store | null) => {
    setSelectedStore(store);
    setStoreDrop(true);
    setTimeout(() => {
      if (!store) {
        navigate(`/owstore/${stores[0].storeId}`);
      } else {
        navigate(`/owstore/${store.storeId}`);
      }
    });
  };

  return (
    <NavUl>
      <NavLi onClick={toOwStore}>가게운영</NavLi>
      <NavLi onClick={() => setStoreDrop(!storeDrop)}>
        {selectedStore?.storeName ?? '가게 선택'}
        {storeDrop && (
          <StoreDropdown show={storeDrop}>
            {stores.map((store) => (
              <StoreDropdownItem
                key={store.storeId}
                onClick={() => selectStore(store)}
              >
                {store.storeName}
              </StoreDropdownItem>
            ))}
            <StoreDropdownItem onClick={() => navigate('/owstorelist')}>
              전체 가게 관리
            </StoreDropdownItem>
          </StoreDropdown>
        )}
      </NavLi>
      <NavLi onClick={toOwBooking}>예약관리</NavLi>
      <NavLi onClick={onLogout}>로그아웃</NavLi>
      <UserTypeSelector
        onSelect={onSelect}
        items={items}
        selectedItem={selectedItem}
        role={role}
      />
    </NavUl>
  );
}

export default OwnerHeader;