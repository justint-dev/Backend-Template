import React from 'react';
import { UIComponent } from './shared';
import './../styles/shopitemview.scss';

export class ShopitemViewPage extends React.Component{
    render(){
        return(
            <section className="shopitemview-content">
                <UIComponent ui_content={<ShopitemViewTable />} css_class="ui-shopitemview" name="View Shopitems" />
            </section>
        );
    }
}

class ShopitemViewTable extends React.Component{
    constructor(props){
        super(props);
        this.tbody = React.createRef();

        this.state = {
            tableRows: []
        };

        this.getItems();
    }

    refresh = () => {
        this.tbody.current.innerHTML = "";
        this.getItems();
    }

    async getItems(){
        const response = await fetch("./scripts/php/getshopitems.php", {
            method: "POST"
        });

        let data = await response.text();

        if(data !== ""){
            data = data.split("####");
            data.pop();

            data.forEach((element) => {
                element = element.split("#");

                this.setState(prevState => ({
                    tableRows: [...prevState.tableRows, <ShopitemViewTableRow itemnumber={element[0]} name={element[1]} price={element[2]} imglink={element[3]} refresh={this.refresh} />]
                }));
            });
        }
    }

    render(){
        return(
            <div className="table-shopitemview">
                <table>
                    <thead className="text-big">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Itemnumber</th>
                            <th>Price</th>
                            <th>Save</th>
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

class ShopitemViewTableRow extends React.Component{
    constructor(props){
        super(props);
        this.name = React.createRef();
        this.itemnumber = React.createRef();
        this.price = React.createRef();
    }

    async deleteItem(){
        let formData = new FormData();
        formData.append('itemnumber', this.props.itemnumber);

        const response = await fetch("./scripts/php/deleteshopitem.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The shopitem was deleted.");

            this.props.refresh();
        }else{
            alert("Something went wrong.");
        }
    }

    async editItem (){
        let formData = new FormData();
        formData.append('name', this.name.current.value)
        formData.append('itemnumber', this.itemnumber.current.value);
        formData.append('price', this.price.current.value);
        formData.append('oldItemnumber', this.props.itemnumber);

        const response = await fetch("./scripts/php/editshopitem.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The shopitem was edited.");

            this.props.refresh();
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <tr>
                <td><img src={this.props.imglink} /></td>
                <td><input className="input" placeholder={this.props.name} ref={this.name} /></td>
                <td><input className="input" placeholder={this.props.itemnumber} ref={this.itemnumber} /></td>
                <td><input className="input" placeholder={this.props.price} ref={this.price} /></td>
                <td><button className="btn-main" onClick={() => this.editItem()}>Save</button></td>
                <td><button className="btn-main" onClick={() => this.deleteItem()}>Delete</button></td>
            </tr>
        );
    }
}