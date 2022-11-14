import React, {Component} from 'react';
import { Card, Header, Divider, Image, Dimmer, Loader} from 'semantic-ui-react';
import axios from 'axios';
import OrganChain from '../../ethereum/organchain';
import ipfs from '../../ipfs';

class DonorProfile extends Component{
   

    state = {
        donor : '',
        recipient : '',
        hospital : '',
        matchFound : false,
        loading : true,
        
    }

    componentDidMount = async () => {
        try{  
console.log(this.props)

            axios.get(`/api/donors`)
            .then(async (res)=>{
               console.log(res)

               const n = res.data.length;
             console.log(n)
             var i=0;
             for(i=0;i<n;i++){
                if(res.data[i].email==this.props.match.params.email){
                    var data = JSON.stringify({
                        fname:res.data[i].fname,
                        lname :res.data[i].lname,
                        gender:res.data[i].gender,
                        city: res.data[i].city,
                        contact: res.data[i].phone,
                        email: res.data[i].email,
                        donorId: res.data[i].donorId,
                        organ: res.data[i].organ,
                        bloodgroup: res.data[i].bloodgroup,
                    });
                }
                
             }
               
            console.log(data)
            var data = JSON.parse(data);
            this.setState({donor : data});
                
            

            const donor = await OrganChain.methods.getDonor(this.props.match.params.donorId).call();
            console.log(donor[4])
            if(donor[4] !== "0x0000000000000000000000000000000000000000"){
                this.setState({matchFound : true});
                
                const recipient = await OrganChain.methods.getRecipient(donor[4]).call();
                console.log(recipient)
                axios.get(`/api/recipient`)
                .then((res)=>{
                    console.log(res.data[0])
                var data = JSON.stringify({
                    fname: res.data[0].fname,
                    lname: res.data[0].lname,
                    gender:res.data[0].gender,
                    city: res.data[0].city,
                    contact: res.data[0].phone,
                    email: res.data[0].email,
                    recipient: donor[4],
                    organ: recipient[2],
                    bloodgroup: recipient[3]
                    });
                data = JSON.parse(data);
                this.setState({recipient : data});
                })
                axios.get(`/api/hospitals/profile/${recipient[0]}`)
                    .then(res => {
                        this.setState({hospital : res.data});
                    })
                    .catch(err=> console.log("Error => "+ err));
            }
        })

            }
        
        catch(err){
            console.log("Error =>"+ err);
        }
        this.setState({loading : false})
    }

    render(){
        const {donor, recipient, hospital, matchFound } = this.state;
        
        return(
            <div>
                
            {
                this.state.loading ?
                <Dimmer active={this.state.loading} inverted >
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                :
                
                <Card.Group centered style={{marginTop:"20px", overflowWrap:'break-word'}}>
                    <Card style={{width:"350px"}}>
                        <Card.Content>
                            <Card.Header style={{textAlign:"center"}}><h1>{donor.fname} {donor.lname}</h1></Card.Header>
                            <Card.Meta style={{textAlign:"center"}}>{donor.donorId}</Card.Meta>
                            <Divider/>
                            <Card.Description style={{fontSize:"16px",marginLeft: "30px"}}>
                                <strong>Gender : </strong> {donor.gender} <br/><br/>
                                <strong>Organ : </strong> {donor.organ} <br/><br/>
                                <strong>Blood Group : </strong> {donor.bloodgroup} <br/><br/>
                                <strong>City : </strong> {donor.city} <br/><br/>
                                <strong>Email : </strong> {donor.email} <br/><br/>
                                <strong>Contact : </strong> {donor.contact} <br/>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra style={{textAlign:"center"}}>
                            <Header as="h3" color="grey" >
                                Donor
                            </Header>
                        </Card.Content>
                    </Card>
                    {
                        !matchFound ? 
                        <Card style={{width:"350px"}}>
                            <Card.Content>
                                <Header as="h3" color="grey">
                                    No Match Found Yet
                                </Header>
                            </Card.Content>
                        </Card>
                        :
                        <Card style={{width:"350px"}}>
                            <Image src={`../../images/${hospital.img}`} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header style={{textAlign:"center"}}>{hospital.username} </Card.Header>
                                <Card.Meta style={{textAlign:"center"}}>{hospital.hospitalpublickey}</Card.Meta>
                                <Divider/>
                                <Card.Description style={{fontSize:"16px",marginLeft: "30px"}}>
                                    <strong>Address : </strong> {hospital.address} <br/><br/>
                                    <strong>City : </strong> {hospital.city} <br/><br/>
                                    <strong>Contact : </strong> {hospital.contact} <br/><br/>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra style={{textAlign:"center"}}>
                                <Header as="h3" color="grey" >
                                    Hospital
                                </Header>
                            </Card.Content>
                        </Card>
                    }
                    {
                        !matchFound ? 
                        <Card style={{width:"350px"}}>
                            <Card.Content >
                                <Header as="h3" color="grey"> No Match Found Yet</Header>
                            </Card.Content>
                        </Card>
                        :
                        <Card style={{width:"350px"}}>
                            <Card.Content>
                                <Card.Header style={{textAlign:"center"}}><h3>{recipient.fname} {recipient.lname}</h3></Card.Header>
                                <Card.Meta style={{textAlign:"center"}}>{recipient.recipientId}</Card.Meta>
                                <Divider/>
                                <Card.Description style={{fontSize:"16px",marginLeft: "30px"}}>
                                    <strong>Gender : </strong> {recipient.gender} <br/><br/>
                                    <strong>Organ : </strong> {recipient.organ} <br/><br/>
                                    <strong>Blood Group : </strong> {recipient.bloodgroup} <br/><br/>
                                    <strong>City : </strong> {recipient.city} <br/><br/>
                                    <strong>Email : </strong> {recipient.email} <br/><br/>
                                    <strong>Contact : </strong> {recipient.contact} <br/>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra style={{textAlign:"center"}}>
                                <Header as="h3" color="grey" >
                                    Recipient
                                </Header>
                            </Card.Content>
                        </Card>
                    }
                </Card.Group>
                
            }
        
            </div>
        )
    }
}

export default DonorProfile; 