import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { css, StyleSheet } from 'aphrodite';

export default function Footer() {
  const style = StyleSheet.create({
    footer: {
      textAlign: 'center',
      borderTop: 'solid red',
    },
  });

  return (
    <footer className={`App-footer ${css(style.footer)}`}>
      <p>Copyright {getFullYear()} - {getFooterCopy(0)}</p>
    </footer>
  )
}
