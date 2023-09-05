import axios from "axios";
import create from 'zustand'

const urlLoadSpectacles = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/load.php';
const urlLoadLastSpectacles = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/load_last.php';
const urlLoadLastSpectaclesWithTickets = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/load_with_tickets.php';
const urlLoadSpectaclesByTheatre = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/load_by_theatre.php';
const urlLoadSpectacle = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/load_by_id.php';

const urlLoadTicket = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/booking/load_by_token.php';
const urlAddTicket = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/add_ticket.php';
const urlBookingCancel = process.env.REACT_APP_BASE_URL + 'php/models/public/spectacles/booking/cancel_ticket.php';

const cancelTokenSource = axios.CancelToken.source();

const useSpectaclesStore = create(
    (set, get) => ({
        spectacles: [],
        lastSpectacles: [],
        lastSpectaclesWithTickets: [],
        theatreSpectacles: [],
        spectacle: {},
        ticket: {},

        loading: false,
        sending: false,

        error: false,
        errorText: "",
        setErrorText: (text) => {
            set({error: true, errorText: text});
        },
        clearErrorText: () => {
            set({error: false, errorText: ""});
        },

        loadSpectacles: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectacles, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({spectacles: response.data.params}));

            }

        },
        loadLastSpectacles: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadLastSpectacles, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({lastSpectacles: response.data.params}));

            }

        },
        loadLastSpectaclesWithTickets: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadLastSpectaclesWithTickets, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({lastSpectaclesWithTickets: response.data.params}));

            }

        },
        loadSpectaclesByTheatre: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectaclesByTheatre, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({theatreSpectacles: response.data.params}));

            }

        },
        loadSpectacle: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadSpectacle, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({spectacle: response.data.params}));

            }

        },

        loadTicket: async (params) => {

            //cancelTokenSource.cancel();

            set({loading: true, ticket: {}});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadTicket, form, {
                cancelToken: cancelTokenSource.token
            });

            set({loading: false});

            if(response.data.params){

                set((state) => ({ticket: response.data.params}));

            }

        },
        sendTicketsRequest: async (params) => {

            //set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAddTicket, form);

            //set({sending: false});

            if(response.data.params){

                console.log(response.data);
                if(response.data.error === 1)
                {
                    return {
                        error: true,
                        errorText: response.data.error_text
                    }
                }

            }

            return {
                error: false,
                errorText: ""
            };

        },
        sendBookingCancel: async (params) => {

            //set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlBookingCancel, form);

            //set({sending: false});

            if(response.data.params){

                console.log(response.data);
                if(response.data.error === 1)
                {
                    return {
                        error: true,
                        errorText: response.data.error_text
                    }
                }

            }

            return {
                error: false,
                errorText: ""
            };

        },
    })
);

export default useSpectaclesStore;