import axios from "axios";
import create from 'zustand'

const urlSendFeedback = process.env.REACT_APP_BASE_URL + 'php/feedback.php';

const useFeedbackStore = create(
    (set, get) => ({
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

        sendFeedback: async (params) => {
            set({sending: true});

            let form = new FormData();
            window.global.buildFormData(form, params);

            const response = await axios.postForm(urlSendFeedback, form);

            set({sending: false});

            //console.log(response.data);
        },
    })
);

export default useFeedbackStore;