import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

export default class CourseListRow extends React.Component {
  render() {
    const style = StyleSheet.create({
      tr: {
        borderBottom: this.props.isHeader ? '2px solid gray' : null,
        backgroundColor: this.props.isHeader ? '#f5f5f5ab' : '#deb5b545',
        textAlign: this.props.first ? 'center' : 'left',
      }
    });

    if (this.props.isHeader) {
      if (this.props.textSecondCell) {
        return (
          <tr className={css(style.tr)} >
            <th>{this.props.textFirstCell}</th>
            <th>{this.props.textSecondCell}</th>
          </tr>
        );
      } else {
        return ( <tr className={css(style.tr)}><th colSpan="2">{this.props.textFirstCell}</th></tr> );
      }
    } else {
      return (
        <tr className={css(style.tr)} >
          <td>{this.props.textFirstCell}</td>
          <td>{this.props.textSecondCell}</td>
        </tr>
      );
    }
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};
