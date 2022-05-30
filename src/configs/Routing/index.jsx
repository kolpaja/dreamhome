import { Routes, Route } from 'react-router-dom';

import Offers from '../../screens/Offers';
import Explore from '../../screens/Explore';
import Profile from '../../screens/Profile';
import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import NotFound from '../../screens/NotFound';
import PrivateRoute from '../../components/PrivateRoute';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routing;
