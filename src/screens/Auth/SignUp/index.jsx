import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../configs/Firebase/firebase.config';
import { ReactComponent as ArrowRightIcon } from '../../../assets/svg/keyboardArrowRightIcon.svg';
import showPasswordIcon from '../../../assets/icons/showPassword.png';
import hidePasswordIcon from '../../../assets/icons/hidePassword.png';

function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Create An Account</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            id='name'
            placeholder='Name'
            onChange={onChange}
            className='emailInput'
          />
          <input
            type='email'
            id='email'
            placeholder='Email'
            onChange={onChange}
            className='emailInput'
          />
          <div className='passwordInputDiv'>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id='password'
              placeholder='Password'
              onChange={onChange}
              className='passwordInput'
            />

            <img
              src={isPasswordVisible ? showPasswordIcon : hidePasswordIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Sign In instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
