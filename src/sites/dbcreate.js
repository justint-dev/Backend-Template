import React from 'react';
import { UIComponent } from './shared';
import './../styles/dbcreate.scss';

export class DBCreatePage extends React.Component{
    render(){
        return(
            <section className="dbcreate-content">
                <UIComponent ui_content={<DBCreateForm />} css_class="" name="Create Database" />
            </section>
        );
    }
}

class DBCreateForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dbstatus: ""
        };

        this.checkDB(true);
    }

    async checkDB(first){
        const response = await fetch("./scripts/php/checkdb.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data === "100"){
            this.setState({dbstatus: "Online"});
        }else if(data === "200"){
            this.setState({dbstatus: "Offline"});
        }

        if(first === false){
            alert("Database status was checked.");
        }
    }

    async createDB(){
        const response = await fetch("./scripts/php/createdb.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data === "100"){
            alert("The database was created.")
        }else{
            alert("Something went wrong.");
        }
    }

    async deleteDB(){
        const response = await fetch("./scripts/php/deletedb.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data === "100"){
            alert("The database was deleted.");
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div className="form-dbcreate">
                <div className="form-head">
                    <h2 className="text-big">Database Status</h2>
                </div>
                <div className="form-item">
                    <p className="text-normal">Status:</p>
                    <p className="text-normal">{this.state.dbstatus}</p>
                </div>
                <div className="clear" />
                <div className="form-buttons">
                    <button className="btn-main" onClick={() => this.checkDB(false)}>Check</button>
                </div>
                <div className="form-head">
                    <h2 className="text-big">Database Actions</h2>
                </div>
                <div className="form-item-buttons">
                    <button className="btn-main" onClick={() => this.deleteDB()}>Delete</button>
                    <button className="btn-main" onClick={() => this.createDB()}>Create</button>
                </div>
            </div>
        );
    }
}