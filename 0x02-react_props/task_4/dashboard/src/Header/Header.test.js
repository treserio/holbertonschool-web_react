import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('Header', () => {
  const header = shallow(<Header />);

  it('renders without crashing', () => {
    assert.equal(header.length, 1);
  });

  it('reders an img and h1 tag', () => {
    assert.equal(header.find('img').length, 1);
    assert.equal(header.find('h1').length, 1);
  });

});
