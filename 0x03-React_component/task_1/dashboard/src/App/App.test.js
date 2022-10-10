import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('App Renders', () => {
  const logout = jest.fn();
  const app = shallow(<App logout={() => {}} />);
  const header = app.find('.App-header');
  const body = app.find('.App-body');
  const footer = app.find('.App-footer');
  const notificationsRender = app.find('Notifications').render();
  const headerRender = app.find('Header').render();
  const loginRender = app.find('Login').render();
  const courseListRender = app.find('CourseList');
  const footerRender = app.find('Footer').render();

  const alert = jest.spyOn(global, 'alert');

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

  console.log(app.props())
  console.log(app.props().children.props.children)
  console.log(app.instance())
  console.log(app.instance().props.logout)


  it('an alert and calls the function logout when ctrl-h is pressed', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    console.log(app.instance().props.logout)
    const thing = jest.spyOn(app.instance().props.logout);
    app.instance().props.logout({ ctrlKey: true, key: 'h' });
    expect(thing).toHaveBeenCalled();
    expect(alert).toHaveBeenCalled();
    app.simulate("keydown", { ctrlKey: true, key: 'h' });
    expect(logout).toHaveBeenCalled();
    expect(alert).toHaveBeenCalled();
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
