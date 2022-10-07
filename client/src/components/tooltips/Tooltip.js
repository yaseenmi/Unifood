import React, {Component} from "react";
import "./styles/Tooltip.css"

class Tooltip extends Component
{
    constructor(props)
    {
        super(props);
        
        // Refs
        this.ref = React.createRef();

        // State object
        this.state = {

        }

        // Binding Methods

    }
    componentDidMount()
    {

    }
    render()
    {
        return (
            <p ref={this.ref} id={this.props.id} style={this.props.style} className="tool-tip">
                {this.props.text}
            </p>
        );
    }
}

export default Tooltip;