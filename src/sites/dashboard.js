import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import { Navbar } from './../includes/navbar';
import { UIComponent } from './shared';
import { UserviewPage } from './userview';
import { DBCreatePage } from './dbcreate';
import { DBBackupPage } from './dbbackup';
import { NewsPage } from './news';
import { BlogPage } from './blog';
import { ShopitemCreatePage } from './shopitemcreate';
import { ShopitemViewPage } from './shopitemview';
import './../styles/dashboard.scss';

export class DashboardPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            errorCode: 0,
            user: "",
            usergroup: "",
        }

        this.checkLogin();
    }

    async checkLogin(){
        const response = await fetch("./scripts/php/checklogin.php", {
            method: "POST"
        });

        let data = await  response.text();

        switch(data){
            case "200":
                this.setState({
                    errorCode: 200
                });
            break;
            case "300":
                this.setState({
                    errorCode: 300
                });
            break;
            default:
                data = data.split("#");
                this.setState({
                    user: data[0],
                    usergroup: data[1]
                });
            break;
        }
    }

    render(){
        if(this.state.errorCode === 0){
            return(
                <div>
                    <Navbar />
                    <div className="content-wrapper">
                        <Router>
                            <Switch>
                                <Route path="/dashboard" exact component={Dashboard} />
                                <Route path="/dashboard/userview" component={UserviewPage} />
                                <Route path="/dashboard/dbcreate" component={DBCreatePage} />
                                <Route path="/dashboard/dbbackup" component={DBBackupPage} />
                                <Route path="/dashboard/news" component={NewsPage} />
                                <Route path="/dashboard/blog" component={BlogPage} />
                                <Route path="/dashboard/shopitemcreate" component={ShopitemCreatePage} />
                                <Route path="/dashboard/shopitemview" component={ShopitemViewPage} />
                            </Switch>
                        </Router>
                    </div>
                    <div className="clear" />
                </div>
            );
        }else{
            return(
                <div className="error">
                    <p>{(this.state.errorCode === 200) ? "Something went wrong." : "You are not logged in."}</p>
                </div>
            );
        }
    }
}

class Dashboard extends React.Component{
    render(){
        return(
            <section className="dashboard">
                <Stats />
                <UIComponent ui_content={<Settings />} css_class="" name="Settings" />
            </section>
        );
    }
}

class Stats extends React.Component{
    constructor(props){
        super(props);
        this.ui_content = this.returnUIContent();
    }

    returnUIContent(){
        let statsOne = {headline: "Visitor-Statistics", listItems: [
                        {text: "Visitors:", value: "124.345"},
                        {text: "Unique Visitors:", value: "12.400"},
                        {text: "Visitors:\r\n(monthly) ", value: "32.467"},
                        {text: "Unique Visitors:\r\n(monthly) ", value: "9.263"},
                        {text: "Visitors:\r\n(today) ", value: "1.203"},
                        {text: "Unique Visitors:\n(today) ", value: "342"}
        ]};
        let statsTwo = {headline: "Content-Statistics", listItems: [
                        {text: "Newsarticles:", value: "75"},
                        {text: "Blogposts:", value: "12"}
        ]};
        let statsThree = {headline: "Shop-Statistics", listItems: [
                        {text: "Items:", value: "245"},
                        {text: "Sold items:", value: "12.456"},
                        {text: "Revenue:", value: "1.687.476,00 €"},
                        {text: "Orders:", value: "546"},
                        {text: "Average items:\r\n(per Order) ", value: "6"},
                        {text: "Average revenue:\r\n(per Order) ", value: "1.267,72 €"},
        ]};

        return ([
            <StatsSection key="visitors" object={statsOne} />,
            <StatsSection key="content" object={statsTwo} />,
            <StatsSection key="shop" object={statsThree} />
        ]);
    }

    render(){
        return(
            <UIComponent ui_content={this.ui_content} css_class="" name="Statistics"/>
        );
    }
}

class StatsSection extends React.Component{
    render(){
        return(
            <div className="stats-section">
                <div className="stats-head">
                    <h2 className="text-big">{this.props.object.headline}</h2>
                </div>
                {this.props.object.listItems.map( (item, i) => <div className="stats-item" key={i}>
                                                                    <p className="text-normal">{item.text}</p>
                                                                    <p className="text-normal">{item.value}</p>
                                                                    <div className="clear" />
                                                                </div> )}
            </div>
        );
    }
}

class Settings extends React.Component{
    constructor(props){
        super(props);
        this.dbserver = React.createRef();
        this.dbusername = React.createRef();
        this.dbpassword = React.createRef();
        this.getDB();
    }

    async getDB(){
        const response = await fetch("./scripts/php/getdbcon.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            data = data.split("####");
            this.dbserver.current.value = data[0];
            this.dbusername.current.value = data[1];
            this.dbpassword.current.value = data[2];
        }
    }

    async saveDB(){
        let formData = new FormData();
        formData.append('server', this.dbserver.current.value);
        formData.append('username', this.dbusername.current.value);
        formData.append('password', this.dbpassword.current.value);

        const response = await fetch("./scripts/php/savedbcon.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("Database Settings saved.");
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div>
                <div className="settings-section">
                    <div className="settings-head">
                        <h2 className="text-big">Website Settings</h2>
                    </div>
                    <div className="settings-item">
                        <label className="text-normal">Website:</label>
                        <input className="input" placeholder="URL" />
                    </div>
                    <div className="form-buttons">
                        <button className="btn-main">Save</button>
                    </div>
                </div>
                <div className="settings-section db">
                    <div className="settings-head">
                        <h2 className="text-big">Database Settings</h2>
                    </div>
                    <div className="settings-item">
                        <label className="text-normal">Server:</label>
                        <input className="input" placeholder="URL" ref={this.dbserver} />
                    </div>
                    <div className="settings-item">
                        <label className="text-normal">Username:</label>
                        <input className="input" placeholder="Username" ref={this.dbusername} />
                    </div>
                    <div className="settings-item">
                        <label className="text-normal">Password:</label>
                        <input className="input" placeholder="Password" ref={this.dbpassword} />
                    </div>
                    <div className="clear" />
                    <div className="form-buttons">
                        <button className="btn-main" onClick={() => this.saveDB()}>Save</button>
                    </div>
                </div>
                <div className="settings-section">
                    <div className="settings-head">
                        <h2 className="text-big">Payment Settings</h2>
                    </div>
                    <div className="settings-item">
                        <label className="text-normal">Paypal E-Mail:</label>
                        <input className="input" placeholder="E-Mail" />
                    </div>
                    <div className="settings-item">
                        <label className="text-normal">Paypal Token:</label>
                        <input className="input" placeholder="Token" />
                    </div>
                    <div className="form-buttons">
                        <button className="btn-main">Save</button>
                    </div>
                </div>
            </div>
        );
    }
}