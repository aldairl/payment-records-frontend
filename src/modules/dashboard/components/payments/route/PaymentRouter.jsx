import { Route, Routes } from "react-router-dom";
import { RegisterPaymentContainer } from "../components/RegisterPaymentContainer";

export default function PaymentRouter() {
    return (
        <Routes>
            <Route path="edit/:paymentId" element={<RegisterPaymentContainer />} />
        </Routes>
    )
}
