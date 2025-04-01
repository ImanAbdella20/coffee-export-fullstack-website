import React, { use } from 'react'
import { useNavigate } from 'react-router'

const EachItemPayment = () => {
    const navigate = useNavigate();

    const handlePayNowClick = () =>{
        navigate('/paymentprocess')
    }
  return (
    <div>EachItemPayment
        <button onClick={handlePayNowClick}>pay now</button>
    </div>
  )
}

export default EachItemPayment