import PropTypes from 'prop-types'
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Typography, useMediaQuery } from "@mui/material"
import { red } from '@mui/material/colors'
import { SearchField } from "../../../../../../components/SearchField"
import { Loading } from '../../../../../../components/Loading'
import { getLocalDate, numberFormatMiles } from '../../../../../../utils/dateUtils'
export const GetUser = ({ onSearch, beneficiaries, identification, loading, error, gotToAddNew, selectBeneficiary, isAdmin }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box
            display='grid'
            gridTemplateColumns='repeat( 3, minmax(0, 1fr))'
            gap='30px'
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                padding: 2
            }}
        >
            <Typography variant="h3">Buscar usuario</Typography>

            <SearchField sx={{ gridColumn: 'span 3' }} onSearch={onSearch} />

            {loading && <Loading />}

            {error && <Typography color='error' >{error}</Typography>}

            {
                beneficiaries.length > 0 &&
                <>
                    <Divider sx={{ gridColumn: "span 3" }} >Beneficiario encontrado</Divider>

                    {beneficiaries.map((beneficiary, index) => (
                        <Card
                            onClick={() => isAdmin ? selectBeneficiary(beneficiary) : ''}
                            key={index}
                            sx={{
                                maxWidth: 345,
                                cursor: 'pointer'
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="recipe"
                                        sx={{ bgcolor: red[500] }}
                                    >
                                        {beneficiary.name[0]}
                                    </Avatar>
                                }
                                title={`${beneficiary.name} ${beneficiary.lastname ?? ''}`}
                                subheader={beneficiary.identification}
                                action={
                                    <Typography color={beneficiary.payments?.type === 'income' ? 'success' : 'textDisabled'} gutterBottom sx={{ fontSize: 14, textAlign: 'end' }}>
                                        {beneficiary.payments?.type === 'income' ? 'Ingreso' : 'Gasto'}
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography color='success' >
                                    {beneficiary.temple}
                                </Typography>
                                <Typography color='info'>
                                    Celular: {beneficiary.cellphone}
                                </Typography>
                                <Typography color='primary'>
                                    Ultimo pago: {beneficiary.payments?.creation_date ? getLocalDate(beneficiary.payments?.creation_date) : 'No registra'}
                                </Typography>

                                <>
                                    <Typography color='primary' component={'span'} >
                                        Registrado en {beneficiary.box?.name || 'No registra'}
                                    </Typography>

                                    <Typography color={beneficiary.payments?.type === 'income' ? 'success' : 'error'} component={'span'} marginLeft={1} >
                                        {numberFormatMiles(beneficiary.payments?.amount)}
                                    </Typography>
                                </>
                                <ul>
                                    {beneficiary.concepts.map(({ details, month }, index) =>
                                        <li key={index} >
                                            {details.name} {month}
                                            <Typography color={beneficiary.payments?.type === 'expense' ? 'error' : ''} component={'span'} marginLeft={1} >
                                                {beneficiary.payments?.type === 'expense' ? 'Gasto' : ''}
                                            </Typography>
                                        </li>
                                    )}
                                </ul>

                            </CardContent>
                        </Card>
                    ))}
                </>

            }

            {!loading && !error && !beneficiaries.length && identification &&
                <Box gridColumn='span 3' >
                    <Typography variant='h4' color='info' >
                        No se ha encontrado un usuario relacionado con la identificación {identification}
                    </Typography>

                    <Typography variant='h5' marginTop={5} marginBottom={2} color='textSecondary' >¿Agregar nuevo beneficiario?</Typography>
                    <Button variant='outlined' onClick={gotToAddNew} >Agregar</Button>
                </Box>
            }
        </Box>
    )
}

GetUser.propTypes = {
    onSearch: PropTypes.func,
    gotToAddNew: PropTypes.func,
    selectBeneficiary: PropTypes.func,
    beneficiaries: PropTypes.array,
    identification: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
    isAdmin: PropTypes.bool,
}