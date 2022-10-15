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
      header: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: 'medium solid red',
        borderBottomColor: 'red',
      },
      foot: {
        textAlign: 'center',
        borderTop: 'solid red',
      },
      notes: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        position: 'absolute',
        right: 0,
      }
    });

    return (
      <React.Fragment>
        <div className="App">
          <header className={`App-header ${css(style.header)}`} >
            <Header />
            <div className={css(style.notes)}>
              <Notifications displayDrawer={true} listNotifications={listNotifications} />
            </div>
          </header>
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
          <footer className={`App-footer ${css(style.foot)}`}>
            <Footer />
          </footer>
        </div>
      </React.Fragment>
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
