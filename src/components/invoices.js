import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

class Invoices extends Component {

    render() {

        return (
            <div>
                <CssBaseline />
                <Paper>
                    <Typography>These are your invoices</Typography>
                </Paper>
            </div>
        );
    }
}


export default Invoices;