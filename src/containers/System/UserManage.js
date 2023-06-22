import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUser} from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state ={
            arrUsers: [],
            isOpenModalUser: false
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
                            <th>Fullname</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>  
                    
                            {arrUsers && arrUsers.map((item, index) =>{
                                return(
                                    <tr>
                                    <td>{item.email}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>
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
