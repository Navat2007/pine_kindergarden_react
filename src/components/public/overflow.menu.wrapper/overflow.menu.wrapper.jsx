import React from 'react';
import classNames from "classnames";
import {makeStyles} from "@material-ui/core";

const useIntersectionStyles = makeStyles(() => ({
    visible: {
        order: 0,
        visibility: "visible",
        opacity: 1
    },
    inVisible: {
        order: 100,
        visibility: "hidden",
        pointerEvents: "none"
    },
    toolbarWrapper: {
        display: "flex",
        overflow: "hidden",
        padding: "0 20px",
        width: "75%"
    },
    overflowStyle: {
        order: 99,
        position: "sticky",
        right: "0",
        backgroundColor: "white"
    }
}));

const OverflowMenuWrapper = ({children}) => {
    const classes = useIntersectionStyles();
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
                    className: classNames(child.props.className, {
                        [classes.visible]: !!visibilityMap[child.props["data-targetid"]],
                        [classes.inVisible]: !visibilityMap[child.props["data-targetid"]]
                    })
                });
            })}
        </ul>
    );
};

export default OverflowMenuWrapper;