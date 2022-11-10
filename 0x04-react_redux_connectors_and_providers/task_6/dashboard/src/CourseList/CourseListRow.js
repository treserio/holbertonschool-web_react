import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import * as courseActions from '../actions/courseActionCreators';

export default class CourseListRow extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.toggleChecked = this.toggleChecked.bind(this);
  //   this.state = {
  //     checked: false,
  //   }
  // }

  // toggleChecked() {
  //   if (this.state.checked) this.setState({checked: false})
  //   else this.setState({checked: true});
  // }

  onChangeRow(index, selected) {
    selected ? this.props.unSelectCourse({ index }) : this.props.selectCourse({ index })
  }

  render() {
    const style = StyleSheet.create({
      tr: {
        borderBottom: this.props.isHeader ? '2px solid gray' : null,
        backgroundColor: this.props.isHeader ? '#f5f5f5ab' : '#deb5b545',
        textAlign: this.props.first ? 'center' : 'left',
      },
      rowChecked: {
        backgroundColor: '#e6e4e4',
      },
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
        <tr className={`${css(style.tr)} ${this.props.isSelected ? css(style.rowChecked) : null}`} >
          <td>
            <label htmlFor={`course${this.props.id}`} >
              <input id={`course${this.props.id}`} type='checkbox' onChange={() => this.onChangeRow(this.props.id, this.props.isSelected)} />
              {this.props.textFirstCell}
            </label>
          </td>
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

// binding dispatch to various functions that are sent in as props
function mapDispatchToProps(dispatch) {
  return {
    selectCourse: (args) => dispatch(courseActions.selectCourse(args)),
    unSelectCourse: (args) => dispatch(courseActions.unSelectCourse(args)),
  }
}

export const ReduxCourseRow = connect(null, mapDispatchToProps, null)(CourseListRow);
