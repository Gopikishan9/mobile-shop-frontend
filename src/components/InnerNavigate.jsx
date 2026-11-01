import React from 'react'
import { useNavigate } from 'react-router-dom'

function InnerNavigate() {

    const navigete = useNavigate();

  return (
    <div className='useNavigate'>
      <button onClick={() => navigete(-1)}>back</button>
    </div>
  )
}

export default InnerNavigate
