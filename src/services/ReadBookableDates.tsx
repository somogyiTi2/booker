import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminActions, IRootState } from '../store';


const ReadBookableDates: React.FC<{ setBookableDates: (dates: any[]) => void }> = ({ setBookableDates }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const updateData = useSelector((store: IRootState) => store.Admin.updateData)
  const dispatch = useDispatch()

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_LINK}/Time.json`);
      if (!response.ok) {
        throw new Error('Valami hiba van!');
      }
      const data = await response.json();
      const loadedMovies: any[] = [];

      for (const key in data) {
        loadedMovies.push({
          date: new Date(data[key].date),
          available: data[key].available,
          finishTime: data[key].finishTime,
          nameClass: data[key].nameClass,
          teamNumber: data[key].teamNumber,
          reservations: data[key].reservations,
        });
      }
      setBookableDates(loadedMovies);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovieHandler();
    dispatch(AdminActions.UpdateData(false))
  }, [updateData]);

  return <>
    {isLoading && <h1>Loading...</h1>}
    {error && <h1>error</h1>}
  </>;
};

export default ReadBookableDates;


