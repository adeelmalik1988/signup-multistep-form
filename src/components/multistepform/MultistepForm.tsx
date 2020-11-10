import React from 'react';
import { Box, Card, CardContent,  InputLabel, MenuItem } from '@material-ui/core'
import { Field } from 'formik'
import { CheckboxWithLabel, TextField, Select } from 'formik-material-ui'
import { object, mixed, number, string } from 'yup'
import { FormikStepper, FormikStep } from './FormikStepper'

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const delayTime = (time: any) => new Promise((acc) => setTimeout(acc, time));

function MultistepForm() {
    const navigate = useNavigate();
    return (
        <div style={{
            padding: '10px',
            margin: 'auto',
            display: 'flex',
            justifyItems: 'center'
        }}>
            <Card style={{
                width: '500px',

            }} >
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            email: '',
                            millionaire: false,
                            selectBank: '',
                            money: 0,
                            description: ''

                        }}
                        onSubmit={
                            
                            async (values) => {
                            await delayTime(3000);
                            console.log(values)

                            Swal.fire(
                                'Completed',
                                'Your form has been submitted.',
                                'success'
                            )
                           
                            navigate('/submitted')
                        }}
                    >
                        <FormikStep
                            label='Personal Data'
                            validationSchema={object({
                                email: string().email('Please provide a valid email address (abc@xy.z)')
                            })}
                        >
                            <Box paddingBottom={2} >
                                <Field fullWidth name='firstname' component={TextField} label='First Name' />
                            </Box>
                            <Box paddingBottom={2} >
                                <Field fullWidth name='lastname' component={TextField} label='Last Name' />
                            </Box>
                            <Box paddingBottom={2} >
                                <Field fullWidth name='email' component={TextField} label='Email' />
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

                            <Box paddingBottom={2} >
                            <InputLabel id="bank">Please Select Bank</InputLabel>
                                <Field
                                fullWidth
                                    component={Select}
                                    name="selectBank"
                                    inputProps={{
                                        id: 'bank',
                                      }}
                                    label='Please select your bank'
                                    
                                > <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                                    <MenuItem value={'SCB'}>SCB</MenuItem>
                                    <MenuItem value={'Habib Bank'}>Habib Bank</MenuItem>
                                    <MenuItem value={'Meezan Bank'}>Meezan Bank</MenuItem>
                                
                                </Field>




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

export default MultistepForm;


