yarn add redux-thunk@2.2.0
yarn add redux-logger@3.0.6
Then open configureStore.js and update it to use Thunk and Logger as follows:
import {createStore, combineReducers, applyMiddleware } from 'redux';
. . .
import thunk from 'redux-thunk';
import logger from 'redux-logger';
. . .
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        }),
        applyMiddleware(thunk, logger)
. . .
Next, open ActionTypes.js and add new action types as follows:
. . .
export const CAMPSITES_LOADING = 'CAMPSITES_LOADING';
export const CAMPSITES_FAILED = 'CAMPSITES_FAILED';
export const ADD_CAMPSITES = 'ADD_CAMPSITES';
Then open ActionCreators.js and add new actions:
. . .
import { CAMPSITES } from '../shared/campsites';

. . .

export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    setTimeout(() => {
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});
Next, open campsites.js (from the redux folder) and add the code to respond to actions as follows:
import * as ActionTypes from './ActionTypes';

export const Campsites = (state = {
        isLoading: true,
        errMess: null,
        campsites: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []};
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};
Add a new component named LoadingComponent.js to display a loading message as follows:
import React from 'react';

export const Loading = () => {
    return (
        <div className="col">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
            <p>Loading...</p>
        </div>
    );
};
Now we will update the remaining components to use the actions. First, open MainComponent.js and update it as follows:
. . .
import { addComment, fetchCampsites } from '../redux/ActionCreators';

. . .
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()). . .

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                />
            );
        };
. . .
Open CampsiteInfoComponent.js and update it as follows:
. . .
import { Loading } from './LoadingComponent';
. . .    
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
. . .
Open HomeComponent.js and update it as follows:
. . .
import { Loading } from './LoadingComponent';
. . .

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return (
             <Loading />
        );
    }
    if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}
. . .
                    <RenderCard
                        item={props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
. . .
Finally, update DirectoryComponent.js as follows:
. . .
import { Loading } from './LoadingComponent';
. . .
        const directory = props.campsites.campsites.map(campsite => {
. . .
        if (props.campsites.isLoading) {
            return (
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.campsites.errMess) {
            return (
                <div className="container">
                    <div className="row"> 
                        <div className="col">
                            <h4>{props.campsites.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        } 
. . .