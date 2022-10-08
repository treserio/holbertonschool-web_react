import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';

export default class Notifications extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className='menuItem'>Your notifications</div>
        {this.props.displayDrawer &&
        (<div className='Notifications' >
          <p>Here is the list of notifications</p>
          <ul>
            <NotificationItem type='default' value='New course available' />
            <NotificationItem type='urgent' value='New resume available' />
            <NotificationItem type='urgent' html={{ __html: getLatestNotification() }} />
          </ul>
          <button
            style={{
              border: 0,
              background: 'white',
              position: 'absolute',
              right: '25px',
              top: '45px',
            }}
            aria-label="Close"
            onClick={() => console.log('Close button has been clicked')}
          >
            <img src={closeIcon} height="15px" width="15" alt="close icon" />
          </button>
        </div>)}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
}

Notifications.defaultProps = {
  displayDrawer: false,
}
