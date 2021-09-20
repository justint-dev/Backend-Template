import React from 'react';
import { Navbar } from './../includes/navbar';
import { UIComponent } from './shared';
import './../styles/news.scss';

export class NewsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            updateNewsTable: false
        };
    }

    updateNewsTable = () => {
        this.setState({updateNewsTable: true});
    }

    render(){
        return(
            <section className="news-content">
                <UIComponent ui_content={<NewsTable update={this.state.updateNewsTable} />} css_class="" name="View News" />
                <UIComponent ui_content={<NewsForm updateNewsTable={this.updateNewsTable} />} css_class="" name="Create News" />
            </section>
        );
    }
}

class NewsTable extends React.Component{
    constructor(props){
        super(props);
        this.tbody = React.createRef();

        this.state = {
            tableRows: []
        };

        this.getNews();
    }

    componentDidUpdate(prevProps){
        if(this.props.update != prevProps.update){
            this.refresh();
            this.props.update = false;
        }
    }

    refresh = () => {
        this.tbody.current.innerHTML = "";
        this.getNews();
    }

    async getNews(){
        const response = await fetch("./scripts/php/getnews.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            data = data.split("////");
            data.pop();

            data.forEach((element) => {
                element = element.split("####");

                this.setState(prevState => ({
                    tableRows: [...prevState.tableRows, <NewsTableRow id={element[0]} title={element[1]} date={element[2].replace('.json', '')} refresh={this.refresh} />]
                }));
            });
        }
    }

    render(){
        return(
            <div className="table-news">
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

class NewsTableRow extends React.Component{
    constructor(props){
        super(props);
    }

    async deleteNews(){
        let formData = new FormData();
        formData.append('filename', (this.props.id+"####"+this.props.title+"####"+this.props.date+".json"));

        const response = await fetch("./scripts/php/deletenews.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The article was deleted.");

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
                <td><button className="btn-main" onClick={() => this.deleteNews()}>Delete</button></td>
            </tr>
        );
    }
}

class NewsForm extends React.Component{
    constructor(props){
        super(props);
        this.title = React.createRef();
        this.date = React.createRef();
        this.text = React.createRef();
    }

    async createNews(){
        let formData = new FormData();
        formData.append('title', this.title.current.value);
        formData.append('date', this.date.current.value);
        formData.append('text', this.text.current.value);

        const response = await fetch("./scripts/php/newnews.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The article was created.");

            this.props.updateNewsTable();
            this.title.current.value = "";
            this.date.current.value = "";
            this.text.current.value = "";
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div className="form-news">
                <div className="form-head">
                    <h2 className="text-big">Create News</h2>
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
                    <button className="btn-main" onClick={() => this.createNews()}>Save</button>
                </div>
            </div>
        );
    }
}