import React from 'react';
import { UIComponent } from './shared';
import './../styles/blog.scss';

export class BlogPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            updateBlogTable: false
        };
    }

    updateBlogTable = () => {
        this.setState({updateBlogTable: true});
    }

    render(){
        return(
            <section className="blog-content">
                <UIComponent ui_content={<BlogTable update={this.state.updateBlogTable} />} css_class="" name="View Blog" />
                <UIComponent ui_content={<BlogForm updateBlogTable={this.updateBlogTable} />} css_class="" name="Create Blog" />
            </section>
        );
    }
}

class BlogTable extends React.Component{
    constructor(props){
        super(props);
        this.tbody = React.createRef();

        this.state = {
            tableRows: []
        };

        this.getBlog();
    }

    componentDidUpdate(prevProps){
        if(this.props.update !== prevProps.update){
            this.refresh();
            this.props.update = false;
        }
    }

    refresh = () => {
        this.tbody.current.innerHTML = "";
        this.getBlog();
    }

    async getBlog(){
        const response = await fetch("./scripts/php/getblog.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            data = data.split("////");
            data.pop();

            data.forEach((element) => {
                element = element.split("####");

                this.setState(prevState => ({
                    tableRows: [...prevState.tableRows, <BlogTableRow id={element[0]} title={element[1]} date={element[2].replace('.json', '')} refresh={this.refresh} />]
                }));
            });
        }
    }
    
    render(){
        return(
            <div className="table-blog">
                <table>
                    <thead className="text-big">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Date</th>
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

class BlogTableRow extends React.Component{
    constructor(props){
        super(props);
    }

    async deleteBlog(){
        let formData = new FormData();
        formData.append('filename', (this.props.id+"####"+this.props.title+"####"+this.props.date+".json"));

        const response = await fetch("./scripts/php/deleteblog.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The blogpost was deleted.");

            this.props.refresh();
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.date}</td>
                <td><button className="btn-main" onClick={() => this.deleteBlog()}>Delete</button></td>
            </tr>
        );
    }
}

class BlogForm extends React.Component{
    constructor(props){
        super(props);
        this.title = React.createRef();
        this.date = React.createRef();
        this.text = React.createRef();
    }

    async createBlog(){
        let formData = new FormData();
        formData.append('title', this.title.current.value);
        formData.append('date', this.date.current.value);
        formData.append('text', this.text.current.value);

        const response = await fetch("./scripts/php/newblog.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The blogpost was created.");

            this.props.updateBlogTable();
            this.title.current.value = "";
            this.date.current.value = "";
            this.text.current.value = "";
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div className="form-blog">
                <div className="form-head">
                    <h2 className="text-big">Create Blog</h2>
                </div>
                <div className="form-item">
                    <label className="text-big">Title:</label>
                    <input className="input" placeholder="Title" ref={this.title} />
                </div>
                <div className="form-item">
                    <label className="text-big">Date:</label>
                    <input className="input" type="date" ref={this.date} />
                </div>
                <div className="form-item">
                    <label className="text-big">Text:</label>
                    <textarea className="input" rows="5" placeholder="Text" ref={this.text} />
                </div>
                <div className="form-buttons">
                    <button className="btn-main" onClick={() => this.createBlog()}>Save</button>
                </div>
            </div>
        );
    }
}