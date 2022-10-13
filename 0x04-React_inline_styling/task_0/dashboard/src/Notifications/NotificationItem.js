import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ markAsRead, type, value, html, id }) {
  if (value) {
    return ( <li data-priority={type} onClick={() => markAsRead(id)}>{value}</li> );
  }
  return ( <li data-priority={type} dangerouslySetInnerHTML={html} onClick={() => markAsRead(id)}/> );
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  html: PropTypes.shape({ __html: PropTypes.string }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
}

NotificationItem.defaultProps = {
  html: { __html: '' },
  type: 'default',
  value: '',
  markAsRead: (id) => console.log(`Notification ${id} has been marked as read`),
}

export default React.memo(NotificationItem)