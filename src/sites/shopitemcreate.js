import React from 'react';
import { UIComponent } from './shared';
import './../styles/shopitemcreate.scss';

export class ShopitemCreatePage extends React.Component{
    render(){
        return(
            <section className="shopitemcreate-content">
                <UIComponent ui_content={<ShopitemCreateForm />} css_class="" name="Create Shopitem" />
            </section>
        );
    }
}

class ShopitemCreateForm extends React.Component{
    constructor(props){
        super(props);
        this.name = React.createRef();
        this.itemnumber = React.createRef();
        this.description = React.createRef();
        this.price = React.createRef();
        this.image = React.createRef();
    }

    async createItem(){
        let formData = new FormData();
        formData.append('name', this.name.current.value);
        formData.append('itemnumber', this.itemnumber.current.value);
        formData.append('description', this.description.current.value);
        formData.append('price', this.price.current.value);
        formData.append('image', this.image.current.files[0]);

        const response = await fetch("./scripts/php/newshopitem.php", {
            method: "POST",
            body: formData
        });

        const data = await response.text();

        if(data === "100"){
            alert("The shopitem was created.");

            this.name.current.value = "";
            this.itemnumber.current.value = "";
            this.description.current.value = "";
            this.price.current.value = "";
        }else{
            alert("Something went wrong.");
        }
    }

    render(){
        return(
            <div className="form-shopitemcreate">
                <div className="form-head">
                    <h2 className="text-big">Create Shopitem</h2>
                </div>
                <div className="form-item">
                    <label className="text-big">Name:</label>
                    <input className="input" placeholder="Name" ref={this.name} />
                </div>
                <div className="form-item">
                    <label className="text-big">Itemnumber:</label>
                    <input className="input" placeholder="Itemnumber" ref={this.itemnumber} />
                </div>
                <div className="form-item">
                    <label className="text-normal">Description:</label>
                    <textarea className="input" rows="5" ref={this.description} />
                </div>
                <div className="form-item">
                    <label className="text-big">Price:</label>
                    <input className="input" placeholder="Price" ref={this.price} />
                </div>
                <div className="form-item">
                    <label className="text-normal">Image:</label>
                    <input className="input" type="file" ref={this.image} />
                </div>
                <div className="form-buttons">
                    <button className="btn-main" onClick={() => this.createItem()}>Save</button>
                </div>
            </div>
        );
    }
}