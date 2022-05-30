import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/Firebase/firebase.config';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async () => {
    const { name, email } = formData;
    try {
      //update profile name
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      // update user in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' onClick={onLogout} className='logOut'>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              isProfileUpdating && onSubmit();
              setIsProfileUpdating((prevState) => !prevState);
            }}
          >
            {isProfileUpdating ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              name='name'
              id='name'
              value={formData.name}
              onChange={onChange}
              disabled={!isProfileUpdating}
              className={
                isProfileUpdating ? 'profileNameActive' : 'profileName'
              }
            />
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={onChange}
              disabled={!isProfileUpdating}
              className={
                isProfileUpdating ? 'profileEmailActive' : 'profileEmail'
              }
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
