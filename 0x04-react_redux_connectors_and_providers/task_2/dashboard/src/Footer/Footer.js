import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { css, StyleSheet } from 'aphrodite';
import { connect, useStore } from 'react-redux';

export default function Footer({ user }) {
  // const { logout } = React.useContext(AppContext);
  // const store = useStore();
  // console.log(store.getState());

  const style = StyleSheet.create({
    footer: {
      textAlign: 'center',
      borderTop: 'solid red',
    },
  });

  return (
    <footer className={`App-footer ${css(style.footer)}`}>
      <p>Copyright {getFullYear()} - {getFooterCopy(0)}</p>
      {
        user.isLoggedIn ?
          <p>
            <a href='https://github.com/treserio' rel='noreferrer'>Contact Us</a>
          </p>
        : null
      }
    </footer>
  )
}

// functions for redux connect parameters
export function mapStateToProps(state) {
  return {
    user: state.ui.get('user'),
  };
}

export const ReduxFooter = connect(mapStateToProps, null, null)(Footer);