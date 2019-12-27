import React, { Component } from 'react';

//class component

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div />
        );
    }
}


//    render() {
    const directory = this.state.campsites.map(campsite => {
        return (
        //key id required
          <div key ={campsite.id} className="col"> 
                <img src={campsite.image} alt={campsite.name} />
                <h2>{campsite.name}</h2>
                <p>{campsite.description}</p>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {directory}
            </div>
        </div>
    );
}
export default Directory;

// lift state 

import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
        };
    }

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }

    renderSelectedCampsite(campsite) {
        if (campsite) {
            return (
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        return <div />;
    }

    render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedCampsite(this.state.selectedCampsite)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Directory;

//Move state to App.js Add a folder named shared inside the src folder. 
//In the shared folder, download the campsites.js file given at the top of this page under the heading Exercise Resources, and move it to the shared folder.
//Open App.js and update it as follows:  
. . .
import { CAMPSITES } from './shared/campsites';
. . .
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }
. . .
                <Directory campsites={this.state.campsites} />
. . .