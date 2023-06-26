import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            firstName: '',
            lastName:'',
            address:'',
        }

        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName:'',
                address:'',
            })
        })
    }

    componentDidMount() {
        console.log('mouting')
    }

    toggle = () =>{
       this.props.toggleFomatPerent();
    }

    handleOnChageInput = (event,id)=>{
        let copyState={...this.state};
        copyState[id]=event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for (let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing paramater :' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid =  this.checkValidateInput();
        if(isValid === true){
            this.props.createNewuser(this.state);
        }
    }


    render() {
        return (
        //    <Form>
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={()=>{this.toggle()}} 
                    className={'modal-user-container'}
                    size='lg'
                //  centered
                >
                <ModalHeader toggle={()=>{this.toggle()}}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>  
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="email">Email</label>
                                    <input type="email" 
                                    onChange={(event)=>{this.handleOnChageInput(event , "email")}}
                                    value={this.state.email}
                                    className="form-control" 
                                    id="email" name="email" 
                                    placeholder="Email"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="password">Password</label>
                                    <input type="password" 
                                    onChange={(event)=>{this.handleOnChageInput(event , "password")}}
                                    value={this.state.password}
                                    className="form-control" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Password"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="FirstName">FirstName</label>
                                <input type="text" 
                                onChange={(event)=>{this.handleOnChageInput(event , "firstName")}}
                                value={this.state.firstName}
                                className="form-control" 
                                id="FirstName" 
                                name="firstName" 
                                placeholder="FirstName"/>
                            </div>
                            <div className="form-group">
                                <label for="LastName">LastName</label>
                                <input type="text" 
                                onChange={(event)=>{this.handleOnChageInput(event , "lastName")}}
                                value={this.state.lastName}
                                className="form-control" 
                                id="LastName" 
                                name="lastName" 
                                placeholder="LastName"/>
                            </div>
                            <div className="form-group">
                            <label for="Address">Address</label>
                            <input type="text" 
                            onChange={(event)=>{this.handleOnChageInput(event , "address")}}
                            value={this.state.address}
                            className="form-control" 
                            id="Address" 
                            name="address" 
                            placeholder="address"/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button 
                color="primary" 
                className='px-3' 
                onClick={()=>{this.handleAddNewUser()}}
                >Add new</Button>{' '}
                <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
                </ModalFooter>
                </Modal>
          //  </Form>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



