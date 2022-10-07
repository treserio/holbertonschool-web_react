import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('Login', () => {
  const login = shallow(<Login />);

  it('renders without crashing', () => {
    assert.equal(login.length, 1);
  });

  it('reders 2 label tags & 3 input tags', () => {
    assert.equal(login.find('label').length, 2);
    assert.equal(login.find('input').length, 3);
  });

});
