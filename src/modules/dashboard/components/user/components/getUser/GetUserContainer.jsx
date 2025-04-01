import { useDispatch, useSelector } from "react-redux"
import { GetUser } from "./GetUser"
import { getLastBeneficiaryPayment } from "../../storage/beneficiaryThunks"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setBeneficiarySelected } from "../../storage/beneficiarySlice"
import { setPayer } from "../../../payments/store/paymentSlice"

export const GetUserContainer = () => {

    const { beneficiaries, loading, error } = useSelector(state => state.beneficiary)
    const { box } = useSelector(state => state.payment)
    const { role } = useSelector(state => state.auth)
    const [ searchParams ] = useSearchParams()
    const search = searchParams.get('search')
 
    const [identification, setIdentification] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSearch = (identification) => {
        console.log(identification)
        setIdentification(identification)
        dispatch(getLastBeneficiaryPayment(identification))
    }

    const gotToAddNew = () => {
        navigate('/dash/user/add-new')
    }

    const selectBeneficiary = (beneficiary) => {
        dispatch(setBeneficiarySelected(beneficiary))
        dispatch(setPayer(beneficiary._id))
        navigate('/dash/box/new-payment')
    }

    useEffect(() => {
        if (!box && !search) {
            navigate('/dash/box/list')
        }
    }, [box, navigate, search])


    return (
        <GetUser
            onSearch={onSearch}
            beneficiaries={beneficiaries}
            identification={identification}
            loading={loading}
            error={error}
            gotToAddNew={gotToAddNew}
            selectBeneficiary={selectBeneficiary}
            isAdmin={role === 'admin'}
        />
    )
}
