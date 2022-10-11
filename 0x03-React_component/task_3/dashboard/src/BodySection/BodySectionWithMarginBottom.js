import React from 'react';
import PropTypes from 'prop-types';

export default class BodySectionWithMarginBottom extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className='bodySection'>
          <h2>{this.props.title}</h2>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
}