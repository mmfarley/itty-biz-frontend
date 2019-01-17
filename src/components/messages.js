import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { MessageCard } from './messagecard'
import { connect } from 'react-redux'
import { getConversations } from '../state/actions/actions'

class _Messages extends Component {

    componentWillMount() {
        console.log("component mounted")
        this.props.getConversations(this.props.user.id)
        
    }

    generateMessageCards = () => {
        if (this.props.conversations){
        return this.props.conversations.map((conversation) => (
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <h1>a conversation</h1>
                <MessageCard conversation={conversation} />
            </Grid>
        ))}
    }

    render() {
        return (
            <div>
                <Paper style={{ padding: 40, margin: 30 }} align="center">
                    <Typography variant="h5">These are your messages</Typography>
                    <Grid container spacing={24} style={{ padding: 24 }}>
                        {this.generateMessageCards()}
                    </Grid>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    conversations: state.conversations,
    user: state.currentUser
})

export const Messages = connect(mapStateToProps, { getConversations })(_Messages);