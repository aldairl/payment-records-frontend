import { useDispatch, useSelector } from "react-redux"
import { PaymentDetails } from "./PaymentDetails"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { deletePayment } from "../../store/paytmentThunks"

export const PaymentDetailsContainer = () => {

    const { boxPayments, totalBanance, loading, error } = useSelector(state => state.box)
    const { role } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [dialogDelete, setDialogDelete] = useState(false)
    const [paymentToDelete, setPaymentToDelete] = useState(null)

    const goToEdit = (paymentId) => {
        navigate(`/dash/payments/edit/${paymentId}`)
    }

    const handleDeletePayment = (paymentId, amount) => {
        setDialogDelete(true)
        setPaymentToDelete({ paymentId, amount })
    }

    const handlerCancelDelete = () => {
        setDialogDelete(false)
        setPaymentToDelete(null)
    }

    const handleConfirmPaymentDelete = () => {
        dispatch(deletePayment(paymentToDelete.paymentId))
        setDialogDelete(false)
    }

    return (
        <PaymentDetails
            paymentList={boxPayments}
            totalBanance={totalBanance}
            loading={loading}
            error={error}
            isAdmin={role === 'admin'}
            goToEdit={goToEdit}
            handleDeletePayment={handleDeletePayment}
            dialogDelete={dialogDelete}
            handlerCancelDelete={handlerCancelDelete}
            handleConfirmPaymentDelete={handleConfirmPaymentDelete}
            paymentToDelete={paymentToDelete}
        />
    )
}
