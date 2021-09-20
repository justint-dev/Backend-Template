import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './../styles/navbar.scss';

export class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.navbar = React.createRef();
        this.navbarToggleIcon = React.createRef();

        this.state = {
            logout: false
        };
    }

    toggleNavbar(){
        this.navbar.current.classList.toggle("minimize");
        this.navbarToggleIcon.current.classList.toggle("fa-chevron-right");
        this.navbarToggleIcon.current.classList.toggle("fa-chevron-left");
    }

    async logout(){
        const response = await fetch("./scripts/php/logout.php", {
            method: "POST"
        });

        const data = await response.text();

        if(data === "100"){
            this.setState({
                logout: true
            });
        }
    }

    render(){
        let menuOne = {headline: "User Management", icon: "fas fa-users-cog", active: ((/userview/.test(window.location.href)) ? true : false), listItems: [
                        {link: "/dashboard/userview", text: "View Users", active: ((window.location.href.includes("userview")) ? true : false)}
        ]};
        let menuTwo = {headline: "Database", icon: "fas fa-database", active: ((/dbcreate|dbbackup/.test(window.location.href)) ? true : false), listItems: [
                        {link: "/dashboard/dbcreate", text: "Create Database", active: ((window.location.href.includes("dbcreate")) ? true : false)},
                        {link: "/dashboard/dbbackup", text: "Backup Database", active: ((window.location.href.includes("dbbackup")) ? true : false)}
        ]}
        let menuThree = {headline: "News", icon: "fas fa-newspaper", active: ((/news/.test(window.location.href)) ? true : false), listItems: [
                        {link: "/dashboard/news", text: "View News", active: ((window.location.href.includes("news")) ? true : false)}
        ]};
        let menuFour = {headline: "Blog", icon: "fas fa-blog", active: ((/blog/.test(window.location.href)) ? true : false), listItems: [
                        {link: "/dashboard/blog", text: "View Blogposts", active: ((window.location.href.includes("blog")) ? true : false)}
        ]};
        let menuFive = {headline: "Shop", icon: "fas fa-shopping-cart", active: ((/shopitemcreate|shopitemview/.test(window.location.href)) ? true : false), listItems: [
                        {link: "/dashboard/shopitemcreate", text: "Create Items", active: ((window.location.href.includes("shopitemcreate")) ? true : false)},
                        {link: "/dashboard/shopitemview", text: "View Items", active: ((window.location.href.includes("shopitemview")) ? true : false)}
        ]};

        if(this.state.logout === true){
            return(
                <Redirect to="/" />
            );
        }

        return(
            <section className="navbar" ref={this.navbar}>
                <div className="navbar-content">
                    <div className="navbar-header">
                        <img src="./img/logo.png" alt="" />
                        <ul>
                            <li className="text-big"><i className="fas fa-user"></i>Justin</li>
                            <li className="text-big"><i className="fas fa-users-cog"></i>User</li>
                        </ul>
                        <div className="clear" />
                    </div>

                    <div className="navbar-menu">
                        <ul>
                            <Submenu object={menuOne} />
                            <Submenu object={menuTwo} />
                            <Submenu object={menuThree} />
                            <Submenu object={menuFour} />
                            <Submenu object={menuFive} />
                        </ul>
                    </div>

                    <div className="navbar-buttons">
                        <Link to="/dashboard">
                            <button className="btn-main"><i className="fas fa-home"></i></button>
                        </Link>
                        <button className="btn-main" onClick={() => this.logout()}>Logout</button>
                    </div>
                </div>

                <div className="navbar-toggle" onClick={() => this.toggleNavbar()}>
                    <i className="fa fa-chevron-left" ref={this.navbarToggleIcon}></i>
                </div>
            </section>
        );
    }
}

class Submenu extends React.Component{
    constructor(props){
        super(props);
        this.submenu = React.createRef();
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            if(this.props.object.active === true && this.submenu.current.classList.contains("animate-submenu-close")){
                this.toggleSubmenu();
            }
        }
    }

    toggleSubmenu(){
        this.submenu.current.classList.toggle('animate-submenu-open');
        this.submenu.current.classList.toggle('animate-submenu-close');
    }

    render(){
        return(
            <li className="navbar-menu-item">
                <p className={((this.props.object.active === true) ? "active" : "") + " headline-small"} onClick={() => this.toggleSubmenu(this.submenu.current)}><i className={this.props.object.icon}></i>{this.props.object.headline}</p>
                <ul className="animate-submenu-close navbar-submenu" ref={this.submenu}>
                    {this.props.object.listItems.map( (item, i) => <li key={i} className={((item.active === true) ? "active" : "") + " text-normal"}><Link to={item.link}>{item.text}</Link></li> )}
                </ul>
            </li>
        );
    }
}