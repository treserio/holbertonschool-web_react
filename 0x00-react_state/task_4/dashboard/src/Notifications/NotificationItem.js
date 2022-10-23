import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

function NotificationItem({ markNotificationAsRead, type, value, html, id }) {
  const style = StyleSheet.create({
    li: {
      color: type === 'urgent' ? 'red' : 'blue',
      fontWeight: 'bold',
      '@media (max-width: 900px)': {
        borderBottom: '1px solid black',
        padding: '10px 8px',
        listStyle: 'none',
        fontSize: '20px',
      }
    },
  });

  if (value) {
    return  <li
              className={css(style.li)}
              data-priority={type}
              onClick={() => markNotificationAsRead(id)}
            >{value}</li>;
  }
  return <li
          className={css(style.li)}
          data-priority={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markNotificationAsRead(id)}
         />;
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  html: PropTypes.shape({ __html: PropTypes.string }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markNotificationAsRead: PropTypes.func,
}

NotificationItem.defaultProps = {
  html: { __html: '' },
  type: 'default',
  value: '',
  markNotificationAsRead: (id) => console.log(`Notification ${id} has been marked as read`),
}

export default React.memo(NotificationItem)
