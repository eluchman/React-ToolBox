import { BrowserRouter } from 'react-router-dom';
. . .
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>



import { Switch, Route, Redirect } from 'react-router-dom';
. . .
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Redirect to='/home' />
                </Switch>



                import { NavLink } from 'react-router-dom';