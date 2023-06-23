import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            email: '',
            password: '',
            fullname: '',
            username:'',
            phone:'',
            address:'',
        }

    }
    componentDidMount() {
        let user= this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: '1',
                fullname: user.fullname,
                username: user.username,
                phone: user.phone,
                address: user.address,
            })
        }
        console.log('didmout edit modal', this.props.currentUser)
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
        let arrInput = ['email','password','fullname','username','phone','address'];
        for (let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing paramater :' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid =  this.checkValidateInput();
        if(isValid === true){
            this.props.editUser(this.state);
        }
    }


    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
              //  centered
            >
            <ModalHeader toggle={()=>{this.toggle()}}>Edit new user</ModalHeader>
            <ModalBody>
                <div className='container'>
                    <div className='row'>  
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="email">Email</label>
                                <input type="email" 
                                onChange={(event)=>{this.handleOnChageInput(event , "email")}}
                                value={this.state.email}
                                disabled
                                className="form-control" 
                                id="email" name="email" 
                                placeholder="Email"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="password">Password</label>
                                <input type="password" 
                                onChange={(event)=>{this.handleOnChageInput(event , "password")}}
                                value={this.state.password}
                                disabled
                                className="form-control" 
                                id="password" 
                                name="password" 
                                placeholder="Password"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Fullname">Fullname</label>
                            <input type="text" 
                            onChange={(event)=>{this.handleOnChageInput(event , "fullname")}}
                            value={this.state.fullname}
                            className="form-control" 
                            id="Fullname" 
                            name="fullname" 
                            placeholder="fullname"/>
                        </div>
                        <div className="form-group">
                            <label for="Username">Username</label>
                            <input type="text" 
                            onChange={(event)=>{this.handleOnChageInput(event , "username")}}
                            value={this.state.username}
                            className="form-control" 
                            id="Username" 
                            name="username" 
                            placeholder="username"/>
                        </div>
                        <div className="form-group">
                            <label for="Phone">Phone</label>
                            <input type="number" 
                            onChange={(event)=>{this.handleOnChageInput(event , "phone")}}
                            value={this.state.phone}
                            className="form-control" 
                            id="Phone" name="phone" 
                            placeholder="Phone"/>
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
                        <div className="form-row">
                        <div className="form-group col-md-4">
                            <label for="Role">Role</label>
                            <select id="Role" name="roleId" className="form-control">
                            <option value="0">Top Admin</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="Gender">Gender</label>
                            <select id="Gender" name="gender" className="form-control">
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label for="Status">Status</label>
                            <select id="Status" name="status" className="form-control">
                            <option value="1">On</option>
                            <option value="0">Off</option>  
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button 
            color="primary" 
            className='px-3' 
            onClick={()=>{this.handleSaveUser()}}
            >Save changes</Button>{' '}
            <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
            </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



