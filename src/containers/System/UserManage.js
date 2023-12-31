import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUser, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    // life cycle
    // run component:
    // 1. Run construct -> init state
    // 2. Did mount (set State)
    // 3. Render

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () =>{
        let response = await getAllUsers('ALL');
        if(response && response.errCode ===0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () =>{
        this.setState({
            isOpenModalUser: true,
        })  
    }

    toggleUserModal = ()=>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        }) 
    }

    toggleUserEditModal = ()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        }) 
    }

    createNewuser = async(data)=>{
        try {
            let response= await createNewUser(data);
            if(response && response.errCode !==0){
                alert(response.errMessage)
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e)     
        }
    }

    handleEditUser = (user)=>{
        console.log('check edit user',user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }


    handleDeleteUser = async (user) =>{
        console.log('delete', user);
        try {
           let res = await deleteUserService(user.id);
           if(res && res.errCode ===0){
                await this.getAllUsersFromReact();
           } 
        } catch (e) {
            console.log(e)  
        }
    }

    doEditUser = async(user)=>{
        try {
            let res = await editUserService(user);
            if(res && res.errCode ===0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUsersFromReact()
            }else{
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }     
    }

    render() {
        let arrUsers=this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFomatPerent={this.toggleUserModal}
                    createNewuser={this.createNewuser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFomatPerent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage users with quynh</div>
                <div className='mx-1'>
                    <button 
                    className='btn btn-primary px-3'
                    onClick={()=> this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i> Add new user</button>

                </div>
                <div className='users-table mt-4 mx-1'>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>firstName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>  
                    
                            {arrUsers && arrUsers.map((item, index) =>{
                                return(
                                    <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>  
                                    <td>
                                        <button 
                                        className='btn-edit'
                                        onClick={()=> this.handleEditUser(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button 
                                        className='btn-delete'
                                        onClick={()=> this.handleDeleteUser(item)}
                                        ><i className="fas fa-trash-alt"></i></button>
                                    </td>
                            </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
