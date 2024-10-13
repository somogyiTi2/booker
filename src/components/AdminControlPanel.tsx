import React, { useState } from 'react';
import ModalWindow from './ModalWindow';
import { useDispatch } from 'react-redux';
import { AdminActions } from '../store';
import { DateDataType } from '../type/DataType';

interface AdminControlPanelProps {
  show: boolean;
  data: DateDataType | {};
}

interface ButtonType {
  functionID: string;
  text: string;
  buttonText: string;
}

const AdminControlPanel: React.FC<AdminControlPanelProps> = ({ show, data }) => {
  const dispatch = useDispatch();
  const [selectedFunctionType, setSelectedFunctionType] = useState<string>('');



  const functionTypes: ButtonType[] = [
    { functionID: 'DeleteTime', text: '🚯 Alkalom törlése', buttonText: 'Törlöm az alkamat' },
    { functionID: 'DeletePerson', text: '🚮 Adott óra ürítése', buttonText: 'Személy/ek törlése az adott óráról' },
    { functionID: 'Update', text: '🔃 Személy frissítése', buttonText: 'Adatok frissítése' },
  ];

  const handleClose = () => { dispatch(AdminActions.AdminControlPanel({})) };

  const handleButtonClick = () => {
    const selectedFunction = functionTypes.find(option => option.functionID === selectedFunctionType);
    if (selectedFunction?.functionID) {
      console.log(selectedFunction.functionID);
    }
  };

  const selectedFunction = functionTypes.find(option => option.functionID === selectedFunctionType);

  return (
    <ModalWindow onClose={handleClose} show={show}>
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
   

      <button type="button" onClick={handleClose}>
        Mégse
      </button>

      {selectedFunction?.buttonText && (
        <button type="button" onClick={handleButtonClick}>
          {selectedFunction.buttonText}
        </button>
      )}
    </ModalWindow>
  );
};

export default AdminControlPanel;
