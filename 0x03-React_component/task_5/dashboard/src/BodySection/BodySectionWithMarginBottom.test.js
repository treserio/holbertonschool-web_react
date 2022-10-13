import React from 'react';
import ReactDOM from 'react-dom';
import {  mount } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom Renders', () => {
  const BSMargin = mount(
    <BodySectionWithMarginBottom title="test title">
      <p>test child</p>
    </BodySectionWithMarginBottom>
  )
  const bodySection = BSMargin.find('.bodySection');
  const h2 = BSMargin.find('h2');
  const p = BSMargin.find('p');

  it('without crashing', () => {
    expect(BSMargin.length).toBe(1);
  });

  it('with correct CSS class', () => {
    expect(BSMargin.find('.bodySectionWithMargin').length).toBe(1);
  });

  it('with correct children', () => {
    expect(bodySection.length).toBe(1);
    expect(bodySection.children().length).toBe(2);
    expect(h2.length).toBe(1);
    expect(h2.text()).toBe('test title');
    expect(p.length).toBe(1);
    expect(p.text()).toBe('test child');
  });

});