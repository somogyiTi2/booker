import React, { useEffect } from 'react';

interface ReadProfilProps {
    setData: (dates: any[]) => void;
}

const ReadProfil: React.FC<ReadProfilProps> = ({ setData }) => {
    const fetchProfileHandler = async () => {
        try {
            const name = localStorage.getItem('name');
            const email = localStorage.getItem('email');
            const phone = localStorage.getItem('phone');

            let mixData = '';
            if (name && email && phone) {
                mixData = `${name.split(' ').join('')}${email.split('.').join('')}${phone}`;
            }

            const response = await fetch(
                `${process.env.REACT_APP_API_LINK}/Profil/${mixData}.json`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileHandler();
    }, []);

    return <div></div>;
};

export default ReadProfil;
