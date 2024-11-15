const CreateTime = async <T extends { finishTime: Date, nameClass: string, startDate: Date; teamNumber: number; dispatchUpdate: any }>({
  finishTime, nameClass, startDate, teamNumber, dispatchUpdate,
}: T) => {
  try {
    const utcDate = new Date(startDate);
    const formattedDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString().split('.')[0];
    const response = await fetch(
      `${process.env.REACT_APP_API_LINK}/Time/${formattedDate}.json`, 
      {
        method: 'PUT',
        body: JSON.stringify({
          nameClass: nameClass,
          date: startDate.toISOString(),
          available: true,
          teamNumber: teamNumber,
          reservations: [],
          finishTime: finishTime.toISOString()
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Request failed: ${errorData.message || 'Unknown error'}`);
    }

    dispatchUpdate()
    console.log("Data updated successfully.");
  } catch (error) {
    console.log("Something is wrong!", error);
  }
};

export default CreateTime;
