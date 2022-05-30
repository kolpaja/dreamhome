import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../../../assets/svg/keyboardArrowRightIcon.svg';
import showPasswordIcon from '../../../assets/icons/showPassword.png';
import hidePasswordIcon from '../../../assets/icons/hidePassword.png';

function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { email, password } = formData;

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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
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
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
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
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* google OAuth */}
        <Link to='/sign-up' className='registerLink'>
          Sign Up instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
