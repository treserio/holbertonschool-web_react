import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import WithLogging from '../HOC/WithLogging';
import { getLatestNotification } from '../utils/utils';
import AppContext from './AppContext';
import { connect } from 'react-redux';
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
      user: AppContext._currentValue.user,
      logout: AppContext._currentValue.logout,
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ],
    };
    // this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    // this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logoutListener = this.logoutListener.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.login = this.login.bind(this);
    this.state.logout = this.state.logout.bind(this);
    // using the props that were sent in from the Redux Store
    this.state.user.isLoggedIn = this.props.isLoggedIn;
  }

  // handleDisplayDrawer() {
  //   this.setState({ displayDrawer: true });
  //   this.props.displayNotificationDrawer();
  //   console.log('open', this.context.store.getState());
  // }

  // handleHideDrawer() {
  //   this.setState({ displayDrawer: false });
  //   this.props.hideNotificationDrawer();
  //   console.log('close', this.context.store.getState());
  // }

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
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      }
    });
    // update context
    this.context.user = {
      email,
      password,
      isLoggedIn: true,
    };
    // console.log(this.context.store.getState())
    if (this.props.loginSuccess) this.props.loginSuccess();
    // console.log(this.context.store.getState())
  }

  logoutListener(event) {
    if (event.ctrlKey && event.key === 'h') {
      // console.log("running logoutListener")
      alert('Logging you out');
      this.state.logout();
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
      <AppContext.Provider value={{user: this.state.user, logout: this.state.logout}}>
        <div className='App'>
          <Notifications
            displayDrawer={this.props.displayDrawer}
            listNotifications={this.state.listNotifications}
            handleHideDrawer={this.props.hideNotificationDrawer}
            handleDisplayDrawer={this.props.displayNotificationDrawer}
            markNotificationAsRead={this.markNotificationAsRead}
          />
          <Header />
          <div className={`App-body ${css(style.body)}`}>
            {this.state.user.isLoggedIn ?
              <BodySectionWithMarginBottom title='Course list'>
                <CourseList listCourses={listCourses} />
              </BodySectionWithMarginBottom>
              : <BodySectionWithMarginBottom title='Log in to continue'>
                  <Login login={this.login} />
                </BodySectionWithMarginBottom>
            }
            <BodySection title='News from the School'>
              <p>my balognia has a first name...</p>
            </BodySection>
          </div>
          <Footer />
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

function mapDispatchToProps(dispatch) {
  return {
    loginSuccess: () => dispatch(uiActions.loginSuccess()),
    displayNotificationDrawer: () => dispatch(uiActions.displayNotificationDrawer()),
    hideNotificationDrawer: () => dispatch(uiActions.hideNotificationDrawer()),
  }
}

export const ReduxApp = connect(mapStateToProps, mapDispatchToProps, null, { context: AppContext })(App);
