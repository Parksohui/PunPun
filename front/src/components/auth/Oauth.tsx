import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import {
  isChildState,
  isLoggedInState,
  isOwnerState,
  isSupporterState,
} from '../../store/atoms';


const Oauth = () => {
  const navigate = useNavigate();
  const [isChild, setIsChild] = useRecoilState(isChildState);
  const [isSupporter, setIsSupporter] = useRecoilState(isSupporterState);
  //   const code = new URL(window.location.href).searchParams.get('code')
  //   console.log(code);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const res = await axios.get(`api/code=${code}`);
  //         const token = res.headers.authorization;
  //         window.localStorage.setItem('token', token);
  //         // navigate('/kakaoLogin');
  //       } catch (e) {
  //         console.error(e);
  //         // navigate('/kakaoLogin');
  //       }
  //     })();
  //   }, []);

  const getUrlParameter = (name: any) => {
    // 쿼리 파라미터에서 값을 추출해주는 함수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  useEffect(() => {
    const token = getUrlParameter('token');

    const accessToken = token || '';
    console.log(accessToken);
    Cookies.set('access_token', accessToken, {
      expires: 7, // 쿠키 만료 일자
      path: '/', // 쿠키 경로
      secure: true, // HTTPS 프로토콜에서만 전송
      sameSite: 'strict', // SameSite 옵션
      httpOnly: true, // JavaScript를 통한 접근 방지
    });

    const decodedToken:any = jwt_decode(accessToken)
    console.log(decodedToken);

    if (decodedToken.role === 'SUPPORTER') {
      if (!decodedToken.number) {
        navigate('/addnumber');
      } else {
        navigate('/')
      }
      setIsSupporter(true);
    } else {
      navigate('/')
      setIsChild(true);
    }

    // window.localStorage.setItem('accessToken', accessToken);
    // setCookie('accessToken', accessToken, {
    //   path: '/',
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: 'none',
    // });
  }, []);
  return <></>;
};

export default Oauth;
