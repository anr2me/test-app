import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';


class AddMoreButton extends Component{

    handleAddMore = () => {
        this.props.history.push('/add');
    };

	render() {
        console.log('CurThisState: ',this.state);
        console.log('CurThisProps: ',this.props);
     
        return(
            <Button fluid onClick={this.handleAddMore} icon={{name:"plus circle", size:"large"}} labelPosition='left' positive content="Add More Currencies" />
        );

	}
}

export default AddMoreButton
