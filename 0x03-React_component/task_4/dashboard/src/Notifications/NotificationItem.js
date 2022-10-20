import React from 'react';
import PropTypes from 'prop-types';

export default class NotificationsItem extends React.Component {
  render () {
    if (this.props.value) {
      return ( <li data-priority={this.props.type} onClick={this.props.markAsRead}>{this.props.value}</li> );
    }
    return ( <li data-priority={this.props.type} dangerouslySetInnerHTML={this.props.html} onClick={this.props.markAsRead}/> );
  }
}

NotificationsItem.propTypes = {
  id: PropTypes.number,
  html: PropTypes.shape({ __html: PropTypes.string }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
}

NotificationsItem.defaultProps = {
  html: { __html: '' },
  type: 'default',
  value: '',
  markAsRead: () => console.log(`markAsRead missing`),
}
