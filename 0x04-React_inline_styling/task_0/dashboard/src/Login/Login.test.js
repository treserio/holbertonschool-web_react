import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('Login Renders ', () => {
  const login = shallow(<Login />);

  it('without crashing', () => {
    assert.equal(login.length, 1);
  });

  it('label tags x2 & input tags x3', () => {
    assert.equal(login.find('label').length, 2);
    assert.equal(login.find('input').length, 3);
  });

});
