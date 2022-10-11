import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
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
      this.props.logout();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.logoutListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.logoutListener);
  }



  render () {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <Header />
            <div id='Notifications'>
              <Notifications displayDrawer={true} listNotifications={listNotifications} />
            </div>
          </header>
          <div className='App-body'>
            {this.props.isLoggedIn ? <CourseList listCourses={listCourses} /> : <Login />}
          </div>
          <footer className='App-footer'>
            <Footer />
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  logout: () => {},
};
