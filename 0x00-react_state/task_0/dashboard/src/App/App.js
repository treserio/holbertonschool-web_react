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
    this.state = {
      displayDrawer: false,
    };
  }

  handleDisplayDrawer() {
    document.getElementsByClassName('menuItem')[0].style.display = 'none';
    this.setState({ displayDrawer: true });
    console.log(document.documentElement.clientWidth)
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
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  logoutListener = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      // console.log("running logoutListener")
      alert('Logging you out');
      this.props.logOut();
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
          {this.props.isLoggedIn ?
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
            : <BodySectionWithMarginBottom title='Log in to continue'>
                <Login />
              </BodySectionWithMarginBottom>
          }
          <BodySection title='News from the School'>
            <p>my balognia has a first name...</p>
            < WithLogging Wrapped={<Login />} />
          </BodySection>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {},
};
