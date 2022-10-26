import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('BodySection Renders', () => {
  const BS = shallow(
    <BodySection title="test title">
      <p>test child</p>
    </BodySection>
  );
  
  it('without crashing', () => {
    expect(BS.length).toBe(1);
  });

  it('with correct children', () => {
    expect(BS.children().length).toBe(2);
    expect(BS.find('h2').length).toBe(1);
    expect(BS.find('h2').text()).toBe('test title');
    expect(BS.find('p').length).toBe(1);
    expect(BS.find('p').text()).toBe('test child');
  });
});