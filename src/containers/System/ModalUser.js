import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state ={

        }
    }

    componentDidMount() {
    }

    toggle = () =>{
       this.props.toggleFomatPerent();
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
            <ModalHeader toggle={()=>{this.toggle()}}>Create new user</ModalHeader>
            <ModalBody>
                <div className='container'>
                    <div className='row'>
                    <form action="#" method="post">  
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Password"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Fullname">Fullname</label>
                            <input type="text" class="form-control" id="Fullname" name="fullname" placeholder="fullname"/>
                        </div>
                        <div class="form-group">
                            <label for="Username">Username</label>
                            <input type="text" class="form-control" id="Username" name="username" placeholder="username"/>
                        </div>
                        <div class="form-group">
                            <label for="Phone">Phone</label>
                            <input type="number" class="form-control" id="Phone" name="phone" placeholder="Phone"/>
                        </div>
                        <div class="form-group">
                        <label for="Address">Address</label>
                        <input type="text" class="form-control" id="Address" name="address" placeholder="address"/>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="Role">Role</label>
                            <select id="Role" name="roleId" class="form-control">
                            <option value="0">Top Admin</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                            </select>
                        </div>
                        <div class="form-group col-md-1">
                            <label for="Gender">Gender</label>
                            <select id="Gender" name="gender" class="form-control">
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                            </select>
                        </div>
                        <div class="form-group col-md-1">
                            <label for="Status">Status</label>
                            <select id="Status" name="status" class="form-control">
                            <option value="1">On</option>
                            <option value="0">Off</option>  
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck"/>
                            <label class="form-check-label" for="gridCheck">
                            Check me out
                            </label>
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary px-3">Sign in</button>
                    </form>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" className='px-3' onClick={()=>{this.toggle()}}>Save user</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



