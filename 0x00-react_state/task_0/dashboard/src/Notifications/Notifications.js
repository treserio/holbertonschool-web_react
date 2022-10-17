import React from 'react';
import PropTypes from 'prop-types';
// import './Notifications.css';
import { css, StyleSheet } from 'aphrodite';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-icon.png';
import NotificationItemShape from './NotificationItemShape'

export default class Notifications extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.displayDrawer !== nextProps.displayDrawer ? true :
      nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  render () {
    // bouce animation
    const bounce = {  '0%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-5px)' }, '100%': { transform: 'translateY(5px)' },};
    // opacity animation
    const fade = {  from: { opacity: 0.5 }, to: { opacity: 1 } };
    // css styles
    const style = StyleSheet.create({
      close_btn: {
        border: 0,
        background: 'white',
        position: 'absolute',
        right: '25px',
        top: '45px',
        '@media (max-width: 900px)': {
          top: '20px',
        }
      },
      menuItem: {
        position: 'fixed',
        marginRight: '1rem',
        backgroundColor: '#fff8f8',
        whiteSpace: 'nowrap',
        '@media (max-width: 900px)': {
          display: 'none',
        },
        ':hover': {
          cursor: 'pointer',
          animationName: [bounce, fade],
          animationDuration: '0.5s, 1s',
          animationIterationCount: 3,
        },
      },
      noteBox: {
        border: '1px red dashed',
        padding: '1rem',
        margin: '2rem 1rem',
        '@media (max-width: 900px)': {
          border: 'none',
          padding: 0,
          margin: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
        },
      },
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        position: 'absolute',
        padding: 0,
        margin: 0,
        right: 0,
        '@media (max-width: 900px)': {
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
        },
      },
      ul: {
        '@media (max-width: 900px)': {
          margin: 0,
          padding: 0,
        },
      }
    });

    return (
      <div className={css(style.wrapper)}>
        <div onClick={this.props.handleDisplayDrawer} className={`menuItem ${css(style.menuItem)}`}>Your notifications</div>
        {this.props.displayDrawer &&
          <div className={`Notifications ${css(style.noteBox)}`} >
            {this.props.listNotifications.length ?
              <React.Fragment>
                <p>Here is the list of notifications</p>
                <ul className={css(style.ul)}>
                  {this.props.listNotifications.map((note) =>
                    note.html ?
                      <NotificationItem key={note.id} id={note.id} type={note.type} html={note.html} />
                    : <NotificationItem key={note.id} id={note.id} type={note.type} value={note.value} />
                  )}
                </ul>
              </React.Fragment>
              : <p>No new notification for now</p>
            }
            <button
              className={css(style.close_btn)}
              aria-label="Close"
              onClick={this.props.handleHideDrawer}
            >
              <img src={closeIcon} height="15px" width="15" alt="close icon" />
            </button>
          </div>
        }
      </div>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleHideDrawer: PropTypes.func,
  handleDisplayDrawer: PropTypes.func,
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleHideDrawer: () => console.log('handleHideDrawer missing'),
  handleDisplayDrawer: () => console.log('handleDisplayDrawer missing'),
}
