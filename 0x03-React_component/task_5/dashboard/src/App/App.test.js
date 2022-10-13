import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { assert } from 'chai';

global.console.log = jest.fn()

describe('App Renders', () => {
  const logout = jest.fn(() => console.log('logout running'));
  const alert = jest.spyOn(global, 'alert');

  const app = shallow(<App logOut={logout} />);
  const header = app.find('.App-header');
  const body = app.find('.App-body');
  const footer = app.find('.App-footer');
  const notificationsRender = app.find('Notifications').render();
  const headerRender = app.find('Header').render();
  const loginRender = app.find('Login').render();
  const courseListRender = app.find('CourseList');
  const footerRender = app.find('Footer').render();

  it('without crashing', () => {
    assert.equal(app.length, 1);
  });

  it('the header', () => {
    assert.equal(header.length, 1);
  });

  it('the body', () => {
    assert.equal(body.length, 1);
  });

  it('the footer', () => {
    assert.equal(footer.length, 1);
  });

  it('children that render correctly', () => {
    assert.isOk(notificationsRender.hasClass('menuItem'));
    assert.equal(notificationsRender.length, 2);
    assert.equal(headerRender.length, 2);
    assert.equal(loginRender.length, 2);
    assert.equal(footerRender.length, 1);
  });

  it('an alert and calls the function logout when ctrl-h is pressed', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    document.dispatchEvent(new KeyboardEvent("keydown", { ctrlKey: true, key: 'h' }));
    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('Logging you out');
    expect(logout).toHaveBeenCalled();
  });

  it('NOT the CourseList', () => {
    assert.equal(courseListRender.length, 0);
  });
});

describe('Logged in App Renders', () => {
  const app = shallow(<App isLoggedIn={true} />);
  const body = app.find('.App-body');
  const login = body.find('Login');
  const courseListRender = body.find('CourseList').render()[0];

  it('without crashing', () => {
    assert.equal(app.length, 1);
  });

  it('the CourseList', () => {
    assert.equal(courseListRender.name, 'table');
  });

  it('NOT the Login', () => {
    assert.equal(login.length, 0);
  });
});
