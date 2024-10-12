import { useSelector } from "react-redux";
import BookingComponet from "./components/BookingComponet";
import Form from "./components/Form";
import LoginButton from "./components/LoginButton";
import SecureAdminAccess from "./components/SecureAdminAccess";
import { IRootState } from "./store";

function App() {
  const AdminController = useSelector((state: IRootState) => state.Admin)
  const passwordHandler = AdminController.passwordHandler;
 
  return (
    <div>
      {passwordHandler === true && <SecureAdminAccess />}
      <LoginButton />
      <BookingComponet />
      <Form />
    </div>
  );
}

export default App;
