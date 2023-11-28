import React from "react";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import moment from "moment";
import axios from "axios";
import {PopUpContext} from "./context";

import {getMenuList} from "./services/menu";
import {SetUser, Logout} from "./services/user";

import Preloader from "./components/public/preloader/preloader.component";
import RoutesList from "./components/routes.list.component";
import ToTopButton from "./components/general/to.top.button/to.top.button.component";

import "./styles/globals.css";

const App = () => {
    const [loading, setLoading] = React.useState(true);
    const [popup, setPopup] = React.useState(<></>);

    const fetchData = async () => {
        const user = window.localStorage.getItem("user");

        axios.interceptors.response.use(
            (response) => {
                const version = parseInt(window.localStorage.getItem("version"));

                fetch(window.global.baseUrl + "php/check_version.php", {
                    method: "POST",
                    body: new FormData(),
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then((result) => {
                        window.localStorage.setItem("version", result.params);

                        if (version && version !== result.params) {
                            if ("URL" in window) {
                                const url = new URL(window.location.href);
                                url.searchParams.set("reloadTime", Date.now().toString());
                                window.location.href = url.toString();
                            } else {
                                window.location.href =
                                    window.location.origin +
                                    window.location.pathname +
                                    window.location.search +
                                    (window.location.search ? "&" : "?") +
                                    "reloadTime=" +
                                    Date.now().toString() +
                                    window.location.hash;
                            }
                        }

                        if (window.location.href.includes("?reloadTime")) {
                            const url = new URL(window.location.href);
                            url.searchParams.delete("reloadTime");
                            window.location.href = url.toString();
                        }
                    });

                if (response?.data?.error === 3) {
                    Logout();
                }

                return response;
            },
            (error) => {
                return Promise.reject(error.message);
            }
        );

        if (user) {
            let expireDate = moment(JSON.parse(user).tokenDate, "DD.MM.YYYY").add(1, "months");

            if (expireDate.isAfter(moment())) {
                SetUser(JSON.parse(user));
            } else Logout();
        }

        await getMenuList();

        setLoading(false);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const queryClient = React.useMemo(() => new QueryClient(), []);

    return (
        <QueryClientProvider client={queryClient}>
            <PopUpContext.Provider value={{popup, setPopup}}>
                {
                    loading
                        ?
                        <Preloader loading={true}/>
                        :
                        <BrowserRouter>
                            <RoutesList/>
                            <ToTopButton/>
                        </BrowserRouter>
                }
                {popup}
            </PopUpContext.Provider>
        </QueryClientProvider>
    );
};

export default App;
