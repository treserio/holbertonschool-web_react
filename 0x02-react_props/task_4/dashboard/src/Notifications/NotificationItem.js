import React from 'react';

export default function NotificationsItem({type, html, value}) {
  if (value) {
    return ( <li data-priority={type}>{value}</li> );
  }
  return ( <li data-priority={type} dangerouslySetInnerHTML={{__html: html }} /> );
}
