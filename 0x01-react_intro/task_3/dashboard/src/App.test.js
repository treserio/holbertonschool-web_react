import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { shallow } from 'enzyme';
import { assert } from 'chai';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOMClient.createRoot(div);
    root.render(<App />);
  });

  it('renders the right header', () => {
    const wrapper = shallow(<App />);
    const header = wrapper.find('.App-header');
    assert.equal(header.length, 1);
  });

  it('renders the right body', () => {
    const wrapper = shallow(<App />);
    const body = wrapper.find('.App-body');
    assert.equal(body.length, 1);
  });

  it('renders the right footer', () => {
    const wrapper = shallow(<App />);
    const footer = wrapper.find('.App-footer');
    assert.equal(footer.length, 1);
  });
});
