import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import {redirect} from "../state/history";
import Invoices from "./invoices";
import { getInvoices } from '../state/actions/actions'
import { getMyBiz } from '../state/actions/actions'
import { getBizzys } from '../state/actions/actions'
import {BizCard} from "./bizcard";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { NavBar } from './navbar'

class _UserDash extends Component {

    componentWillMount(){
        this.props.getInvoices(this.props.user.id)
        this.props.getBizzys()
        this.props.getMyBiz(this.props.user.id)
    }

    generateBigIconLinks = (link, icon, text) => {
        return <>
        <Grid item xs>
            <Paper onClick={() => { redirect(link) }} style={{ padding: 40, margin: 30, width: 300 }}>
                <Icon color="primary" style={{ fontSize: 60 }}>{icon}</Icon>
                <br /><br />
                <Typography color="textSecondary" variant="h5" align="center">
                    {text}
                </Typography>
            </Paper>
        </Grid>
        </>
    }

    fakeBizExample = () => {
        return {
            user_id: this.props.user.id,
            name: "Itty Biz Example", 
            service_type: "Service Type",
            hourly_rate: 25,
            description: "This is where you'll give a brief background on your Itty Bizzy. How long you've been doing it, any specifics about your skills, etc."
        }
    }

    generateMyBizSection = () => {
        if(this.props.my_biz){
            return <BizCard biz={this.props.my_biz} />
        }else{
            return <BizCard biz={this.fakeBizExample()} />
        }
    }

    bizInfo = () => {
        return <>
            <Icon color="primary" style={{ fontSize: 60 }}>edit</Icon><br /><br /><br /><br />
            <Typography paragraph color="textSecondary" variant="h5">
                The adjacent card shows how your Itty Bizzy is displayed in a search.<br /><br />
                If you would like to add, edit, or delete your Itty Bizzy, you can click on the card and you will be taken to your Itty Bizzy dash.
            </Typography>
        </>
    }

    render() {
       
        return (
            <div>
                <NavBar />
                <Paper style={{ padding: 40, margin: 30 }} align="center">
                    <Typography color="primary" variant="h4">
                    Welcome to Itty Bizzy, {this.props.user.name}!
                    </Typography>
                    <br />
                    <Typography variant="h6" color="textSecondary">
                        You can create or edit your Itty Bizzy, view your messages, check invoices, or search for an Itty Bizzy near you!
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={24} style={{ padding: 24 }} >
                        {this.generateBigIconLinks('/my-biz', "store", 'My Itty Biz')}
                        {this.generateBigIconLinks('/messages', "forum", 'My Messages')}
                        {this.generateBigIconLinks('/find-biz', 'search', 'Find Itty Bizzys')}
                    </Grid>
                </Paper>
                <Paper style={{ padding: 40, margin: 30 }} align="center">
                    <Typography color="primary" variant="h4">
                        Your Itty Bizzy
                    </Typography>
                    <Grid container direction="row" spacing={24} style={{ padding: 24 }} >
                        <div onClick={()=>redirect('/my-biz')} >{this.generateMyBizSection()}</div>
                        <Grid item xs>
                            <Card style={{ padding: 65, margin: 30, width: 650, height: 500 }} align="center">
                                <CardContent>
                                    {this.bizInfo()}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
                <Invoices currentUser={this.props.user} received_invoices={this.props.received_invoices} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.currentUser,
    received_invoices: state.received_invoices,
    my_biz: state.myBiz,
    bizzys: state.bizzys
})

export const UserDash = connect(mapStateToProps, { getInvoices, getMyBiz, getBizzys })(_UserDash);
