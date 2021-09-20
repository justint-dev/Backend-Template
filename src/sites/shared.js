import React, {createRef} from 'react';
import './../styles/dashboard.scss';

export class UIComponent extends React.Component{
    constructor(props){
        super(props);
        this.content = createRef();
        this.header = createRef();

        this.state = {
            contentToggle: true
        };
    }

    toggleComponent(){
        this.setState({contentToggle: !this.state.contentToggle});
    }

    render(){
        return(
            <div className={"ui-container " + this.props.css_class}>
                <div className="ui-header" ref={this.header} onClick={() => (this.header.current.classList.contains('.deactivated')) ? null : this.toggleComponent(this.content.current)}>
                    <h1 className="headline-small">{this.props.name}</h1>
                </div>
                <div className="ui-wrapper">
                    <div className="ui-content" ref={this.content}>
                        {Array.isArray(this.props.ui_content) ? this.props.ui_content.map((item) => item) : this.props.ui_content}
                    </div>
                </div>
            </div>
        );
    }
}