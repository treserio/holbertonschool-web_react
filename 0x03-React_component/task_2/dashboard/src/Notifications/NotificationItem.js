import React from 'react';
import PropTypes from 'prop-types';

export default function NotificationsItem({type, html, value}) {
  if (value) {
    return ( <li data-priority={type}>{value}</li> );
  }
  return ( <li data-priority={type} dangerouslySetInnerHTML={html} /> );
}

NotificationsItem.propTypes = {
  html: PropTypes.shape({ __html: PropTypes.string }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

NotificationsItem.defaultProps = {
  html: { __html: '' },
  type: 'default',
  value: '',
}
