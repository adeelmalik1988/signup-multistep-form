import { Button,Typography, Card } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'





function Home() {
    return (
        <div style={{
            padding: '10px',
            margin: 'auto'
        }}>
            <Card>
            <Typography variant='h4' >
                Welcome
            </Typography>
            </Card>

        </div>
    );
}

export default Home;

