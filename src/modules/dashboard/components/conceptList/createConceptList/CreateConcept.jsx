import PropTypes from 'prop-types'
import { Box, Button, Card, CardContent, TextField, Typography, useMediaQuery } from "@mui/material"
import { Form, Formik } from "formik"
import { Loading } from '../../../../../components/Loading'

export const CreateConcept = ({ handleFormSubmit, initialValues, checkoutSchema, loading, error, message, onFocus, isAdmin }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)")

    return (
        <Box sx={{ padding: 3 }} >
            <Card >
                <Typography variant='h3' margin={3} > Crear concepto  de pago </Typography>
                <CardContent>

                    <Formik
                        onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                    }}
                                >
                                    <TextField
                                        variant="filled"
                                        type="text"
                                        label="Nombre"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{ gridColumn: "span 3" }}
                                        onFocus={onFocus}
                                    />

                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="descripción"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.description}
                                        name="description"
                                        error={!!touched.description && !!errors.description}
                                        helperText={touched.description && errors.description}
                                        sx={{ gridColumn: "span 3" }}
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="number"
                                        label="Prioridad"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.priority}
                                        name="priority"
                                        error={!!touched.priority && !!errors.priority}
                                        helperText={touched.priority && errors.priority}
                                        sx={{ gridColumn: "span 3" }}
                                        title='Se usa para saber la prioridad en los calculos, 1 es alta.'
                                    />

                                </Box>

                                <Box display="flex" justifyContent="center" mt="20px">
                                    <Button disabled={ !isAdmin } type="submit" color="info" variant="contained">
                                        {loading ? <Loading /> : 'Crear concepto'}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>

                    {
                        error &&
                        <Typography color='error' variant='h4'> {error} </Typography>
                    }
                    
                    {
                        message &&
                        <Typography color='success' variant='h3'> {message} </Typography>
                    }

                </CardContent>
            </Card>
        </Box >
    )
}

CreateConcept.propTypes = {
    handleFormSubmit: PropTypes.func,
    onFocus: PropTypes.func,
    initialValues: PropTypes.object,
    checkoutSchema: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    isAdmin: PropTypes.bool,
}