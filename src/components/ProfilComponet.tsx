import ReadProfil from '../services/ReadProfil';
import { useState } from 'react';

const ProfilComponet: React.FC = () => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const phone = localStorage.getItem('phone');
  const [data, setData] = useState<any | null>(null); 

  return (
    <div>
      {name} {email} {phone}
       <ReadProfil setData={setData} />
      {
        data && data.bookingData && data.bookingData.length > 0 ? (
          data.bookingData.map((item: any, index: number) => (
            <div key={index}> {item} </div> 
          ))
        ) : (
          <p>Nincs foglalás</p> 
        )
      }
    </div>
  );
};

export default ProfilComponet;
