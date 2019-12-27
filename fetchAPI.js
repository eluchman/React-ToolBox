Update Redux files
Next, open ActionTypes.js and add the following:
. . .
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const PROMOTIONS_LOADING = 'PROMOTIONS_LOADING';
export const ADD_PROMOTIONS = 'ADD_PROMOTIONS';
export const PROMOTIONS_FAILED = 'PROMOTIONS_FAILED';
Then, open ActionCreators.js and update it as follows:
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
. . .

export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
    .then(response => response.json())
    .then(campsites => dispatch(addCampsites(campsites)));
};

. . .

export const fetchComments = () => dispatch => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)));
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});
Now you will need to change the comments and promotions reducer files to no longer use the data from the files in the shared folder, but to use the data that's fetched from the server and dispatched to the reducer as action payloads instead. 
Note that this means that the shape of the data has changed, just like you've seen before with the campsites data -- it is no longer a simple array, but an object that contains the comments or promotions array as a property, plus other properties (errMess for comments, errMess and isLoading for promotions). So several adjustments will need to be made. 
Open comments.js and update it as follows:
import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};
Similarly, open promotions.js and update it as follows:
import * as ActionTypes from './ActionTypes';
export const Promotions = (state = { isLoading: true,
                                        errMess: null,
                                        promotions: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
            
        default:
          return state;
      }
};
Now that the Redux actions are all updated, it's time to update the components.


Update Components
Open MainComponent.js and update it as follows:
. . .
import { addComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
. . .

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions())
};

. . .

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
    }
  
. . .
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                />
. . .
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment}
                />         
. . .
Then, open DirectoryComponent.js and update it as follows:
. . .
import { baseUrl } from '../shared/baseUrl';
. . .
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
. . .
Then, open HomeComponent.js and update it as follows:
. . .
import { baseUrl } from '../shared/baseUrl';
. . .
                <CardImg src={baseUrl + item.image} alt={item.name} />
. . .
                    <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
. . .
Then, open CampsiteInfoComponent.js and update it as follows:
. . .
import { baseUrl } from '../shared/baseUrl';
. . .
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
. . .
Save and test all the changes.
When you test this code in your browser, make sure that you start json-server first. Make sure to start it from the json-server folder.
You will see a broken image for the featured leader image on the home page, don't fret! This is expected behavior, and it will be part of your assignment tasks in the workshop to fix it. Leave it as it is for now. 
If you are getting a "Failed to Fetch" error in your browser, try replacing your baseUrl 'localhost' with '127.0.0.1' as you see below, and see if that helps:
export const baseUrl = 'http://127.0.0.1:3001/';
 If it's still not working, please reach out on the React channel in Slack or to your instructor for assistance.
Optional: Do a Git commit with the message "Fetch from Server"
