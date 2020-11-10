import { Card, Typography } from '@material-ui/core';
import React from 'react';


function SubmissionComplete() {
    return (
        <div style={{
            padding: '10px',
            margin: 'auto'
        }}>
            
            <Card>
                <Typography>Form Submitted Successfully</Typography>
            </Card>
        </div>
    );
}

export default SubmissionComplete;

