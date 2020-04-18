import React, { Component } from 'react';
import { Grid, Form, Segment, Header, Button, Icon} from 'semantic-ui-react';
// import ipfs from '../../ipfs';
import Layout from '../../components/Layout';

class PatientRecord extends Component{
    state ={
        publicKey : '',
        ipfsHash : ''
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        ///Get IPFS hash
    }

    render(){
        return(
            <Layout>
                <div style={{marginTop:"20px"}}>
                <Grid centered columns={2} style={{marginTop:'20px'}}>
                        <Grid.Column width={7}>
                            <Segment>
                                <Header as="h3" color="grey" style={{textAlign:"center"}}>
                                    Get Patient's EMR 
                                </Header>
                            </Segment>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Input 
                                    value={this.state.publicKey} 
                                    onChange={this.onChange} 
                                    name="publicKey"  
                                    label='Public Key' 
                                    placeholder='Public Key' 
                                    required
                                />
                                <Segment basic textAlign={"center"}>
                                    <Button positive style={{textAlign:"center"}} type='submit'>Get EMR</Button>
                                </Segment>
                            </Form>
                            <Segment basic textAlign={"center"}>
                                {   this.state.ipfsHash ? 
                                    <Button 
                                        primary 
                                        style={{textAlign:"center"}} 
                                        href= {`https://ipfs.io/ipfs/${this.state.ipfsHash}`}
                                        target="_blank"
                                    >
                                       <Icon name="download"/> Download EMR
                                    </Button>
                                    : null 
                                }
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
            </Layout>
        )
    }
}

export default PatientRecord; 