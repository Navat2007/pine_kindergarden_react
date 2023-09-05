import axios from "axios";
import create from 'zustand'

const urlLoadCityClubMeetings = process.env.REACT_APP_BASE_URL + 'php/models/admin/activities/load_city_club_meetings.php';
const urlLoadCityClubMeeting = process.env.REACT_APP_BASE_URL + 'php/models/admin/activities/load_city_club_meeting.php';

const urlAddCityClubMeeting = process.env.REACT_APP_BASE_URL + 'php/models/admin/activities/add_city_club_meeting.php';
const urlEditCityClubMeeting = process.env.REACT_APP_BASE_URL + 'php/models/admin/activities/edit_city_club_meeting.php';
const urlRemoveCityClubMeeting = process.env.REACT_APP_BASE_URL + 'php/models/admin/activities/remove_city_club_meeting.php';

const useActivitiesStore = create(
    (set, get) => ({
        cityClubMeetings: [],
        cityClubMeeting: {},

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
        loadCityClubMeeting: async (params) => {

            set({loading: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlLoadCityClubMeeting, form);

            set({loading: false});

            if(response.data.params){

                set((state) => ({cityClubMeeting: response.data.params}));

            }

        },

        addCityClubMeeting: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlAddCityClubMeeting, form);

            if (response.data) {

                console.log(response.data);

                if (response.data.error === 1) {

                    return {
                        error: true,
                        errorText: response.data.error_text
                    };

                }

            }

            return {error: false};

        },
        editCityClubMeeting: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlEditCityClubMeeting, form);

            if (response.data) {

                console.log(response.data);

                if (response.data.error === 1) {

                    return {
                        error: true,
                        errorText: response.data.error_text
                    };

                }

            }

            return {error: false};

        },
        removeCityClubMeeting: async (params) => {

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlRemoveCityClubMeeting, form);

            if (response.data) {

                console.log(response.data);

                if (response.data.error === 1) {

                    return {
                        error: true,
                        errorText: response.data.error_text
                    };

                }

            }

            return {error: false};

        },
    })
);

export default useActivitiesStore;