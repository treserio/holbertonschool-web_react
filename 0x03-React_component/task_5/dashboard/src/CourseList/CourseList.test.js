import React from 'react';
import CourseList from './CourseList';
import { shallow } from 'enzyme';
import { assert } from 'chai';

const listCourses = [
  { id: '1', name: 'Test 1', credit: 10 },
  { id: '2', name: 'Test 2', credit: 20 },
  { id: '3', name: 'Test 3', credit: 30 },
];

describe('CourseList Renders', () => {
  const courseList = shallow(<CourseList />);
  const rows = courseList.find('CourseListRow');

  const listCoursesCL = shallow(<CourseList listCourses={listCourses} />);
  const listCoursesR = listCoursesCL.find('CourseListRow');

  it('without crashing', () => {
    assert.equal(courseList.length, 1);
    assert.equal(listCoursesCL.length, 1);
  });

  it('with listCourses: 5 rows with array of 3', () => {
    assert.equal(listCoursesR.length, 5);
  });

  it('with listCourses: correct text in rows', () => {
    assert.equal(listCoursesR.at(2).render().find('td').first().text(), 'Test 1');
    assert.equal(listCoursesR.at(2).render().find('td').last().text(), 10);
    assert.equal(listCoursesR.at(3).render().find('td').first().text(), 'Test 2');
    assert.equal(listCoursesR.at(3).render().find('td').last().text(), 20);
    assert.equal(listCoursesR.at(4).render().find('td').first().text(), 'Test 3');
    assert.equal(listCoursesR.at(4).render().find('td').last().text(), 30);
  });

  it('Not listCourses: 3 rows', () => {
    assert.equal(rows.length, 3);
  });

  it('Not listCourses: correct text in the last row', () => {
    assert.equal(rows.last().render().find('th').text(), 'No course available yet');
  });
});
