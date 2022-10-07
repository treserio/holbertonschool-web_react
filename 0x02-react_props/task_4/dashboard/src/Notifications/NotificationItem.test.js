import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';
import { assert } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// unsure why this is needed again, when it's in ../../config/setupTests.js
Enzyme.configure({ adapter: new Adapter() });

describe('NotificationItem component', () => {
  const NI = shallow(<NotificationItem />);
  const typeValue = shallow(<NotificationItem type='default' value='test' />);
  const typeHtml = shallow(<NotificationItem type='urgent' html='<u>test</u>' />);

  it('renders without crashing', () => {
    assert.equal(NI.length, 1);
    assert.equal(typeValue.length, 1);
    assert.equal(typeHtml.length, 1);
  });

  it('renders with correct data properties and html', () => {
    assert.equal(typeValue.props()['data-priority'], 'default');
    assert.equal(typeValue.text(), 'test');
    assert.equal(typeHtml.props()['data-priority'], 'urgent');
    assert.equal(typeHtml.text(), '');
    assert.equal(typeHtml.props().dangerouslySetInnerHTML.__html, '<u>test</u>');
  });
});
