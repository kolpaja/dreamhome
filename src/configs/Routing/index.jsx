import { Routes, Route } from 'react-router-dom';

import Offers from '../../screens/Offers';
import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import ForgotPassword from '../../screens/Auth/ForgotPassword';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Offers />} />
        <Route path='/profile' element={<SignIn />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default Routing;
