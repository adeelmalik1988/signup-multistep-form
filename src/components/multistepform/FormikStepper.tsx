import React, { useState } from 'react';
import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import { Formik, Form, FormikConfig, FormikValues } from 'formik'
//import Swal from 'sweetalert2'



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
    // const formSubmissionNotification = () => {
        
    //     Swal.fire(
    //         {
    //             titleText: 'Forum Submission Completed Successfully',
    //         }
    //     )

    // }


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
