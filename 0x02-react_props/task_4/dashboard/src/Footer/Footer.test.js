import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { shallow } from 'enzyme';
import chai from 'chai';

chai.use(require('chai-string'));


describe('Footer', () => {
  const footer = shallow(<Footer />);

  it('renders without crashing', () => {
    chai.assert.equal(footer.length, 1);
  });

  it('the text starts with "Copyright"', () => {
    chai.assert.startsWith(footer.find('p').text(), 'Copyright');
  });

});
