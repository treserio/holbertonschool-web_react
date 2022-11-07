import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import {ReduxFooter} from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import WithLogging from '../HOC/WithLogging';
import { getLatestNotification } from '../utils/utils';
import AppContext from './AppContext';
import { connect, Provider } from 'react-redux';
import * as uiActions from '../actions/uiActionCreators';

const listCourses = [
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
];

export default class App extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      // displayDrawer: this.props.displayDrawer,
      /* migrating to store values
      user: AppContext._currentValue.user,
      logout: AppContext._currentValue.logout,
      */
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ],
    };
    /* migrating to store values
    // this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    // this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.state.logout = this.state.logout.bind(this);
    // using the props that were sent in from the Redux Store
    this.state.user.isLoggedIn = this.props.isLoggedIn;
    */
    this.logoutListener = this.logoutListener.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.login = this.login.bind(this);

  }

  /* migrating to store actions that were bound to dispatch
  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
    this.props.displayNotificationDrawer();
    console.log('open', this.context.store.getState());
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
    this.props.hideNotificationDrawer();
    console.log('close', this.context.store.getState());
  }
  */

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keydown', this.logoutListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keydown', this.logoutListener);
  }

  login(email, password) {
    // update state
    // this.setState({
    //   user: {
    //     email,
    //     password,
    //     isLoggedIn: true,
    //   }
    // });
    // // update context
    // this.context.user = {
    //   email,
    //   password,
    //   isLoggedIn: true,
    // };
    // console.log(this.context.store.getState())
    if (this.props.loginRequest) {
      // first value of loginRequest is args, thunkApi is 2nd param, looks like a store
      this.props.loginRequest({email, password}).then((res) => {
        res.payload ? this.context.store.dispatch(res.payload) : null;
      })
    };
    // setTimeout(() => console.log('timeout', this.context.store.getState()), 800);
  }

  logoutListener(event) {
    if (event.ctrlKey && event.key === 'h') {
      // console.log("running logoutListener")
      alert('Logging you out');
      this.props.logout();
    }
  };

  markNotificationAsRead(id) {
    let ln = this.state.listNotifications
    this.setState({
      listNotifications: ln.filter((note) => note.id !== id),
    });
  };

  render () {
    const style = StyleSheet.create({
      body: {
        padding: '2% 3%',
        height: '480px',
        '@media (max-width: 900px)': {
          display: this.state.displayDrawer ? 'none' : 'block',
        },
      },
    });

    return (
      <AppContext.Provider value={{user: this.props.user, logout: this.props.logout}}>
        <div className='App'>
          <Provider store={this.context.store}>
            <Notifications
              displayDrawer={this.props.displayDrawer}
              listNotifications={this.state.listNotifications}
              handleHideDrawer={this.props.hideNotificationDrawer}
              handleDisplayDrawer={this.props.displayNotificationDrawer}
              markNotificationAsRead={this.markNotificationAsRead}
            />
            <Header />
            <div className={`App-body ${css(style.body)}`}>
              {this.props.user.isLoggedIn ?
                <BodySectionWithMarginBottom title='Course list'>
                  <CourseList listCourses={listCourses} />
                </BodySectionWithMarginBottom>
                : <BodySectionWithMarginBottom title='Log in to continue'>
                    <Login loginRequest={this.props.loginRequest} />
                  </BodySectionWithMarginBottom>
              }
              <BodySection title='News from the School'>
                <p>my balognia has a first name...</p>
              </BodySection>
            </div>
            <ReduxFooter />
          </Provider>
        </div>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: false,
};

// functions for redux connect parameters
export function mapStateToProps(state) {
  return {
    isLoggedIn: state.ui.get('isUserLoggedIn'),
    displayDrawer: state.ui.get('isNotificationDrawerVisible'),
    user: state.ui.get('user'),
  };
}

// binding dispatch to various functions that are sent in as props
function mapDispatchToProps(dispatch) {
  return {
    /* no need for loginSuccess, loginResponse will run either success or failure
    loginSuccess: () => dispatch(uiActions.loginSuccess()), */

    // createAsyncThunk, thunkApi is 2nd param, looks like a store
    loginRequest: (args) => dispatch(uiActions.loginRequest(args)),
    displayNotificationDrawer: () => dispatch(uiActions.displayNotificationDrawer()),
    hideNotificationDrawer: () => dispatch(uiActions.hideNotificationDrawer()),
    logout: () => dispatch(uiActions.logout()),
  }
}

export const ReduxApp = connect(mapStateToProps, mapDispatchToProps, null, { context: AppContext })(App);
