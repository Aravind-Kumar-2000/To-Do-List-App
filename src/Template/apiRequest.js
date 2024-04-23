async function apiRequest(URL=" ", OptionsObject = null){
    try{
        const data = await fetch(URL, OptionsObject);
        if(!data.ok){
            console.error("Please reload the Application!")
        } 
    } catch(err){
        console.error(err)
    }
};

export default apiRequest;