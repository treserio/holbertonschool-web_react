import React from 'react';

function Footer() {
  return (
    <footer className='App-footer'>
      <p>Copyright {getFullYear()} - {getFooterCopy(0)}</p>
    </footer>
  )
}

export default Footer;
