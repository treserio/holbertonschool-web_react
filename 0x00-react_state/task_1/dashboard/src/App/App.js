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

const listCourses = [
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
];

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail  = this.handleChangeEmail.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
    this.logoutListener = this.logoutListener.bind(this);
    this.state = {
      displayDrawer: false,
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
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

  handleLoginSubmit(event) {
    event.preventDefault();
    if (this.state.enableSubmit) {
      this.setState({ isLoggedIn: true });
    }
    else alert('Please enter email and password to proceed')
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
    if (event.target.value && this.state.password) this.state.enableSubmit = true
    else this.state.enableSubmit = false;
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
    if (this.state.email && event.target.value) this.state.enableSubmit = true
    else this.state.enableSubmit = false;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  logoutListener(event) {
    if (event.ctrlKey && event.key === 'h') {
      // console.log("running logoutListener")
      alert('Logging you out');
      this.setState({
        isLoggedIn: false,
        enableSubmit: false,
      });
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.logoutListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.logoutListener);
  }

  render () {
    const style = StyleSheet.create({
      body: {
        padding: '2% 3%',
        height: '480px',
      },
    });

    return (
      <div className='App'>
        <Notifications
          displayDrawer={this.state.displayDrawer}
          listNotifications={listNotifications}
          handleHideDrawer={this.handleHideDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
        />
        <Header />
        <div className={`App-body ${css(style.body)}`}>
          {this.state.isLoggedIn ?
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
            : <BodySectionWithMarginBottom title='Log in to continue'>
                <Login
                  handleLoginSubmit={this.handleLoginSubmit}
                  email={this.state.email}
                  password={this.state.password}
                  handleChangeEmail={this.handleChangeEmail}
                  handleChangePassword={this.handleChangePassword}
                />
              </BodySectionWithMarginBottom>
          }
          <BodySection title='News from the School'>
            <p>my balognia has a first name...</p>
          </BodySection>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: false,
};
