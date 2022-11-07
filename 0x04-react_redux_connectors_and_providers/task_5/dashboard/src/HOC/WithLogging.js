import React from 'react';
import PropTypes from 'prop-types';

export default function WithLogging({Wrapped}) {
  // console.log(Wrapped)
  // console.log(Wrapped.props)
  const wrappedName = Wrapped.type.name ? Wrapped.type.name
  : Wrapped.type.displayName ? Wrapped.type.displayName
  : 'Component';

  class BuildWithLogging extends React.Component {
    static displayName = `withLogging(${wrappedName})`;

    componentDidMount() {
      console.log(`Component ${wrappedName} is mounted`);
    }
  
    componentWillUnmount() {
      console.log(`Component ${wrappedName} is going to unmount`);
    }
  
    render() {
      // console.log('in class render', Wrapped.props)
      return ( Wrapped )
    }
  }
  // console.log(BuildWithLogging.displayName)
  return < BuildWithLogging />;
}

WithLogging.propTypes = {
  Wrapped: PropTypes.node,
}

WithLogging.defaultProps = {
  Wrapped: <div name="bonkers">wtf</div>,
}