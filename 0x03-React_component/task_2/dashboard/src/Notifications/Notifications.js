import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-icon.png';
import NotificationItemShape from './NotificationItemShape'

export default class Notifications extends React.Component {
  markAsRead = (id) => console.log(`Notification ${id} has been marked as read`);

  render () {
    return (
      <React.Fragment>
        <div className='menuItem'>Your notifications</div>
        {this.props.displayDrawer &&
          <div className='Notifications' >
            {this.props.listNotifications.length ?
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul>
                  {this.props.listNotifications.map((note) =>
                    note.html ?
                      <NotificationItem key={note.id} id={note.id} type={note.type} html={note.html} markAsRead={() => this.markAsRead(note.id)} />
                    : <NotificationItem key={note.id} id={note.id} type={note.type} value={note.value} markAsRead={() => this.markAsRead(note.id)} />
                  )}
                </ul>
              </React.Fragment>
              : <p>No new notification for now</p>
            }
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
          </div>
        }
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: []
}
