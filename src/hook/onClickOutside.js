import { useEffect } from 'react';

const useOnClickOutside = (refs, handler) => {
    useEffect(() => {
        const listener = event => {
            let found = true;

            refs.forEach(ref => {
                if (ref.current && ref.current.contains(event.target)) {
                    found = false;
                }
            })

            if(found)
                handler(event);
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [refs, handler]);
};

export default useOnClickOutside;