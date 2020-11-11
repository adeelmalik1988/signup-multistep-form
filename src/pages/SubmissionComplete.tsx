import { Card, Typography } from '@material-ui/core';
import React from 'react';


function SubmissionComplete() {
    return (
        <div style={{
            padding: '10px',
            margin: 'auto'
        }}>
            
            <Card>
                <Typography 
                variant='h4'
                >Thanks for your Support</Typography>
                <Typography 
                variant='body1'
                >
                    These paragraph-based typing tests contain longer text passages on a variety of subjects. Choose a topic below. We have a large variety of typing practice with texts from a number of areas of interest to stimulate your mind while exercising your fingers. If you are preparing for a specific career field like medicine or technology then you may also find those subjects useful in learning vocabulary and gaining muscle memory for the jargon particular to the kind of job you have, or hope to get. This will give you a chance to practice the type of typing that you are most likely to encounter in your daily life.
                </Typography>
                <Typography
                variant='body1'
                >
                To get the best scores on these practice typing tests, try to relax and focus on your accuracy. All of our drills require 100% accuracy before they give you a score. You can correct your mistakes as you go by using the backspace key, or wait until the end and use the spell checker features.


                </Typography>
                <Typography
                variant='body1'
                >
                Most pre-employment typing test are given in this format and last for approximately 5 minutes. If you are anxious about an upcoming typing test, try to practice typing for at least 10 minutes a day to build up your stamina so that you can easily maintain your maximum speed and accuracy for the entire test. Typing is a physical skill, and the only way to improve is to practice regularly.
                </Typography>



            </Card>
        </div>
    );
}

export default SubmissionComplete;

