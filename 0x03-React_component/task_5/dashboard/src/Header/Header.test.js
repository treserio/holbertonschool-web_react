import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('Header Renders', () => {
  const header = shallow(<Header />);

  it('without crashing', () => {
    assert.equal(header.length, 1);
  });

  it('img and h1 tag', () => {
    assert.equal(header.find('img').length, 1);
    assert.equal(header.find('h1').length, 1);
  });

});
