import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { shallow } from 'enzyme';
import chai from 'chai';

chai.use(require('chai-string'));


describe('Footer Renders', () => {
  const footer = shallow(<Footer />);

  it('without crashing', () => {
    chai.assert.equal(footer.length, 1);
  });

  it('"Copyright" within the p element', () => {
    chai.assert.startsWith(footer.find('p').text(), 'Copyright');
  });

});
