import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';
import { actionTypes } from 'redux-form';

 const LoadingComponent = ({inverted = true}) => {
    return (
        <Dimmer inverted={inverted} active={true}>
                <Loader content='Loading....'/>
        </Dimmer>
    )
}

export default LoadingComponent;