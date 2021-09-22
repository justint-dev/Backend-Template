import React from 'react';
import { UIComponent } from './shared';
import './../styles/dbbackup.scss';

export class DBBackupPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            updateBackupTable: false
        };
    }

    updateBackupTable = () => {
        this.setState({updateBackupTable: true});
    }

    render(){
        return(
            <section className="dbbackup-content">
                <UIComponent ui_content={<BackupTable update={this.state.updateBackupTable} />} css_class="" name="Load Backup" />
                <UIComponent ui_content={<BackupCreateForm updateBackupTable={this.updateBackupTable} />} css_class="" name="Create Backup" />
            </section>
        );
    }
}

class BackupTable extends React.Component{
    constructor(props){
        super(props);
        this.tbody = React.createRef();

        this.state = {
            tableRows: []
        };

        this.getBackups();
    }

    componentDidUpdate(prevProps){
        if(this.props.update !== prevProps.update){
            this.refresh();
            this.props.update = false;
        }
    }

    refresh = () => {
        this.tbody.current.innerHTML = "";
        this.getBackups();
    }

    async getBackups(){
        const response = await fetch("./scripts/php/getdbbackups.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            data = data.split("////");
            data.pop();

            data.forEach((element) => {
                element = element.split("####");

                this.setState(prevState => ({
                    tableRows: [...prevState.tableRows, <BackupTableRow id={element[0]} table={element[1]} date={element[2].replace(".csv", "")} refresh={this.refresh} />]
                }));
            });
        }
    }

    render(){
        return(
            <div className="table-backup">
                <table>
                    <thead className="text-big">
                        <tr>
                            <th>ID</th>
                            <th>Table</th>
                            <th>Date</th>
                            <th>Load</th>
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

class BackupTableRow extends React.Component{
    async deleteBackup(){
        let formData = new FormData();
        formData.append('filename', (this.props.id+"####"+this.props.table+"####"+this.props.date+".csv"));

        const response = await fetch("./scripts/php/deletedbbackup.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The backup was deleted.");

            this.props.refresh();
        }else{
            alert("Something went wrong.");
        }
    }

    async loadBackup(){
        let formData = new FormData();
        formData.append('file', (this.props.id+"####"+this.props.table+"####"+this.props.date+".csv"));

        const response = await fetch("./scripts/php/loaddbbackup.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The backup was loaded.");
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.table}</td>
                <td>{this.props.date}</td>
                <td><button className="btn-main" onClick={() => this.loadBackup()}>Load</button></td>
                <td><button className="btn-main" onClick={() => this.deleteBackup()}>Delete</button></td>
            </tr>
        );
    }
}

class BackupCreateForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            lastDate: ""
        };

        this.getLastBackup();
    }

    async getLastBackup(){
        const response = await fetch("./scripts/php/getlastdbbackup.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            this.setState({lastDate: data.replace(".csv", "")});
        }else{
            alert("Something went wrong.");
        }
    }

    async dbBackup(){
        const response = await fetch("./scripts/php/dbbackup.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data === "100"){
            alert("The database backup was successfull");

            this.getLastBackup();
            this.props.updateBackupTable();
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div className="form-backupcreate">
                <div className="form-head">
                    <h2 className="text-big">Backup Stats</h2>
                </div>
                <div className="form-item">
                    <p className="text-normal">Last Backup:</p>
                    <p className="text-normal">{this.state.lastDate}</p>
                </div>
                <div className="clear" />
                <div className="form-head">
                    <h2 className="text-big">Create Backup</h2>
                </div>
                <div className="form-buttons"> 
                    <button className="btn-main" onClick={() => this.dbBackup()}>Backup</button>
                </div>
            </div>
        );
    }
}