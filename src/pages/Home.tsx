import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import { Formik, Field, Form, FormikConfig, FormikValues } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import { object, mixed, number } from 'yup'

const delayTime = (time: any) => new Promise((acc) => setTimeout(acc, time));


function Home() {
    return (
        <div style={{
            padding: '10px',
            margin: 'auto'
        }}>
            <Card style={{
                width: '500px',

            }} >
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            millionaire: false,
                            money: 0,
                            description: ''

                        }}
                        onSubmit={async (values) => {
                            await delayTime(3000);
                            console.log(values)
                        }}
                    >
                        <FormikStep
                            label='Personal Data' >
                            <Box paddingBottom={2} >
                                <Field fullWidth name='firstname' component={TextField} label='First Name' />
                            </Box>
                            <Box paddingBottom={2} >
                                <Field fullWidth name='lastname' component={TextField} label='Last Name' />
                            </Box>
                            <Box paddingBottom={2} >
                                <Field name='millionaire' type='checkbox' component={CheckboxWithLabel} Label={{ label: 'I am a millionaire' }} />
                            </Box>
                        </FormikStep>
                        <FormikStep
                            label='Financials'
                            validationSchema={object({
                                money: mixed().when('millionaire', {
                                    is: true,
                                    then: number().required().min(1_000_000, 'Millionaire check in enabled so put money atleast 01 Million'),
                                    otherwise: number().required()
                                })
                            }

                            )}

                        >
                            <Box paddingBottom={2} >
                                <Field fullWidth name='money' type="number" component={TextField} label='All the money I have' />
                            </Box>
                        </FormikStep>
                        <FormikStep
                            label='More Info'
                        >
                            <Box paddingBottom={2} >
                                <Field fullWidth name='description' component={TextField} label='Description' />
                            </Box>
                        </FormikStep>

                    </FormikStepper>
                </CardContent>
            </Card>
        </div>
    );
}

export default Home;

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string
}

export function FormikStep({ children }: FormikStepProps) {
    return <>
        {children}
    </>
}



export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>
    const [completed, setCompleted] = useState(false)

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }


    return (
        <Formik {...props}
            validationSchema={currentChild.props.validationSchema}


            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers)
                    setCompleted(true)

                } else {
                    setStep(s => s + 1);

                }
            }}

        >
            {({ isSubmitting }) => (

                <Form autoComplete="off"  >
                    <Stepper alternativeLabel activeStep={step}>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed} >
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>



                    {currentChild}
                    <Grid container spacing={2} >
                        {
                            step > 0 ?
                                <Grid item >
                                    <Button
                                        disabled={isSubmitting}
                                        variant='contained'
                                        color='primary'
                                        onClick={(s) => setStep(s => s - 1)}
                                    >Back</Button>
                                </Grid>
                                : null}
                        {
                            <Grid item >
                                <Button
                                startIcon={isSubmitting ? <CircularProgress size="1rem" />: null}
                                    disabled={isSubmitting}
                                    variant='contained'
                                    color='primary'
                                    type="submit" > {
                                        isSubmitting ? 'Submitting' :
                                            isLastStep() ? 'Submit' : 'Next'}  </Button>
                            </Grid>
                        }
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

