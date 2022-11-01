import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext';

chai.use(require('chai-string'));

describe('Footer Renders', () => {

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const footer = shallow(<Footer />);

  it('without crashing', () => {
    chai.assert.equal(footer.length, 1);
  });

  it('"Copyright" within the p element', () => {
    chai.assert.startsWith(footer.find('p').text(), 'Copyright');
  });

  it('without a Contact Us link when user is not logged in', () => {
    chai.assert.equal(footer.find('a').length, 0);
  });

  it('with a "Contact Us" link with correct href when user is logged in', () => {
    const loginFooter = mount(
      <AppContext.Provider value={{
        user: {
          isLoggedIn: true,
        }
      }}>
        <Footer />
      </AppContext.Provider>
    );
    chai.assert.equal(loginFooter.find('a').length, 1);
    chai.assert.equal(loginFooter.find('a').text(), 'Contact Us');
    chai.assert.equal(loginFooter.find('a').props().href, 'https://github.com/treserio');
  });
});
