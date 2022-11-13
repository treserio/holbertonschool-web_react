import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as noteActions from '../actions/notificationActionCreators';
import noteSelectors from '../selectors/notificationSelector';

export default function ReduxWrapper({ wrapped, ...props }) {

  // console.log('wrappedProps', props);
  // functions for redux connect parameters
  function mapStateToProps(state) {
    return {
      listNotifications: noteSelectors.getUnreadNotificationsByType(state),
      ...props,
    };
  }

  // binding dispatch to various functions that are sent in as props
  function mapDispatchToProps(dispatch) {
    return {
      fetchNotifications: () => dispatch(noteActions.fetchNotifications()),
      markNotificationAsRead: (args) => dispatch(noteActions.markAsRead(args)),
      setNoteFilter: (args) => dispatch(noteActions.setNotificationFilter(args))
    }
  }

  const ReduxConnected = connect(mapStateToProps, mapDispatchToProps, null)(wrapped);

  return (
    <ReduxConnected />
  )

}

