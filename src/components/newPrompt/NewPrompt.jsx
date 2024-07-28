import React, { useState } from 'react'
import "./newPrompt.css";
import axios from 'axios';

const NewPrompt = () => {
        const [query,setQuery] = useState('');
        const handleFromSubmit = (e) => {
             e.preventDefault();
             console.log({query});
             axios.post('http://127.0.0.1:8080/chatbot', {query: query})
      .then((res) => {
        setOutput(res.data.response || JSON.stringify(res.data));
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
});
             
        }


        const handleSubmit = async () => {
                if (!selectedFile) {
                  setResponse('Please select a PDF file first.');
                  return;
                }
            
                const formData = new FormData();
                formData.append('pdfFile', selectedFile);
            
                try {
                  const response = await axios.post('http://127.0.0.1:8080/pdf-upload', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                  
                  const responseMessage = response.data.message;
                  setResponse(responseMessage);
                  
                  
                  const newPastResponses = [...pastResponses, responseMessage];
                  setPastResponses(newPastResponses);
                  
                 
                  localStorage.setItem('pdfUploaderResponses', JSON.stringify(newPastResponses));
                  
                } catch (error) {
                  console.error('Error uploading file:', error);
                  let errorMessage = 'An error occurred while uploading the file.';
                  if (error.response) {
                   
                    errorMessage = error.response.data.error || errorMessage;
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                  } else if (error.request) {
                    
                    console.error('No response received:', error.request);
                  } else {
                    
                    console.error('Error setting up request:', error.message);
                  }
                  setResponse(errorMessage);
                }
              };
              
  return (
    <div className='newPrompt'>
      <form className="newForm" onSubmit={handleFromSubmit} >
        {/* <label htmlFor="file">
                <img src="/attachment.png" alt="" />
        </label> */}
        {/* <input id="file" type="file" multiple={false} hidden /> */}
        <button onClick={() => document.getElementById('pdf-file').click()} className="button browse">Browse</button>
        <input type="text" placeholder='Ask anything ...' onChange={(e)=>setQuery(e.target.value)} />
        <button type='submit'>
                <img src="/arrow.png" alt="" />
        </button>
      </form>
    </div>
  )
}

export default NewPrompt
