import React from 'react';
import { UIComponent } from './shared';
import './../styles/userview.scss';

export class UserviewPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            updateUserTable: false
        };
    }

    updateUserTable = () => {
        this.setState({
            updateUserTable: true
        });
    }

    render(){
        return(
            <section className="user-content">
                <UIComponent ui_content={<Usertable update={this.state.updateUserTable} />} css_class="ui-table" name="View Users" />
                <UIComponent ui_content={<UserForm updateUserTable={this.updateUserTable} />} css_class="" name="New User" />
            </section>
        );
    }
}

class Usertable extends React.Component{
    constructor(props){
        super(props);
        this.tbody = React.createRef();

        this.state = {
            tableRows: []
        };

        this.getUsers();
    }

    componentDidUpdate(prevProps){
        if(this.props.update !== prevProps.update){
            this.refresh();
            this.props.update = false;
        }
    }

    refresh = () => {
        this.tbody.current.innerHTML = "";
        this.getUsers();
    }

    async getUsers(){
        const response = await fetch("./scripts/php/getusers.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            data = data.split("####");
            data.pop();

            data.forEach((element) => {
                element = element.split("#");

                this.setState(prevState => ({
                    tableRows: [...prevState.tableRows, <UsertableRow id={element[0]} username={element[1]} usergroup={element[2]} refresh={this.refresh} />]
                }));
            });
        }
    }

    render(){
        return(
            <div className="usertable">
                <table>
                    <thead className="text-big">
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Usergroup</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-normal" ref={this.tbody}>
                        {this.state.tableRows.map((row, i) => {return row})}
                    </tbody>
                </table>
            </div>
        );
    }
}

class UsertableRow extends React.Component{
    constructor(props){
        super(props);

        this.groupInput = React.createRef();
    }

    async changeGroup(){
        let formData = new FormData();
        formData.append('group', this.groupInput.current.value);
        formData.append('id', this.props.id);

        const response = await fetch("./scripts/php/changegroup.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The Usergroup was changed.");
        }else{
            alert("Something went wrong.");
        }

        this.props.refresh();
    }

    async deleteUser(){
        let formData = new FormData();
        formData.append('id', this.props.id);

        const response = await fetch("./scripts/php/deleteuser.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The user was deleted.");
        }else{
            alert("Something went wrong.");
        }

        this.props.refresh();
    }

    async resetPW(){
        let formData = new FormData();
        formData.append('id', this.props.id);

        const response = await fetch("./scripts/php/resetpw.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("Password reset. The new Password is 'newpw21$.'.");
        }else{
            alert("Something went wrong.")
        }

        this.props.refresh();
    }

    render(){
        return(
            <tr>
                <td><p className="text-normal">{this.props.id}</p></td>
                <td><p className="text-normal">{this.props.username}</p></td>
                <td><button className="btn-main" onClick={() => this.resetPW()}>Reset</button></td>
                <td>
                    <select className="input" ref={this.groupInput} onChange={() => this.changeGroup()}>
                        <option selected={(this.props.usergroup === "User") ? true : false} value="3">User</option>
                        <option selected={(this.props.usergroup === "Moderator") ? true : false} value="2">Moderator</option>
                        <option selected={(this.props.usergroup === "Admin") ? true : false} value="1">Admin</option>
                    </select>
                </td>
                <td><button className="btn-main" onClick={() => this.deleteUser()}>Delete</button></td>
            </tr>
        );
    }
}

class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.username = React.createRef();
        this.usergroup = React.createRef();
    }

    async newUser(){
        let formData = new FormData();
        formData.append('username', this.username.current.value);
        formData.append('usergroup', this.usergroup.current.value);

        const response = await fetch("./scripts/php/newuser.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The user was created. The password is 'newpw21$.'.");

            this.props.updateUserTable();
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div className="form-user">
                <div className="form-head">
                    <h2 className="text-big">Create User</h2>
                </div>
                <div className="form-item">
                    <label className="text-normal">Username:</label>
                    <input className="input" placeholder="Username" ref={this.username}/>
                </div>
                <div className="form-item">
                    <label className="text-normal">Usergroup:</label>
                    <select className="input" ref={this.usergroup}>
                        <option value="3">User</option>
                        <option value="2">Moderator</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
                <div className="form-buttons">
                    <button className="btn-main" onClick={() => this.newUser()}>Create</button>
                </div>
                <div className="clear" />
            </div>
        );
    }
}