import React, {Component} from "react";
import {Form, Button, Container, Card, Row, Col, Table,Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {
    requestGetCovidDetails
} from "../Actions/testActions";
const d = new Date();


class View extends Component{

    constructor(props){
        super(props),
        this.state={
            pincode:"",
            error:"",
            color:["primary","secondary","warning","danger","dark"],
            saveClicked:false,
            failedPopup:false,
            closePop:false
        };
    }

static getDerivedStateFromProps(props,state) {
    if(props.data.length===0 && props.failed===true&& state.closePop===false){
        return state.failedPopup=true;
    }
    else{
        return null;
    }
}
 changeHandler = (e) =>{
     parseInt(e.target.value)===NaN || e.target.value.length!==6 ? this.setState({error:"Invalid Pincode"}): this.setState({error:"",pincode:e.target.value})

     e.target.value===""?this.setState({error:"",pincode:""}):"";
 }   

 getClicked = () =>{
     if(this.state.pincode===""){
         this.setState({error:"Pincode is required."})
     }
     else if(this.state.pincode!=="" && this.state.error==="")
     {
         this.props.getDetails(this.state);
         this.setState({saveClicked:true,closePop:false,failedPopup:false});
     }
 }
 closeModal = () =>{

     this.setState({failedPopup:false,closePop:true});
   
 }
    render(){
 
        return(
            
            <div >
                <Container style={{height:"100%"}}>
           
                    <Card className="mt-2 card border-primary">
                        <Card.Header>
                            <h3 style={{textAlign:"center"}}>Covid Vaccination Details</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col lg={6}>
                                <Form>
                            <Form.Group controlId="formBasicPin">
                                <Form.Label>Enter Pincode of your area</Form.Label>
                                <Form.Control type="text" placeholder="Enter Pincode" onChange={this.changeHandler} />
                                <span style={{color:"red"}}>{this.state.error}</span>
                            </Form.Group>
                            <div className="text-center">
                            <Button variant="success"  type="button" onClick={this.getClicked}>
                                Get Details
                            </Button>
                            </div>
                            
                            </Form>
                                </Col>
                            </Row>
                      
                        </Card.Body>
                    </Card>
                
                
                {this.props.data.length>0?
                 (this.props.data.map((item,count)=>{
                 return(
                     <Card key={d.getMilliseconds()+item.center_id} className="mt-2 mb-5  card bg-light text-white" style={{textAlign:"center"}}>
                         <Card.Header>
                        <Row>
                            <Col xs={6} md={4}>
                                <p style={{color:"red"}}>State</p>
                                <p style={{color:"blue"}}>{item.state_name}</p>
                            </Col>
                            <Col xs={6}  md={4}>
                            <p style={{color:"red"}}>Block Name</p>
                            <p style={{color:"blue"}}>{item.block_name}</p>
                            </Col>
                            <Col xs={6} md={4}>
                            <p style={{color:"red"}}>District</p>
                            <p style={{color:"blue"}}>{item.district_name}</p>
                            </Col>
                        </Row>
                         </Card.Header>
                         <Card.Body>
                         <Table striped bordered hover responsive="sm" key={d.getMilliseconds()+count}>
                         <thead>
                             <tr>
                             <th>Address</th>
                             <th>Fee Type</th>
                             <th>Maximum availablity time</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr key={count}>
                                 <td>{item.address}</td>
                                 <td>{item.fee_type}</td>
                                 <td>{item.to}</td>
                                 </tr>
                            
                            
                            
                         </tbody>
                     </Table>
                     <hr/>
                    {item.sessions.map((nestedItem,index)=>{
                       return(
                           <div className="mt-2 mb-2">
                        <Table striped bordered hover responsive="sm" key={d.getMilliseconds()+index}>
                        <thead>
                            <tr>
                            <th>Available Capacity</th>
                            <th>Date</th>
                            <th>Minimum Age Limit </th>
                            <th>vaccine </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  key={nestedItem.session_id}>
                                <td>{nestedItem.available_capacity}</td>
                                <td>{nestedItem.date}</td>
                                <td>{nestedItem.min_age_limit}</td>
                                <td>{nestedItem.vaccine}</td>
                                </tr>                   
                           
                        </tbody>
                    </Table> 
                    <Table striped bordered hover responsive="sm" key={index}>
                    {nestedItem.slots.length>0 ?<tr><th colSpan="4">Slots</th></tr>:""}
                    {nestedItem.slots.length>0?
                    nestedItem.slots.map((timing,index)=>{
                    return(
                        <td key={d.getMilliseconds()+ index}>
                       
                         <Button className="mt-2" variant={this.state.color[index]}>{timing}</Button>
                        
                         </td>
                   
                    );    
                    })
                    :("") }
                   
                    </Table>
                    </div>
                    );          
                    })}
                         </Card.Body>
                     </Card>
                    
                    
                 ) ; 
                 })):(this.state.failedPopup?(
                    <Modal
                    show={this.state.failedPopup} onHide={this.closeModal} animation={true}  centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Details</Modal.Title>
                    </Modal.Header>
                  
                    <Modal.Body>
                      <p>No Result Found.</p>
                    </Modal.Body>
                  
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.closeModal}>Ok</Button>
                 
                    </Modal.Footer>
                  </Modal>
                 ):"")
                }
              
                </Container>
            </div>
        );
    }
};


const mapStateToProps = (state) => ({
    data: state.data,
    failed:state.failed
});
const mapDispatchToProps = (dispatch)=>({
  getDetails : (state)=>{
   dispatch(requestGetCovidDetails(state))
  }
});
export default connect(mapStateToProps,mapDispatchToProps)(View);