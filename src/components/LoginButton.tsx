import { useEffect, useState } from 'react';
import { IRootState, LoginOrBookingActions } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import style from '../style/LoginButton.module.css'

const LoginButton = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const showWindow = useSelector((state: IRootState) => state.LoginOrBooking.formWindowVisibility);

  const logInButtonHandler = () => {
    dispatch(LoginOrBookingActions.SelectedLogin({ login: 0 }));
  };
  const logOutButtonHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };


  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    setIsLoggedIn(!!(name && email && phone));
  }, [showWindow]);

  return (
    <>
      {isLoggedIn ? (
       <button className={`${style.logout} ${style.logbutton}`} onClick={logOutButtonHandler}>
       Log out
     </button>
      ) : (
        <button className={`${style.login} ${style.logbutton}`} onClick={logInButtonHandler}  >
          Log in
        </button>
      )}
    </>
  );
}

export default LoginButton;
