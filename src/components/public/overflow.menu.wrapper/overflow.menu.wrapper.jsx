import React from 'react';
import classNames from "classnames";

const OverflowMenuWrapper = ({children}) => {
    const navRef = React.useRef(null);
    const [visibilityMap, setVisibilityMap] = React.useState({});

    const handleIntersection = (entries) => {
        const updatedEntries = {};

        entries.forEach((entry) => {
            updatedEntries[entry.target.dataset.targetid] = entry.isIntersecting;
        });

        setVisibilityMap((prev) => ({
            ...prev,
            ...updatedEntries
        }));

        console.log(visibilityMap);
    }

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            handleIntersection,
            {
                root: navRef.current,
                threshold: 1
            }
        );

        Array.from(navRef.current.children).forEach((item) => {
            if (item.dataset.targetid) {
                observer.observe(item);
            }
        });

        return () => {
            observer.disconnect();
        }
    }, []);

    return (
        <ul className={`menu__list`} ref={navRef}>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    className: classNames(child.props.className)
                });
            })}
        </ul>
    );
};

export default OverflowMenuWrapper;