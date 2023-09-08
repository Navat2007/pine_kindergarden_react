import React from 'react';
import TrackVisibility from "react-on-screen";

const TrackComponent = ({ isVisible, children, extraClassName}) => {
    return (
        <li className={`${extraClassName} main-section${isVisible ? ' main-section_showed' : ''}`}>
            {children}
        </li>
    )
}

const VisibilityTrackComponent = ({ children, extraClassName}) => {
    return (
        <TrackVisibility>
            <TrackComponent extraClassName={extraClassName}>
                {children}
            </TrackComponent>
        </TrackVisibility>
    );
};

export default VisibilityTrackComponent;