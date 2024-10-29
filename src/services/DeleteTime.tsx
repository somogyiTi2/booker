const DeleteTime = async (clickId: string) => {
    console.log(clickId, "was Deleted")
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_LINK}/Time/${clickId}.json`,
            {
                method: 'DELETE',
            }
        );
        if (!response.ok) {
            throw new Error('Request failed!');
        }
  
    } catch {
        console.log("Something is wrong!")
    }

};

export default DeleteTime