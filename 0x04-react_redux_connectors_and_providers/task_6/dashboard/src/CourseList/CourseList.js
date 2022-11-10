import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';
import CourseListRow, { ReduxCourseRow } from './CourseListRow';
// import CourseShape from './CourseShape';
import { connect } from 'react-redux';
import * as courseActions from '../actions/courseActionCreators';
import courseSelectors from '../selectors/courseSelector';
import { List } from 'immutable';

export default class CourseList extends React.Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    const style = StyleSheet.create({
      table: {
        border: '1px solid gray',
        width: '100%',
        borderCollapse: 'collapse',
      },
    });

    return (
      <table className={css(style.table)}>
        <thead>
          <ReduxCourseRow
            first={true}
            isHeader={true}
            textFirstCell='Available courses'
          />
          <ReduxCourseRow
            isHeader={true}
            textFirstCell='Course name'
            textSecondCell="Credit"
          />
        </thead>
        <tbody>
          {this.props.listCourses.size ?
              this.props.listCourses.map((course) =>
                <ReduxCourseRow
                  key={course.id}
                  id={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                  isSelected={course.isSelected}
                />
              )
            : <ReduxCourseRow
                isHeader={true}
                textFirstCell='No course available yet'
              />
          }
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  listCourses: PropTypes.instanceOf(List),
};

CourseList.defaultProps = {
  listCourses: List([]),
};

// functions for redux connect parameters
export function mapStateToProps(state) {
  return {
    listCourses: courseSelectors.getCourses(state),
  };
}

// binding dispatch to various functions that are sent in as props
function mapDispatchToProps(dispatch) {
  return {
    fetchCourses: () => dispatch(courseActions.fetchCourses()),
    selectCourse: (args) => dispatch(courseActions.selectCourse(args)),
    unSelectCourse: (args) => dispatch(courseActions.unSelectCourse(args)),
  }
}

export const ReduxCourses = connect(mapStateToProps, mapDispatchToProps, null)(CourseList);
