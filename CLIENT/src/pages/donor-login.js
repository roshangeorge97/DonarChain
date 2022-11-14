import Axios from 'axios';
import React, { Component } from 'react';
import {Grid, Segment, Header, Form, Button, Divider, Message} from 'semantic-ui-react';
import OrganChain from '../ethereum/organchain';
import DonorProfile from './donor/profile';

class DonorLogin extends Component{
    state ={
        publicKey : '',
        loading : false,
        errMsg : '',
        email: ''
    }

    onSubmit = async event =>{
        event.preventDefault();

        this.setState( { loading :true , errMsg :'' } );

        const {publicKey,email} = this.state;

        try{
            console.log(email)
            window.location = `/donor/profile/${publicKey}/${email}`;
            
            console.log('profile')
        }
        catch(err){
            this.setState({ errMsg : "You are not approved yet OR you are not registred!" })
            console.log(publicKey)
        }
        this.setState( { loading : false} );
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ [event.target.name]: event.target.value });
    }

 

    render(){
        return (
            <Grid centered columns={2} style={{marginTop:'20px'}}>
                <Grid.Column width={6}>
                    <Segment>
                      
                        <Header as="h3" color="grey" style={{textAlign:"center"}}>
                            Donor Log In
                        </Header>
                        <Divider/>
                       
                        <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                            <Form.Input 
                                value={this.state.publicKey} 
                                onChange={this.onChange} 
                                name="publicKey"  
                                label='Public Key' 
                                placeholder='Public Key' 
                                required
                            />
                              <Form.Input 
                                value={this.state.email} 
                                onChange={this.onChange} 
                                name="email"  
                                label='Email' 
                                placeholder='Public Key' 
                                required
                            />
                            
                            <Message error header="Oops!" content={this.state.errMsg} />
                            <Segment basic textAlign={"center"}>
                                <Button loading={this.state.loading} positive type='submit'>Log In</Button>
                            </Segment>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default DonorLogin;