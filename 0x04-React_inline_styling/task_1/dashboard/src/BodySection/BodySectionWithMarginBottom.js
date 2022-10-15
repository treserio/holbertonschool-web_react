import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import { css, StyleSheet } from 'aphrodite';

export default class BodySectionWithMarginBottom extends React.Component {
  render() {
    const style = StyleSheet.create({
      bMargin: {
        marginBottom: '40px',
      },
    });

    return (
      <div className={`BodySectionWithMargin ${css(style.bMargin)}`}>
        <BodySection {...this.props} />
      </div>
    )
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  // children are a built in property, these aren't manually set
}
