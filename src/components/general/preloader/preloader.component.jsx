import "./preloader.scss";

const Preloader = ({ children, loading }) => {
    return (
        <>
            {loading && (
                <div className={"preloader"}>
                    <div className={"preloader__item"}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
            {children}
        </>
    );
};

export default Preloader;
