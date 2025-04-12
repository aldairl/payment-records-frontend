import { RegisterPayment } from "./RegisterPayment"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { MONTHS, YEARS } from "../utils/months"
import { useEffect, useState } from "react"
import { getConceptList } from "../../../store/dashThunks"
import { clean } from "../store/paymentSlice"
import { useNavigate, useParams } from "react-router-dom"
import { createPayment, deletePaymentConcept, editPayment, getPayment } from "../store/paytmentThunks"
import { setConceptList } from "../../../store/dashSlice"


const checkoutSchema = yup.object().shape({
    payer: yup.string().required("required"),
    // amount: yup.number().required("required"),
    box: yup.string().required("required"),
    type: yup.string().required("required"),
})

export const RegisterPaymentContainer = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { paymentId } = useParams()
    const [resetFormAction, setResetFormAction] = useState()
    const { payer, box, loading, paymentCreated, paymentEdit } = useSelector(state => state.payment)
    const { beneficiarySelected } = useSelector(state => state.beneficiary)
    const { conceptList } = useSelector(state => state.dash)
    const { boxes } = useSelector(state => state.box)
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogDeleteConcept, setOpenDialogDeleteConcept] = useState(false)
    const [conceptToDelete, setconCeptToDelete] = useState(null)
    const [initialValues, setInitialValues] = useState({
        payer,
        box,
        type: 'income',
        concepts: []
    })

    const handleFormSubmit = (values, resetForm) => {
        const amount = values.concepts.reduce((total, current) => total + current.amount, 0)
        const newPayment = { ...values, amount }

        if (paymentId) {
            dispatch(editPayment(paymentId, newPayment))
            // console.log(newPayment)
        } else {
            dispatch(createPayment(newPayment))
        }

        if (!resetFormAction) {
            setResetFormAction(resetForm)
        }
    }

    const handleCloseDialog = () => {
        console.log(paymentCreated)
        setOpenDialog(false)
        if (resetFormAction) {
            resetFormAction()
        }
    }

    const handleNewPayment = () => {
        dispatch(clean())
        navigate('/dash/user/get-user')
    }

    const confirmDeletePropToConcept = () => {
        // dispatch(deletePaymentConcept(conceptToDelete._id))
        // update concept in edit payment and set prop deleleted to true
        const newConcepts = paymentEdit.concepts.map(concept => {
            if (concept._id === conceptToDelete._id) {
                return { ...concept, deleted: true, amount: 0 }
            }
            return concept
        })
        // paymentEdit.concepts = newConcepts
        setInitialValues(currentValues => ({ ...currentValues, concepts: newConcepts }))
        // console.log(paymentEdit)
        cancelDeleteConceptDialog()
    }

    const showDeleteConceptDialog = (concept) => {
        setOpenDialogDeleteConcept(true)
        setconCeptToDelete(concept)
    }

    const cancelDeleteConceptDialog = () => {
        setOpenDialogDeleteConcept(false)
        setconCeptToDelete(null)
    }

    useEffect(() => {
        if (!conceptList.length) {
            dispatch(getConceptList())
        }

    }, [dispatch, conceptList])

    useEffect(() => {
        if (paymentCreated) {
            setOpenDialog(true)
        }

    }, [paymentCreated])

    useEffect(() => {
        if (!payer && !paymentId) {
            navigate('/dash/user/get-user')
        }

    }, [payer, navigate])

    useEffect(() => {
        if (paymentId) {
            dispatch(getPayment(paymentId))
        }
    }, [paymentId, dispatch])


    useEffect(() => {
        if (paymentEdit) {
            const newValues = { box: paymentEdit.box._id, payer: paymentEdit.payer._id, type: paymentEdit.type, concepts: paymentEdit.concepts }
            setInitialValues(currentValues => ({ ...currentValues, ...newValues }))
        }
    }, [paymentEdit])

    return (
        <RegisterPayment
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            checkoutSchema={checkoutSchema}
            conceptList={conceptList}
            months={MONTHS}
            years={YEARS()}
            boxes={boxes}
            beneficiarySelected={beneficiarySelected || paymentEdit?.payer}
            loading={loading}
            paymentCreated={paymentCreated}
            handleClose={handleCloseDialog}
            openDialog={openDialog}
            handleNewPayment={handleNewPayment}
            isEditing={!!paymentId}
            confirmDeletePropToConcept={confirmDeletePropToConcept}
            openDialogDeleteConcept={openDialogDeleteConcept}
            conceptToDelete={conceptToDelete}
            showDeleteConceptDialog={showDeleteConceptDialog}
            cancelDeleteConceptDialog={cancelDeleteConceptDialog}
        />
    )
}
