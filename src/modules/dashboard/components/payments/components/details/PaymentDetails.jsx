import PropTypes from 'prop-types'
import { Box, Card, CardContent, Typography, useMediaQuery } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { numberFormatMiles } from '../../../../../../utils/dateUtils'
import { Loading } from '../../../../../../components/Loading'

export const PaymentDetails = ({ paymentList, loading, error, isAdmin, goToEdit }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(auto-fit, minmax(250px, 1fr))'
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
                marginTop: 2,
                gridColumn: "span 5"
            }}
            padding={2}
        >

            {loading && <Loading />}

            {error && <Typography marginTop={2} color='error' > {error} </Typography>}

            {
                paymentList.map(({ _id, amount, type, payer, creation_date, concepts, months, amounts }) => (
                    <Card
                        key={_id}
                        sx={{
                            minWidth: '200px',
                            gridColumn: 'span 1'
                        }}
                    >

                        <CardContent>

                            <Box display='flex' justifyContent='space-between' >

                                {isAdmin && <EditOutlinedIcon sx={{ cursor: "pointer" }} onClick = { () => goToEdit(_id) } />}

                                <Typography color={type === 'income' ? 'success' : 'textDisabled'} gutterBottom sx={{ fontSize: 14, textAlign: 'end' }}>
                                    {type === 'income' ? 'Ingreso' : 'Gasto'}
                                </Typography>

                            </Box>

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="h5" component="div" sx={{ fontSize: 18 }} color={type === 'income' ? 'primary' : 'textDisabled'}  >
                                    {payer.toUpperCase()}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ fontSize: 18 }} color={type === 'income' ? 'primary' : 'textDisabled'} >
                                    {numberFormatMiles(amount)}
                                </Typography>

                            </Box>

                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                {new Date(creation_date).toISOString().split('T')[0]}
                            </Typography>

                            <Typography variant="body2">
                                {concepts} { [...new Set(months.split(', '))] }
                            </Typography>
                            {/* <Typography variant="body2"></Typography> */}

                            <Typography variant="body2">
                                {amounts.split(',').length >= 1 ? amounts : ''}
                            </Typography>

                        </CardContent>
                    </Card>
                ))
            }

        </Box>
    )
}

PaymentDetails.propTypes = {
    paymentList: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
    isAdmin: PropTypes.bool,
    goToEdit: PropTypes.func,
}