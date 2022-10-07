import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('App', () => {
  const app = shallow(<App />);
  const header = app.find('.App-header');
  const body = app.find('.App-body');
  const footer = app.find('.App-footer');
  const notification = app.find('Notifications').render();
  const headerRender = header.find('Header').render();
  const loginRender = body.find('Login').render();
  const footerRender = footer.find('Footer').render();

  it('renders without crashing', () => {
    assert.equal(app.length, 1);
  });

  it('renders the header', () => {
    assert.equal(header.length, 1);
  });

  it('renders the body', () => {
    assert.equal(body.length, 1);
  });

  it('renders the footer', () => {
    assert.equal(footer.length, 1);
  });

  it('confirm children components render correctly', () => {
    assert.equal(notification.length, 1);
    assert.equal(headerRender.length, 2);
    assert.equal(loginRender.length, 2);
    assert.equal(footerRender.length, 1);
  });
});
