const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url,optionsObj)
    if(!response.ok) throw Error("Please reload the App")
// If the response status is not okay (i.e., the request failed),throw an error with a message advising the user to reload the application.
    
  }
   catch (err) {
   errMsg = err.Message;
// Assigning the error message from the 'err' object to the variable 'errMsg'.
  } 
  finally { 
    return errMsg;
  }
};
export default apiRequest;
