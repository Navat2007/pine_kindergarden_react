import React from 'react';
import {useNavigate} from "react-router-dom";

import useMenuStore from "../../../store/admin/menuStore";

const MenuPage = () => {
    const navigate = useNavigate();
    const store = useMenuStore();

    React.useEffect(() => {
        const fetchData = async () => {
            //await store.loadAll();
        };

        fetchData();
    }, []);

    console.log(store.items);

    return (
        <>
        </>
    );
};

export default MenuPage;