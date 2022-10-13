import React from 'react';
import CourseListRow from './CourseListRow';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('CourseListRow Renders', () => {
  const colSpan2 = shallow(<CourseListRow isHeader={true} textFirstCell='colSpan=2' />);
  const th2 = shallow(<CourseListRow isHeader={true} textFirstCell='First th' textSecondCell='Second th' />);
  const td2 = shallow(<CourseListRow textFirstCell='First td' textSecondCell='Second td' />);

  it('without crashing', () => {
    assert.equal(colSpan2.length, 1);
    assert.equal(th2.length, 1);
    assert.equal(td2.length, 1);
  });

  it('colSpan=2 th when isHeader=true & textSecondCell=null', () => {
    assert.equal(colSpan2.children().length, 1)
    assert.equal(th2.children().first().type(), 'th');
  });

  it('th x2 when isHeader=true & textSecondCell != null', () => {
    assert.equal(th2.children().length, 2);
    assert.equal(th2.children().first().type(), 'th');
  });

  it('td x2 when isHeader=true & textSecondCell != null', () => {
    assert.equal(td2.children().length, 2);
    assert.equal(td2.children().first().type(), 'td');
  });
})

