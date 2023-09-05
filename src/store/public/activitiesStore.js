import axios from "axios";
import create from 'zustand'

const urlLoadCityClubMeetings = process.env.REACT_APP_BASE_URL + 'php/models/public/activities/load_city_club_meetings.php';

const urlLoadTicket = process.env.REACT_APP_BASE_URL + 'php/models/public/activities/booking/load_by_token.php';
const urlAddTicket = process.env.REACT_APP_BASE_URL + 'php/models/public/activities/booking/add_ticket.php';
const urlBookingCancel = process.env.REACT_APP_BASE_URL + 'php/models/public/activities/booking/cancel_ticket.php';

const cancelTokenSource = axios.CancelToken.source();

const useActivitiesStore = create(
    (set, get) => ({
        cityClubMeetings: [],
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

        loadCityClubMeetings: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadCityClubMeetings, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({cityClubMeetings: response.data.params}));

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
        addTicket: async (params) => {

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

export default useActivitiesStore;