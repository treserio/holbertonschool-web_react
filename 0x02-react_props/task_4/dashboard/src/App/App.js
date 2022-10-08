import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CourseList from '../CourseList/CourseList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';

export default class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <Header />
            <div id='Notifications'>
              <Notifications />
            </div>
          </header>
          <div className='App-body'>
            {this.props.isLoggedIn ? <CourseList /> : <Login />}
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
}

App.defaultProps = {
  isLoggedIn: false,
}
