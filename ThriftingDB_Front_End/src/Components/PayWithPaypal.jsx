import React, { useState, useRef, useEffect} from 'react'

import Axios from "axios";


 
function PayWithPaypal(props) {
 
    const{price,category, condition, size, gender, id,reloadSales} = props
    const[paidFor,setPaidFor] = useState(false)
    const[error, setError] = useState(null)
    const paypalRef = useRef()
 

 
    
    useEffect (() => {
 
        window.paypal
            .Buttons ({
                createOrder:(data, actions) => {
 
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units:[{
 
                            description:'Clothes ',
                            amount:{
                                currency_code: 'EUR',
                                value: price
                            }
 
                        }]
                    })
                },
                onApprove: async ( data, actions) => {
                    await actions.order.capture();
                    setPaidFor(true);

 
                },
                onError: err => {
 
                    setError(err)

                }
            }).render(paypalRef.current)
 
    },[price])
 
    if (paidFor) {
 
        Axios.get("http://localhost:8080/thrifting/welcome/deletesale/" + id).then((response) => {
            reloadSales()
            })
 
        return (
 
            <div className="successPayment">Thanks For purchase</div>
        )
    }
    if(error) {
        return (
            <div>Error in proccessing payment, Please try again</div>
        )
    }
    return (
        <>
                                <p><strong>Category: </strong>{category}</p>
                                <p><strong>Price :</strong> {price} €</p>
                                <p><strong>Gender : </strong>{gender} </p>
                                <p><strong>Size :</strong> {size} </p>
                                <p><strong>Condition : </strong>{condition} </p>
                                <hr/>
                                <div ref={paypalRef}></div>
        </>
    )
}
export default PayWithPaypal