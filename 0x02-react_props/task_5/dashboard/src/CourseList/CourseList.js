import React from 'react';
import PropTypes from 'prop-types';
import './CourseList.css'
import CourseListRow from './CourseListRow';
import CourseShape from './CourseShape';

export default class CourseList extends React.Component {
  render() {
    return (
      <table id='CourseList'>
        <thead>
          <CourseListRow isHeader={true} textFirstCell='Available courses' />
          <CourseListRow isHeader={true} textFirstCell='Course name' textSecondCell="Credit" />
        </thead>
        <tbody>
          {
            this.props.listCourses.length ?
              this.props.listCourses.map((course) =>
                <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} />
              )
            : <CourseListRow isHeader={true} textFirstCell='No course available yet' />
          }
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
  listCourses: [],
};
