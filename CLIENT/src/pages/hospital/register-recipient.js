import React,{ Component} from 'react';
import Layout from '../../components/Layout';
import { Form , Button, Grid, Segment, Header} from 'semantic-ui-react';
import ipfs from '../../ipfs';
// import OrganChain from '../../ethereum/organchain';

class RegisterRecipient extends Component {
    state = {
        fname : '',
        lname : '',
        gender : 'Male',
        city : 'Gwalior',
        phone : '',
        email : '',
        bloodgroup : 'A+',
        organ : 'Eyes',
        buffer : null,
        ipfsHash : '',
        publicKey : '',
    }

    componentDidMount() {
        if (window.localStorage.getItem("Authenticated") === "true") {
          console.log("Beta pahile login karo")
        }
      }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const { fname, lname, gender, city, phone, email, bloodgroup, organ, buffer, ipfsHash, publicKey } = this.state;

        await ipfs.add(buffer, (err, result)=>{
            if(err) console.log(err);
            else {
                const ipfsHash = result[0].hash;
                this.setState({ ipfsHash });
            }
        });
        console.log({ fname, lname, gender, city, phone, email, bloodgroup, organ, ipfsHash, publicKey });
        
    }

    captureFile = event => {
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = ()=>{
            this.setState({buffer : Buffer(reader.result)});
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }

    render(){
        return(
            <Layout>
                <div>
                    <Grid centered columns={2} style={{marginTop:'20px'}}>
                        <Grid.Column width={11}>
                            <Segment>
                            <Header as="h3" color="grey" style={{textAlign:"center"}}>
                                Register New Recipient
                            </Header>
                            </Segment>
                            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                                    <Form.Group widths={2}>
                                        <Form.Input 
                                            value={this.state.fname} 
                                            onChange={this.onChange} 
                                            name="fname"  
                                            label='First name' 
                                            placeholder='First name' 
                                            required
                                        />
                                        <Form.Input 
                                            value={this.state.lname}   
                                            onChange={this.onChange} 
                                            name="lname" 
                                            label='Last name' 
                                            placeholder='Last name' 
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group widths={2}>
                                        <Form.Field 
                                            value={this.state.gender}
                                            onChange={this.onChange} 
                                            name="gender"
                                            label='Gender' 
                                            control='select'
                                            required
                                            >
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                            <option value='Other'>Other</option>
                                        </Form.Field>
                                        <Form.Field 
                                            value={this.state.city}
                                            onChange={this.onChange} 
                                            name="city"
                                            label='City' 
                                            control='select'
                                            required
                                            >
                                            <option value='Gwalior'>Gwalior</option>
                                            <option value='New Delhi'>New Delhi</option>
                                            <option value='Pune'>Pune</option>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths={2}>
                                        <Form.Input 
                                            value={this.state.phone} 
                                            onChange={this.onChange} 
                                            name="phone"   
                                            label='Phone' 
                                            placeholder='Phone' 
                                            required
                                        />
                                        <Form.Input 
                                            value={this.state.email} 
                                            onChange={this.onChange} 
                                            name="email"   
                                            type="email"
                                            label='Email' 
                                            placeholder='Email' 
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group widths={2}>
                                        <Form.Field 
                                            value={this.state.bloodgroup}
                                            onChange={this.onChange} 
                                            name="bloodgroup"
                                            label='Blood Group' 
                                            control='select'
                                            required>
                                            <option value='A+'>A+</option>
                                            <option value='A-'>A-</option>
                                            <option value='B+'>B+</option>
                                            <option value='B-'>B-</option>
                                            <option value='AB+'>AB+</option>
                                            <option value='AB-'>AB-</option>
                                            <option value='O+'>O+</option>
                                            <option value='O-'>O-</option>
                                        </Form.Field>
                                        <Form.Field 
                                            value={this.state.organ}
                                            onChange={this.onChange} 
                                            name="organ"
                                            label='Organ' 
                                            control='select'
                                            required>
                                            <option value='Eyes'>Eyes</option>
                                            <option value='Kidney'>Kidney</option>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths={2}>
                                        <Form.Input 
                                            value={this.state.publicKey} 
                                            onChange={this.onChange} 
                                            name="publicKey"  
                                            label="Recipient's Public Key" 
                                            placeholder="Recipient's Public Key"
                                            required
                                        />
                                        <Form.Input
                                            onChange={this.captureFile}
                                            name="EMR"
                                            label="EMR"
                                            type="file"
                                            required
                                        />
                                    </Form.Group>
                                    <Segment basic textAlign={"center"}>
                                        <Button positive style={{textAlign:"center"}} type='submit'>Submit</Button>
                                    </Segment>
                                </Form>
                        </Grid.Column>
                    </Grid>
                </div>
            </Layout>
        );
    }
}

export default RegisterRecipient;