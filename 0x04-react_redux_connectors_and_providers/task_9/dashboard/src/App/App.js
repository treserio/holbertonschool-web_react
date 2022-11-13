import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { ReduxCourses } from '../CourseList/CourseList';
import { ReduxFooter } from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications, { ReduxNotes } from '../Notifications/Notifications';
import AppContext from './AppContext';
import { connect, Provider } from 'react-redux';
import * as uiActions from '../actions/uiActionCreators';
import ReduxWrapper from '../HOC/ReduxWrapper';

export default class App extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.logoutListener = this.logoutListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keydown', this.logoutListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keydown', this.logoutListener);
  }

  logoutListener(event) {
    if (event.ctrlKey && event.key === 'h') {
      // console.log("running logoutListener")
      alert('Logging you out');
      this.props.logout();
    }
  };

  render () {
    const style = StyleSheet.create({
      body: {
        padding: '2% 3%',
        height: '480px',
        '@media (max-width: 900px)': {
          display: this.props.displayDrawer ? 'none' : 'block',
        },
      },
    });

    return (
      <AppContext.Provider value={{user: this.props.user, logout: this.props.logout}}>
        <div className='App'>
          <Provider store={this.context.store}>
            {/* {ReduxWrapper({
                wrapped: Notifications,
                displayDrawer: this.props.displayDrawer,
                handleHideDrawer: this.props.hideNotificationDrawer,
                handleDisplayDrawer: this.props.displayNotificationDrawer,
              })
            } */}
            <ReduxWrapper
                wrapped={Notifications}
                displayDrawer={this.props.displayDrawer}
                handleHideDrawer={this.props.hideNotificationDrawer}
                handleDisplayDrawer={this.props.displayNotificationDrawer}
            />
            <Header />
            <div className={`App-body ${css(style.body)}`}>
              {this.props.user.isLoggedIn ?
                <BodySectionWithMarginBottom title='Course list'>
                  <ReduxCourses />
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
    // createAsyncThunk, thunkApi is 2nd param, looks like a store
    loginRequest: (args) => dispatch(uiActions.loginRequest(args)),
    displayNotificationDrawer: () => dispatch(uiActions.displayNotificationDrawer()),
    hideNotificationDrawer: () => dispatch(uiActions.hideNotificationDrawer()),
    logout: () => dispatch(uiActions.logout()),
  }
}

export const ReduxApp = connect(mapStateToProps, mapDispatchToProps, null, { context: AppContext })(App);
