import styles from './preloader.module.scss';

const Preloader = ({children, loading}) => {

    return (
        <>
            {
                loading
                &&
                <div className={styles.preloader}>
                    <div className={styles.preloader__item}>
                        <div></div><div></div><div></div><div></div>
                    </div>
                </div>
            }
            {children}
        </>
    );
};

export default Preloader;

