import { VITE_API_URL } from "../../../../../config/variables"
import { fetchData } from "../../../../../utils/fetch-request"
import { removePayment } from "../../boxes/store/boxSlice"
import { setError, setLoading, setPaymentCreated, setPaymentEdit } from "./paymentSlice"

export const createPayment = ({ box, concepts, payer, type, amount }) => {
    return async (dispatch) => {

        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/payments`

        const body = {
            box,
            concepts,
            payer,
            type, 
            amount
        }

        const options = {
            method: 'POST',
            body
        }

        try {

            const { body, success } = await fetchData(url, options)

            if (!success) {
                throw new Error(body.error)
            }
            dispatch(setPaymentCreated(body))

        } catch (error) {
            console.log(":(", error)
            dispatch(setError(error.message || String(error)))
        }
        finally {
            dispatch(setLoading(false))
        }

    }
}

export const getPayment = (paymentId) => {
    return async (dispatch) => {
            
            dispatch(setLoading(true))
    
            const url = `${VITE_API_URL}/payments/${paymentId}`
    
            const options = {
                method: 'GET'
            }
    
            try {
    
                const { body, success } = await fetchData(url, options)
    
                if (!success) {
                    throw new Error(body.error)
                }
                dispatch(setPaymentEdit(body))
    
            } catch (error) {
                console.log(":(", error)
                dispatch(setError(error.message || String(error)))
            }
            finally {
                dispatch(setLoading(false))
            }
    }
}

export const editPayment = (paymentId, { box, concepts, payer, type, amount }) => {
    return async (dispatch) => {

        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/payments/${paymentId}`

        const body = {
            box,
            concepts,
            payer,
            type, 
            amount
        }

        const options = {
            method: 'PUT',
            body
        }

        try {

            const { body, success } = await fetchData(url, options)

            if (!success) {
                throw new Error(body.error)
            }
            dispatch(setPaymentCreated(body))

        } catch (error) {
            console.log(":(", error)
            dispatch(setError(error.message || String(error)))
        }
        finally {
            dispatch(setLoading(false))
        }

    }
}


export const deletePayment = (paymentId) => {
    return async (dispatch) => {

        dispatch(setLoading(true))

        const url = `${VITE_API_URL}/payments/${paymentId}`

        const options = {
            method: 'DELETE',
        }

        try {

            const { success } = await fetchData(url, options)

            if (!success) {
                throw new Error(body.error)
            }
            dispatch(dispatch(removePayment(paymentId)))

        } catch (error) {
            console.log(":(", error)
            dispatch(setError(error.message || String(error)))
        }
        finally {
            dispatch(setLoading(false))
        }

    }
}