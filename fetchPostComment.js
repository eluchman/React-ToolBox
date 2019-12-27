Learn to use Fetch to send a POST request to the server, then process the response.

Instructions
Post a Comment
Open ActionCreators.js and update it as follows:
. . .

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

. . .
Open comments.js and remove the following two lines from it:
. . .
       comment.id = state.comments.length;
       comment.date = new Date().toISOString();
 . . .
Open MainComponent.js and update it as follows:
. . .
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
. . .

const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
. . .
                    postComment={this.props.postComment}
. . .
Finally, open CampsiteInfoComponent.js and update it as follows:
. . .
    function RenderComments({comments, postComment, campsiteId}) {
. . .
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
. . .
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
. . .
                            postComment={props.postComment}                   
. . .