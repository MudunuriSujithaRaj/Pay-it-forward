import React from "react";
import DonorNav from './Nav';
import swal from 'sweetalert';

const donor ={
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
}
const contentinline={
  marginLeft:'600px',
}
const products={
  width:'1000px',
  top:'50%',
  left:'50%',
}
var eid;

class DonorProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state={
       
        email : '',
        name : '',
        address : '',
        phone:'',
        
      }
      this.handleNameChange=this.handleNameChange.bind(this)
      this.handleEmailChange=this.handleEmailChange.bind(this)
      this.handleAddressChange=this.handleAddressChange.bind(this)
      this.handlePhoneChange=this.handlePhoneChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      eid=sessionStorage.getItem("id");
      console.log(eid);
      
    }
    userdetails(){
      const url = "http://localhost:9000/login1";
      
      let headers = new Headers();
           headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
      
            headers.append('Access-Control-Allow-origin',url);
            headers.append('Access-Control-Allow-Credentials','true');
    
            headers.append('POST','GET');
            var body={id:eid};
           var s = fetch(url, {
              headers:headers,
              method: 'POST',
              body: JSON.stringify(body)
            }).then(response=>{return response.json()}).then((res)=>{this.setState({
              name:res.name,address:res.address,phone:res.phone,email:res.email
            })
            console.log(this.state.name,this.state.email,this.state.phone,this.state.address)})
        
    
    }
    
   
  
    
    componentDidMount(){
      this.userdetails();
      
    }
    
      handleNameChange=event=>{
        this.setState({
          name : event.target.value
        });
      }
    
      handleEmailChange=event=>{
        this.setState({
          email: event.target.value
        });
      }
    
      handlePhoneChange=event=>{
        this.setState({
          phone: event.target.value
        });
      }
    
      handleAddressChange=event=>{
        this.setState({
          address: event.target.value
        });
      }

      handleSubmit(event) {
    
        event.preventDefault();
        console.log(this.state.name,this.state.email)
        
          var body = {
          id:eid,
          email : this.state.email,
          username : this.state.name,
          address : this.state.address,
          phone:this.state.phone
        
        }
        console.log(body);
        if(this.state.name==""){
          alert('Please enter the name')
    
        }
        
        else if(this.state.email==""){
          alert('Please enter the email')
        }
        else if(this.state.phone==""){
          alert('Please enter the phone')
        }
        else if(this.state.address==""){
          alert('Please enter the address')
        }
        else{
        
    
      const url = "http://localhost:9000/updateperson";
        let headers = new Headers();
     
        headers.append('Content-Type','application/json');
        headers.append('Accept','application/json');
     
        headers.append('Access-Control-Allow-origin',url);
        headers.append('Access-Control-Allow-Credentials','true');
     
        headers.append('POST','GET');
     
        fetch(url, {
           headers:headers,
           method: 'POST',
           body: JSON.stringify(body)
        }).then(response => {if(response.ok){
          swal({
            title: "Details",
            text: "Profile details updated Successfully!!!",
            icon: "success",
            button: "Ok",
          }).then(function(){
            window.location.reload(false);
          });
        }
        })
     
     }
    }
    
    
    
    

    render(){
        return(
            <div style={donor} class="profile">
          <DonorNav/>
          <div class="pcontainer">
          <form>
      <div className="base-container">
        <div className="header" style={contentinline}>Personal Details</div>
        <div className="content" style={contentinline}>
          <div className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" class="form-control" name="name" placeholder="name" value={ this.state.name } onChange = { this.handleNameChange } required/>
            </div>
            
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" value={ this.state.email } onChange = { this.handleEmailChange } required/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="number" name="phone" placeholder="phone" value={ this.state.phone } onChange = { this.handlePhoneChange } required/>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" placeholder="address" value={ this.state.address} onChange = { this.handleAddressChange } required/>
            </div>
          </div>
        </div>
        
          <button type="submit" onClick = {this.handleSubmit} className="btn" style={contentinline}>
            Update
          </button>
          <br/>
          
        
      </div>
      </form>
      <br/><br/>
      
            </div>
           
            </div>
           
       
          
            
        )
    }
}

export default DonorProfile