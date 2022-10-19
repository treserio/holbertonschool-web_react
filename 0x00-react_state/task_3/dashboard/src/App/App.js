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

const listCourses = [
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
];

export default class App extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logoutListener = this.logoutListener.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      displayDrawer: false,
      user: AppContext._currentValue.user,
      logout: AppContext._currentValue.logout,
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ],
    };
  }

  handleDisplayDrawer() {
    document.getElementsByClassName('menuItem')[0].style.display = 'none';
    this.setState({ displayDrawer: true });
    // console.log(document.documentElement.clientWidth)
    if (document.documentElement.clientWidth <= 900) {
      document.getElementsByClassName('App-body')[0].style.display = 'none';
    }
  }

  handleHideDrawer() {
    document.getElementsByClassName('menuItem')[0].style.display = 'block';
    document.getElementsByClassName('App-body')[0].style.display = 'block';
    this.setState({ displayDrawer: false });
  }

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
  }

  logoutListener(event) {
    if (event.ctrlKey && event.key === 'h') {
      // console.log("running logoutListener")
      alert('Logging you out');
      this.setState({
        user: {
          email: '',
          password: '',
          isLoggedIn: false,
        }
      });
      this.context.user = {
        email: '',
        password: '',
        isLoggedIn: false,
      };
      this.state.logout();
    }
  };

  markNotificationAsRead(id) {
    console.log('right note func');
    let ln = this.state.listNotifications
    this.setState({
      listNotifications: ln.filter((note) => note.id !== id),
    });
    setTimeout(() => console.log(this.state.listNotifications), 10);
  };

  render () {
    const style = StyleSheet.create({
      body: {
        padding: '2% 3%',
        height: '480px',
      },
    });

    return (
      <AppContext.Provider value={{user: this.state.user, logout: this.state.logout}}>
        <div className='App'>
          <Notifications
            displayDrawer={this.state.displayDrawer}
            listNotifications={this.state.listNotifications}
            handleHideDrawer={this.handleHideDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
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
