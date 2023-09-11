import React from "react";
import { useForm } from "react-hook-form";

import useAuthStore from "../../../../store/authStore";
import useTeachersStore from "../../../../store/admin/teachersStore";
import useTheatresStore from "../../../store/user/theatresStore";
import useSchoolStore from "../../../store/user/schoolStore";

import MultiSelect from "../../multi_select/multi_select.component";
import Editor from "../../reach_editor/editor.component";
import Button from "../../button/button.component";
import FieldInput from "../../field/field.input.component";
import Tab from "../../tabs/tab.component";
import Tabs from "../../tabs/tabs.component";
import ImageSelector from "../../image_selector/image.selector.component";
import AlertPopup from "../../../alert.popup/alert.popup";

import noImage from "../../../../images/no_image.png";

import progresStyles from "../../progress-bar/progress-bar.module.scss";
import axios from "axios";
import ImageChange from "../../image_change_block/image.change.component";

function TheatreRequest({
    onSubmitDone = () => null,
    onBack = () => null,
    onDecline = () => null,
    onDelete = () => null,
    request,
    isAdmin,
    sending,
}) {
    const { register, handleSubmit, reset, control, getValues, setValue, watch } = useForm();

    const [popup, setPopup] = React.useState(<></>);
    const [logo, setLogo] = React.useState("");
    const [logoFile, setLogoFile] = React.useState({});
    const [socialLinks, setSocialLinks] = React.useState([]);
    const [photo, setPhoto] = React.useState([]);
    const [photoVisit, setPhotoVisit] = React.useState([]);
    const [video, setVideo] = React.useState([]);
    const [reviews, setReviews] = React.useState([]);
    const [reviewsVisit, setReviewsVisit] = React.useState([]);

    const theatreUrlSchoolWatch = watch("theatreUrlSchool");
    const videoBusinessCardWatch = watch("videoBusinessCard");

    const { user } = useAuthStore();
    const theatreStore = useTheatresStore();
    const teachersStore = useTeachersStore();
    const schoolStore = useSchoolStore();

    React.useEffect(() => {
        if (request) {
            console.log("Заявка на театр: ", request);

            if (request.theatreID !== 0 && (user.role === "admin" || user.role === "superadmin")) {
                if (theatreStore.theatre === null || theatreStore.theatre.ID !== request.theatreID)
                    theatreStore.loadTheatre({ id: request.theatreID });

                console.log("Театр: ", theatreStore.theatre);
            }

            setValue("title", request.title);
            setValue("address", request.address);
            setValue("coordinates", request.coordinates);
            setValue("foundationDate", request.foundation_date);
            setValue("theatreUrlSchool", request.theatre_url_school);
            setValue("videoBusinessCard", request.video_business_card);
            setValue("editorShortDescription", request.short_description);
            setValue("editorDirectorMessage", request.director_message);

            if (request.image !== "") setLogo(request.image);

            let socialLinksArray = request?.social_links?.map((link) => {
                return {
                    id: window.global.makeid(12),
                    url: link,
                    img: window.global.getSocialIcon(link),
                };
            });

            setSocialLinks(socialLinksArray ? socialLinksArray : []);

            setPhoto(request.photo ? request.photo : []);
            setPhotoVisit(request.photoVisit ? request.photoVisit : []);

            let videoLinksArray = request?.video?.map((link) => {
                return { id: window.global.makeid(12), url: link };
            });

            setVideo(videoLinksArray ? videoLinksArray : []);

            setReviews(
                request.reviews
                    ? request.reviews.map((item) => {
                          return {
                              id: window.global.makeid(12),
                              title: item.title,
                              text: item.text,
                          };
                      })
                    : []
            );
            setReviewsVisit(
                request.reviewsVisit
                    ? request.reviewsVisit.map((item) => {
                          return {
                              id: window.global.makeid(12),
                              title: item.title,
                              text: item.text,
                          };
                      })
                    : []
            );
        }
    }, []);

    const handleSocialLink = () => {
        setSocialLinks([...socialLinks, { id: window.global.makeid(12), url: "" }]);
    };

    const handleVideoLink = () => {
        setVideo([...video, { id: window.global.makeid(12), url: "" }]);
    };

    const handleReview = () => {
        setReviews([...reviews, { id: window.global.makeid(12), title: "", text: "" }]);
    };

    const handleReviewVisit = () => {
        setReviewsVisit([...reviewsVisit, { id: window.global.makeid(12), title: "", text: "" }]);
    };

    const handleDeletePhoto = async (item) => {
        let form = new FormData();
        window.global.buildFormData(form, item);

        const response = await axios.postForm(
            process.env.REACT_APP_BASE_URL + "php/models/files/remove_theatre_image.php",
            form
        );
    };

    const handleChangeLogo = async (item) => {
        console.log(item);
        setLogoFile(item);
    };

    const handleDeleteLogo = async () => {
        setLogo("");
        setLogoFile(null);
    };

    const performData = () => {
        const data = getValues();

        let sendObject = { ...data };

        sendObject["schoolID"] = user.schoolID;

        if (logoFile === null) sendObject["logoDelete"] = 1;
        else sendObject["logo"] = logoFile;

        if (data.form_activity_select && data.form_activity_select.length > 0)
            sendObject["formActivity"] = Array.from(data.form_activity_select.map((item) => item.value));

        if (data.age_members_select && data.age_members_select.length > 0)
            sendObject["ageMembers"] = Array.from(data.age_members_select.map((item) => item.value));

        if (data.teachers_select && data.teachers_select.length > 0)
            sendObject["teachers"] = Array.from(data.teachers_select.map((item) => item.value));

        if (socialLinks.length > 0)
            sendObject["socialLinks"] = Array.from(
                socialLinks.filter((link) => link.url !== "").map((link) => link.url)
            );

        if (data.editorShortDescription) sendObject["editorShortDescription"] = data.editorShortDescription;

        if (data.editorDirectorMessage) sendObject["editorDirectorMessage"] = data.editorDirectorMessage;

        sendObject["photo"] = photo;
        sendObject["photoVisit"] = photoVisit;

        if (video.length > 0)
            sendObject["video"] = Array.from(video.filter((link) => link.url !== "").map((link) => link.url));

        if (reviews.length > 0) {
            let tmpArray = Array.from(
                reviews
                    .filter(
                        (review) =>
                            getValues("review_" + review.id) &&
                            getValues("editor_review_" + review.id) !== "<p><br></p>"
                    )
                    .map((review) => {
                        return {
                            title: getValues("review_" + review.id),
                            text: getValues("editor_review_" + review.id),
                        };
                    })
            );

            sendObject["reviews"] = tmpArray.length > 0 ? tmpArray : [];
        }

        if (reviewsVisit.length > 0) {
            let tmpArray = Array.from(
                reviewsVisit
                    .filter(
                        (review) =>
                            getValues("review_visit_" + review.id) &&
                            getValues("editor_review_visit_" + review.id) !== "<p><br></p>"
                    )
                    .map((review) => {
                        return {
                            title: getValues("review_visit_" + review.id),
                            text: getValues("editor_review_visit_" + review.id),
                        };
                    })
            );

            sendObject["reviewsVisit"] = tmpArray.length > 0 ? tmpArray : [];
        }

        //console.log("Подготовленные данные: ", sendObject);

        return sendObject;
    };

    const onSubmit = handleSubmit(async (data) => {
        onSubmitDone(performData());
    });

    const checkPreviousValue = (currentValue, previousValue) => {
        return request && request.theatreID !== 0 && theatreStore.theatre && currentValue !== previousValue;
    };

    const checkPreviousSelectValue = (currentValue, previousValue) => {
        if (request && request.theatreID !== 0 && theatreStore.theatre && currentValue && previousValue) {
            if (previousValue.length === 0) return true;

            if (currentValue.length !== previousValue.length) return true;

            const found = currentValue.some((r) => previousValue.indexOf(r) >= 0);

            if (!found) return true;
        }

        return false;
    };

    const getPreviousValueTooltip = (value) => {
        if (value === undefined || value === "") {
            return <p>Нет предыдущего значения</p>;
        }

        if (Array.isArray(value)) {
            if (value.length === 0) return <p>Предыдущий список пуст</p>;

            return (
                <>
                    <p>Предыдущий список:</p>
                    <br />
                    {value.map((item, index) => (
                        <div key={index}>
                            <span>
                                {index + 1}. {item}
                            </span>
                            <br />
                        </div>
                    ))}
                </>
            );
        }

        return <p>Предыдущее значение: {value}</p>;
    };

    return (
        <>
            <form onSubmit={onSubmit} className='form'>
                <Tabs>
                    <Tab title={"Основные сведения"} extraClass='form__tab form__container --view-two-columns'>
                        <fieldset className='form__section'>
                            <div className='form__multy-block'>
                                <p className='form__label'>Эмблема театра</p>
                                <ImageChange
                                    image={request?.image ? process.env.REACT_APP_BASE_URL + request.image : ""}
                                    onChange={handleChangeLogo}
                                    onDelete={handleDeleteLogo}
                                />
                            </div>
                            <FieldInput
                                hasPreviousValueChanged={checkPreviousValue(
                                    request?.title,
                                    theatreStore?.theatre?.title
                                )}
                                previousValueChangedTooltip={getPreviousValueTooltip(theatreStore?.theatre?.title)}
                                label={"Название театра*"}
                                type='text'
                                layout='flex'
                                required={true}
                                placeholder={"Введите название"}
                                {...register("title")}
                            />
                            <FieldInput
                                hasPreviousValueChanged={checkPreviousValue(
                                    request?.address,
                                    theatreStore?.theatre?.address
                                )}
                                previousValueChangedTooltip={getPreviousValueTooltip(theatreStore?.theatre?.address)}
                                label={"Адрес*"}
                                type='textarea'
                                layout='flex'
                                required={true}
                                placeholder={"Введите адрес*"}
                                {...register("address", {
                                    value: schoolStore?.school?.address,
                                })}
                            />
                            <FieldInput
                                hasPreviousValueChanged={checkPreviousValue(
                                    request?.coordinates,
                                    theatreStore?.theatre?.coordinates
                                )}
                                previousValueChangedTooltip={getPreviousValueTooltip(
                                    theatreStore?.theatre?.coordinates
                                )}
                                label={"Координаты театра"}
                                type='text'
                                layout='flex'
                                placeholder={"Координаты через запятую: 55.760178, 37.618574"}
                                {...register("coordinates")}
                            />
                            <div className='form__multy-block'>
                                <p className='form__label'>Форма осуществления деятельности*</p>
                                <MultiSelect
                                    hasPreviousValueChanged={checkPreviousSelectValue(
                                        request?.form_activity.map((item) => item.activity),
                                        theatreStore?.theatre?.form_activity.map((item) => item.activity)
                                    )}
                                    previousValueChangedTooltip={getPreviousValueTooltip(
                                        theatreStore?.theatre?.form_activity.map((item) => item.activity)
                                    )}
                                    required={true}
                                    control={control}
                                    isMulti={true}
                                    name={"form_activity_select"}
                                    closeMenuOnSelect={false}
                                    values={request?.form_activity?.map((item) => {
                                        return {
                                            label: item.activity,
                                            value: item.activity,
                                        };
                                    })}
                                    options={theatreStore.formActivity.map((item) => {
                                        return {
                                            label: item,
                                            value: item,
                                        };
                                    })}
                                />
                            </div>
                            <div className='form__multy-block'>
                                <p className='form__label'>Возрастной состав участников школьного театра*</p>
                                <MultiSelect
                                    hasPreviousValueChanged={checkPreviousSelectValue(
                                        request?.age_members.map((item) => item.age),
                                        theatreStore?.theatre?.age_members.map((item) => item.age)
                                    )}
                                    previousValueChangedTooltip={getPreviousValueTooltip(
                                        theatreStore?.theatre?.age_members.map((item) => item.age)
                                    )}
                                    required={true}
                                    control={control}
                                    isMulti={true}
                                    name={"age_members_select"}
                                    closeMenuOnSelect={false}
                                    values={request?.age_members?.map((item) => {
                                        return {
                                            label: item.age,
                                            value: item.age,
                                        };
                                    })}
                                    options={theatreStore.ageMembers.map((item) => {
                                        return {
                                            label: item,
                                            value: item,
                                        };
                                    })}
                                />
                            </div>
                            <FieldInput
                                hasPreviousValueChanged={checkPreviousValue(
                                    request?.foundation_date,
                                    theatreStore?.theatre?.foundation_date
                                )}
                                previousValueChangedTooltip={getPreviousValueTooltip(
                                    theatreStore?.theatre?.foundation_date
                                )}
                                label={"Дата основания*"}
                                type='date'
                                layout='flex'
                                required={true}
                                {...register("foundationDate")}
                            />
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Ссылки на соцсети</h2>
                            {socialLinks.map((item) => (
                                <div className='form__group-block' key={item.id}>
                                    {item.img && <span className='form__social-icon'>{item.img}</span>}
                                    <FieldInput
                                        hasPreviousValueChanged={checkPreviousSelectValue(
                                            request?.social_links,
                                            theatreStore?.theatre?.social_links
                                        )}
                                        previousValueChangedTooltip={getPreviousValueTooltip(
                                            theatreStore?.theatre?.social_links
                                        )}
                                        type='text'
                                        extraClass='form__field'
                                        placeholder='Введите url-адрес...'
                                        {...register("social_" + item.id, {
                                            value: item.url,
                                        })}
                                        onChange={(event) => {
                                            setSocialLinks(
                                                socialLinks.map((link) => {
                                                    if (link.id === item.id) {
                                                        link.img = window.global.getSocialIcon(event.target.value);
                                                    }

                                                    return link;
                                                })
                                            );
                                            setValue("social_" + item.id, event.target.value);
                                        }}
                                        onBlur={(event) => {
                                            setSocialLinks(
                                                socialLinks.map((link) => {
                                                    if (link.id === item.id) {
                                                        link.url = event.target.value;
                                                    }

                                                    return link;
                                                })
                                            );
                                            setValue("social_" + item.id, event.target.value);
                                        }}
                                        required={true}
                                    />
                                    {item.img && (
                                        <a
                                            className='form__social-link'
                                            href={item.url.includes("http") ? item.url : "http://" + item.url}
                                            aria-label='Открыть в новой вкладке'
                                            title='Открыть в новой вкладке'
                                            target={"_blank"}
                                            rel='nofollow noreferer noopener'
                                        >
                                            <span className='mdi mdi-open-in-new' />
                                        </a>
                                    )}
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='smaller'
                                        extraClass='form__icon-btn'
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                        onClick={() => {
                                            setSocialLinks(socialLinks.filter((link) => link.id !== item.id));
                                        }}
                                    />
                                </div>
                            ))}
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass='form__icon-btn'
                                iconClass={"mdi mdi-plus"}
                                isIconBtn='true'
                                aria-label='Добавить поле'
                                onClick={handleSocialLink}
                            />
                            <h2 className='form__title'>
                                Ссылка на страницу театра на сайте образовательной организации{" "}
                            </h2>
                            <div className='form__group-block'>
                                <FieldInput
                                    hasPreviousValueChanged={checkPreviousValue(
                                        request?.theatre_url_school,
                                        theatreStore?.theatre?.theatre_url_school
                                    )}
                                    previousValueChangedTooltip={getPreviousValueTooltip(
                                        theatreStore?.theatre?.theatre_url_school
                                    )}
                                    type='url'
                                    extraClass='form__field'
                                    placeholder='Введите url-адрес...'
                                    {...register("theatreUrlSchool")}
                                />
                                {theatreUrlSchoolWatch && theatreUrlSchoolWatch.length > 0 && (
                                    <a
                                        className='form__social-link'
                                        href={
                                            theatreUrlSchoolWatch.includes("http")
                                                ? theatreUrlSchoolWatch
                                                : "http://" + theatreUrlSchoolWatch
                                        }
                                        aria-label='Открыть в новой вкладке'
                                        title='Открыть в новой вкладке'
                                        target={"_blank"}
                                        rel='nofollow noreferer noopener'
                                    >
                                        <span className='mdi mdi-open-in-new' />
                                    </a>
                                )}
                            </div>
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Педагоги</h2>
                            <MultiSelect
                                hasPreviousValueChanged={checkPreviousSelectValue(
                                    request?.teachers.map((item) => item.fio),
                                    theatreStore?.theatre?.teachers.map((item) => item.fio)
                                )}
                                previousValueChangedTooltip={getPreviousValueTooltip(
                                    theatreStore?.theatre?.teachers.map((item) => item.fio)
                                )}
                                control={control}
                                isMulti={true}
                                name={"teachers_select"}
                                closeMenuOnSelect={false}
                                values={request?.teachers?.map((item) => {
                                    return {
                                        label: item.fio,
                                        value: item.ID,
                                    };
                                })}
                                options={teachersStore?.teachers?.map((item) => {
                                    return {
                                        label: `${item.f} ${item.i} ${item.o}`,
                                        value: item.ID,
                                    };
                                })}
                            />
                        </fieldset>
                    </Tab>
                    <Tab title={"Информация о театре"} extraClass='form__tab'>
                        <div className='form__editor-block'>
                            <p className='form__label'>Информация о театре</p>
                            <Editor control={control} name='editorShortDescription' />
                        </div>
                    </Tab>
                    <Tab title={"Обращение режиссёра"} extraClass='form__tab' hidden={true}>
                        <div className='form__editor-block'>
                            <p className='form__label'>Обращение режиссёра</p>
                            <Editor control={control} name='editorDirectorMessage' />
                        </div>
                    </Tab>
                    <Tab title={"Фотографии"} extraClass='form__tab'>
                        <fieldset className='form__section'>
                            <ImageSelector
                                title='Фотографии театра'
                                items={photo}
                                multiFiles={true}
                                onChange={(items) => setPhoto(items)}
                                onError={(text) =>
                                    setPopup(
                                        <AlertPopup
                                            title='Ошибка!'
                                            text={text}
                                            opened={true}
                                            onClose={() => {
                                                setPopup(<></>);
                                            }}
                                        />
                                    )
                                }
                                onDelete={handleDeletePhoto}
                            />
                        </fieldset>
                    </Tab>
                    <Tab title={"Видео"} extraClass='form__tab'>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Видеовизитка школьного театра</h2>
                            <div className='form__group-block'>
                                <FieldInput
                                    hasPreviousValueChanged={checkPreviousValue(
                                        request?.video_business_card,
                                        theatreStore?.theatre?.video_business_card
                                    )}
                                    previousValueChangedTooltip={getPreviousValueTooltip(
                                        theatreStore?.theatre?.video_business_card
                                    )}
                                    label={"Ссылка на видео"}
                                    type='url'
                                    extraClass='form__field'
                                    placeholder='Введите url-адрес...'
                                    layout='flex'
                                    {...register("videoBusinessCard")}
                                />
                                {videoBusinessCardWatch && videoBusinessCardWatch.length > 0 && (
                                    <a
                                        className='form__social-link'
                                        href={
                                            videoBusinessCardWatch.includes("http")
                                                ? videoBusinessCardWatch
                                                : "http://" + videoBusinessCardWatch
                                        }
                                        aria-label='Открыть в новой вкладке'
                                        title='Открыть в новой вкладке'
                                        target={"_blank"}
                                        rel='nofollow noreferer noopener'
                                    >
                                        <span className='mdi mdi-open-in-new' />
                                    </a>
                                )}
                            </div>
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Видео лучших фрагментов спектаклей</h2>
                            {video.map((item) => (
                                <div className='form__group-block' key={item.id}>
                                    <FieldInput
                                        hasPreviousValueChanged={checkPreviousSelectValue(
                                            request?.video,
                                            theatreStore?.theatre?.video
                                        )}
                                        previousValueChangedTooltip={getPreviousValueTooltip(
                                            theatreStore?.theatre?.video
                                        )}
                                        type='text'
                                        extraClass='form__field'
                                        placeholder='Введите url-адрес...'
                                        {...register("video_" + item.id, {
                                            value: item.url,
                                        })}
                                        onBlur={(event) => {
                                            setVideo(
                                                video.map((link) => {
                                                    if (link.id === item.id) {
                                                        link.url = event.target.value;
                                                    }

                                                    return link;
                                                })
                                            );
                                            setValue("video_" + item.id, event.target.value);
                                        }}
                                        required={true}
                                    />
                                    {item.url && (
                                        <a
                                            className='form__social-link'
                                            href={item.url.includes("http") ? item.url : "http://" + item.url}
                                            aria-label='Открыть в новой вкладке'
                                            title='Открыть в новой вкладке'
                                            target={"_blank"}
                                            rel='nofollow noreferer noopener'
                                        >
                                            <span className='mdi mdi-open-in-new' />
                                        </a>
                                    )}
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='smaller'
                                        extraClass='form__icon-btn'
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                        onClick={() => {
                                            setVideo(video.filter((link) => link.id !== item.id));
                                        }}
                                    />
                                </div>
                            ))}
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass='form__icon-btn'
                                iconClass={"mdi mdi-plus"}
                                isIconBtn='true'
                                aria-label='Добавить поле'
                                onClick={handleVideoLink}
                            />
                        </fieldset>
                    </Tab>
                    <Tab hidden={true} title={"Описания (рецензии)"} extraClass='form__tab'>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Рассказ о других школьных театрах</h2>
                            {reviews.map((item) => (
                                <div className='form__group-block' key={item.id}>
                                    <FieldInput
                                        label={"Название театра"}
                                        type='text'
                                        extraClass='form__field'
                                        placeholder='Введите название...'
                                        layout='flex'
                                        {...register("review_" + item.id, {
                                            value: item.title,
                                        })}
                                    />
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='small'
                                        extraClass='form__icon-btn'
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                        onClick={() => {
                                            setReviews(reviews.filter((link) => link.id !== item.id));
                                        }}
                                    />
                                    <div className='form__editor-block'>
                                        <p className='form__label'>Описание посещения театра</p>
                                        <Editor control={control} name={"editor_review_" + item.id} value={item.text} />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass='form__icon-btn'
                                iconClass={"mdi mdi-plus"}
                                isIconBtn='true'
                                aria-label='Добавить поле'
                                onClick={handleReview}
                            />
                        </fieldset>
                        <fieldset className='form__section'>
                            <h2 className='form__title'>Рассказы (рецензии) о посещении других московских театров</h2>
                            {reviewsVisit.map((item) => (
                                <div className='form__group-block' key={item.id}>
                                    <FieldInput
                                        label={"Название театра"}
                                        type='text'
                                        extraClass='form__field'
                                        placeholder='Введите название...'
                                        layout='flex'
                                        {...register("review_visit_" + item.id, { value: item.title })}
                                    />
                                    <Button
                                        type='button'
                                        theme='text'
                                        size='small'
                                        extraClass='form__icon-btn'
                                        iconClass={"mdi mdi-close"}
                                        isIconBtn='true'
                                        aria-label='Удалить поле'
                                        onClick={() => {
                                            setReviewsVisit(reviewsVisit.filter((link) => link.id !== item.id));
                                        }}
                                    />
                                    <div className='form__editor-block'>
                                        <p className='form__label'>Описание посещения театра</p>
                                        <Editor
                                            control={control}
                                            name={"editor_review_visit_" + item.id}
                                            value={item.text}
                                        />
                                    </div>
                                </div>
                            ))}
                            <Button
                                type='button'
                                theme='text'
                                size='small'
                                extraClass='form__icon-btn'
                                iconClass={"mdi mdi-plus"}
                                isIconBtn='true'
                                aria-label='Добавить поле'
                                onClick={handleReviewVisit}
                            />
                        </fieldset>
                    </Tab>
                </Tabs>
                <div className='form__controls'>
                    {isAdmin ? (
                        <>
                            <Button type='submit' theme='primary' text='Принять' spinnerActive={sending} />
                            <Button
                                type='button'
                                theme='primary'
                                text='Отклонить'
                                spinnerActive={sending}
                                onClick={() => {
                                    if (onDecline) onDecline(performData());
                                }}
                            />
                            <Button type='button' theme='text' text='Отмена' spinnerActive={sending} onClick={onBack} />
                        </>
                    ) : (
                        <>
                            <Button
                                type='submit'
                                theme='primary'
                                text='Сохранить страницу театра'
                                spinnerActive={sending}
                            />
                            {request && (
                                <Button
                                    type='button'
                                    theme='text'
                                    text='Удалить'
                                    onClick={onDelete}
                                    spinnerActive={sending}
                                />
                            )}
                            <Button type='button' theme='text' text='Отмена' onClick={onBack} spinnerActive={sending} />
                        </>
                    )}
                </div>
            </form>
            {popup}
        </>
    );
}

export default TheatreRequest;
