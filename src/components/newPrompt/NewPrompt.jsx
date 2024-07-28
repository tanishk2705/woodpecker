import React, { useState } from 'react'
import "./newPrompt.css";

const NewPrompt = () => {
        const [query,setQuery] = useState('');
        const handleFromSubmit = (e) => {
             e.preventDefault();
             console.log({query});
             
        }
  return (
    <div className='newPrompt'>
      <form className="newForm" onSubmit={handleFromSubmit} >
        <label htmlFor="file">
                <img src="/attachment.png" alt="" />
        </label>
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder='Ask anything ...' onChange={(e)=>setQuery(e.target.value)} />
        <button type='submit'>
                <img src="/arrow.png" alt="" />
        </button>
      </form>
    </div>
  )
}

export default NewPrompt
