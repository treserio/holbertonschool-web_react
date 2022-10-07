import React from 'react';
import './Footer.css';
import { getFullYear, getFooterCopy } from '../utils/utils';


export default function Footer() {
  return (
    <React.Fragment>
      <p>Copyright {getFullYear()} - {getFooterCopy(0)}</p>
    </React.Fragment>
  )
}
