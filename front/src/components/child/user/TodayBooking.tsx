import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';

type Booking = {
  reservationId: number;
  reservationState: boolean;
  reservationTime: number;
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

const dummyData = {
  reservationId: 1234,
  reservationState: true,
  reservationTime: '2023-03-24 18:00:00',
  menuId: 5678,
  menuName: 'Spicy Chicken Burger',
  storeId: 9012,
  storeName: 'Burger King',
};

const Wrapper = styled.div`
    display; flex;
    align-items: center;
`;

const PostIt = styled.div`
  position: relative;
  width: 90%;
  height: 200px;
  background-color: #fff8dc;
//   border: 2px solid #ffd700;
  border-radius: 5px;
  margin: 10px;
  padding: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const StoreName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ReservationInfo = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const IdDiv = styled.div`
  text-align: right;
`;

const ReservationId = styled.span`
  font-weight: bold;
`;

const MenuInfo = styled.div`
  margin-bottom: 5px;
`;

const HrDiv = styled.hr`
  margin-bottom: 30px;
`;

const TodayBooking = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  useEffect(() => {
    axios
      .get(`/bookings/child?date=${formattedDate}`)
      .then((response) => {
        console.log("Today's bookings:", response.data);
        const bookings = response.data.map((booking: Booking) => ({
          reservationId: booking.reservationId,
          reservationState: booking.reservationState,
          reservationTime: booking.reservationTime,
          menuId: booking.menuId,
          menuName: booking.menuName,
          storeId: booking.storeId,
          storeName: booking.storeName,
        }));
        console.log('Transformed bookings:', bookings);
        // Handle the transformed data here
      })
      .catch((error) => {
        console.error("Error fetching today's bookings:", error);
      });
  }, [formattedDate]);

  return (
    <Wrapper>
      <PostIt>
        <ReservationInfo>
          <IdDiv>
            <span>예약번호 </span>
            <ReservationId># {dummyData.reservationId}</ReservationId>
          </IdDiv>
          <StoreName>{dummyData.storeName}</StoreName>
          <HrDiv></HrDiv>
        </ReservationInfo>
        <MenuInfo>{`메뉴: ${dummyData.menuName}`}</MenuInfo>
        <span>{`식사 시간: ${dummyData.reservationTime}`}</span>
      </PostIt>
    </Wrapper>
  );
};

export default TodayBooking;
