import {Routes, Route, useNavigate} from 'react-router-dom'
import { useContext, useEffect} from 'react';
import { UserContext } from './context/userContext';

import LandingPage from './pages/LandingPage/LandingPage';
import MidleUser from './pages/Midle/MidleUser';
import UserPage from './pages/User/UserPage';
import MyApply from './pages/User/MyApply';
import MidleCompany from './pages/Midle/MidleCompany';
import CompanyPage from './pages/Pencaker/CompanyPage';
import MidleAdmin from './pages/Midle/MidleAdmin';
import AdminPage from './pages/Admin/AdminPage';
import DetailJob from './pages/User/DetailJob';
import Profile from './pages/Pencaker/Profile';


import { API, setAuthToken } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  
  const [state, dispatch] = useContext(UserContext);
  
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
        navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/admin');
      } else if (state.user.status === 'company') {
        navigate('/company');
      } else if (state.user.status === 'member') {
        navigate('/user');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
   <>
   <Routes>
    <Route path='/' element={<LandingPage />} />

    <Route path="/user" element={<MidleUser />}>
      <Route index element={<UserPage />}></Route>
      <Route path='/user/apply' element={<MyApply />}></Route>
      <Route path='/user/job/:id' element={<DetailJob />}></Route>
      </Route>

      <Route path="/company" element={<MidleCompany />}>
      <Route index element={<CompanyPage />}></Route>
      <Route path='/company/profile' element={<Profile />}></Route>
      </Route>

      <Route path="/admin" element={<MidleAdmin />}>
      <Route index element={<AdminPage />}></Route>
      </Route>

   </Routes>
   </>
  );
}

export default App;
