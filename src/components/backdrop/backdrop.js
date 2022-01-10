import React from 'react';
import './backdrop.scss';

const backdrop = props => <div className={`backdrop`} onClick={props.backdropClickHandler}></div>

export default backdrop;