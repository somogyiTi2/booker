
import { useSelector } from "react-redux";
import AdminHandlers from "./components/AdminHandlers";
import BookingComponet from "./components/BookingComponet";
import Form from "./components/Form";
import LoginButton from "./components/LoginButton";
import ProfilComponet from "./components/ProfilComponet";
import { IRootState } from "./store";


function App() {
  const isLoggedIn = useSelector((state: IRootState) => state.LoginOrBooking.login);

  return (
    <>
      <div>
        <AdminHandlers />
        <LoginButton />
        <BookingComponet />
        <Form />
      </div>
      {isLoggedIn &&
        <ProfilComponet />
      }
    </>
  );
}

export default App;
