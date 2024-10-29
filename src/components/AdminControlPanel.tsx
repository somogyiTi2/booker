import React, { useState } from 'react';
import ModalWindow from './ModalWindow';
import { useDispatch } from 'react-redux';
import { AdminActions, LoginOrBookingActions } from '../store';
import { DateDataType, Reservation } from '../type/DataType';
import style from '../style/AdminControlPanel.module.css';
import DeleteTime from '../services/DeleteTime';
import UpdateBooking from '../services/UpdateBooking';

interface AdminControlPanelProps {
  show: boolean;
  data: DateDataType | {};
}

interface ButtonType {
  functionID: string;
  text: string;
  buttonText?: string;
  button?: string;
}

const AdminControlPanel: React.FC<AdminControlPanelProps> = ({ show, data }) => {
  const dispatch = useDispatch();
  const [selectedFunctionType, setSelectedFunctionType] = useState<string>('');

  const hasProperty = <T extends object>(data: T | {}, key: keyof T): data is T => {
    return key in data;
  };

  const functionTypes: ButtonType[] = [
    { functionID: 'DeleteTime', text: '🚯 Alkalom törlése', buttonText: 'Törlöm az alkamat' },
    { functionID: 'DeletePerson', text: '🚫 Adott óra ürítése', button: '🚫' },
    { functionID: 'Update', text: '🔃 Személy frissítése', button: '🔃' },
  ];

  const handleClose = () => { dispatch(AdminActions.AdminControlPanel({})) };

  const selectedFunction = functionTypes.find(option => option.functionID === selectedFunctionType);

  const handleButtonClick = async (person?: Reservation) => {
    try {
      switch (selectedFunction?.functionID) {
        case 'DeletePerson':
          if (hasProperty(data, 'reservations') && data.reservations) {
            UpdateBooking({
              selectedDate: new Date(data.date).toISOString(),
              name: person?.name || "",
              email: person?.email || "",
              phone: person?.phone.toString() || "",
              functionID: "deletePerson",
            });
            dispatch(AdminActions.AdminControlerDataUpdate(data.reservations.filter((data) => data !== person)))
          }
          break;

        case 'Update':
          dispatch(LoginOrBookingActions.UpdateDate({ person, loginOrBooking: 2 }));
          break;

        case 'DeleteTime':
          if (hasProperty(data, 'date')) {
            const dateToDelete = new Date(data.date).toISOString().split('.')[0];
            console.log("Delete these time:", dateToDelete);
            DeleteTime(dateToDelete)
            dispatch(AdminActions.UpdateData(true))
            handleClose()
          } else {
            console.error("Date is not available");
          }
          break;

        default:
          console.log("Something is wrong!", selectedFunction?.functionID, person);
      }
    } catch (error) {
      console.error("Error handling button click:", error);
    }
  };

  return (
    <ModalWindow onClose={handleClose} show={show}>
      <div className={style.AdminControlPanel}>
        <select
          value={selectedFunctionType}
          onChange={(event) => setSelectedFunctionType(event.target.value)}
        >
          <option value="">Válassz egy lehetőséget</option>
          {functionTypes.map(option => (
            <option key={option.functionID || option.text} value={option.functionID || ''}>
              {option.text}
            </option>
          ))}
        </select>

        <div className={style.boxModule}>
          {hasProperty(data, 'date') && new Date(data.date).toISOString().slice(0, 10)}
          {hasProperty(data, 'reservations') && data.reservations &&
            data.reservations.map((reservation: Reservation, index) => (
              <div key={index} className={style.oneLine}>
                <p>{reservation.name}</p>
                {selectedFunction?.button && (
                  <div onClick={() => handleButtonClick(reservation)}> {selectedFunction?.button}</div>
                )}
              </div>
            ))
          }
        </div>

        <button type="button" onClick={handleClose}>
          Mégse
        </button>

        {selectedFunction?.buttonText && (
          <button type="button" onClick={() => handleButtonClick()}>
            {selectedFunction.buttonText}
          </button>
        )}
      </div>
    </ModalWindow>
  );
};

export default AdminControlPanel;
