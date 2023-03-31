import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../../store/API';

type Booking = {
  reservationId: number;
  reservationState: boolean;
  reservationTime: number;
  menuId: number;
  menuName: string;
  storeId: number;
  storeName: string;
};

type TodayBookingProps = {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
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

const TodayBooking = ({ bookings, setBookings }: TodayBookingProps) => {
  useEffect(() => {
    API.get('bookings/child')
      .then((response) => {
        console.log("Today's bookings:", response.data.content);
        setBookings(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching today's bookings:", error);
      });
  }, []);

  return (
    <>
      {bookings.map((booking, index) => (
        <Wrapper key={index}>
          <PostIt>
            <ReservationInfo>
              <IdDiv>
                <span>예약번호 </span>
                <ReservationId># {booking.reservationId}</ReservationId>
              </IdDiv>
              <StoreName>{booking.storeName}</StoreName>
              <HrDiv></HrDiv>
            </ReservationInfo>
            <MenuInfo>{`메뉴: ${booking.menuName}`}</MenuInfo>
            <span>{`식사 시간: ${booking.reservationTime}`}</span>
          </PostIt>
        </Wrapper>
      ))}
    </>
  );
};

export default TodayBooking;