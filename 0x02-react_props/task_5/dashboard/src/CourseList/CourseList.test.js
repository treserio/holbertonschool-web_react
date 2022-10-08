import React from 'react';
import CourseList from './CourseList';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('CourseList Renders', () => {
  const courseList = shallow(<CourseList />);

  it('without crashing', () => {
    assert.equal(courseList.length, 1);
  });

  it('the expected 5 CourseListRow elements', () => {
    assert.equal(courseList.find('CourseListRow').length, 5);
  });
});
