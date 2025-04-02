import { useSelector } from "react-redux"
import { PaymentDetails } from "./PaymentDetails"
import { useNavigate } from 'react-router-dom'

export const PaymentDetailsContainer = () => {

    const { boxPayments, totalBanance, loading, error } = useSelector(state => state.box)
    const { role } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const goToEdit = (paymentId) => {
        navigate(`/dash/payments/edit/${paymentId}`)
    }

    return (
        <PaymentDetails
            paymentList={boxPayments}
            totalBanance={totalBanance}
            loading={loading}
            error={error}
            isAdmin={role === 'admin'}
            goToEdit={goToEdit}
        />
    )
}
