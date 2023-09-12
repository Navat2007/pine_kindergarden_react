import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { useForm } from "react-hook-form";
import moment from "moment";

import useNewsStore from "../../../store/admin/newsStore";

import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import FieldInput from "../../../components/general/field/field.input.component";
import Editor from "../../../components/general/reach_editor/editor.component";
import ImageSelector from "../../../components/general/image_selector/image.selector.component";
import ImageGallery from "../../../components/general/image_gallery/image.gallery.component";

import commonStyles from "../../common.module.scss";
import styles from "../../../components/general/page_components/theatre/theatre.module.scss";

import { AdminIcons } from "../../../components/svgs";
import TitleBlock from "../../../components/admin/title.block.component";

const AdminNewsPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const newsStore = useNewsStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await newsStore.loadNews({ id });
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/news");

    //Private component
    const Loading = () => {
        if (newsStore.loading) {
            return (
                <TitleBlock title={`Загрузка...`}/>
            );
        }
    };

    const NotFound = () => {
        if (id && !newsStore.loading && Object.keys(newsStore.news).length === 0) {
            return (
                <TitleBlock title={`Новость не найдена`} onBack={back}/>
            );
        }
    };

    const MainBlock = () => {
        const NewNews = () => {
            const [photo, setPhoto] = React.useState([]);
            const [photoPreview, setPhotoPreview] = React.useState([]);
            const [photoReview, setPhotoReview] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            const checkForComplete = (sendObject) => {
                if (!sendObject.previewTitle) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название для анонса должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.title) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (sendObject.date === "") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Дата должна быть заполнена."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorPreview || sendObject.editorPreview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Описание для анонса должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorReview || sendObject.editorReview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Детальное описание должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                return true;
            };

            const onAddNews = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["previewImage"] = photoPreview;
                sendObject["reviewImage"] = photoReview;
                sendObject["images"] = photo;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await newsStore.addNews(sendObject);

                setSending(false);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Новость успешно добавлена"}
                            opened={true}
                            onClose={() => {
                                back();
                            }}
                        />
                    );
                } else {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={result.errorText}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                }
            };

            if (!id) {
                return (
                    <>
                        <TitleBlock title={"Создание новости"} onBack={back}/>
                        <form onSubmit={handleSubmit(onAddNews)} className='form'>
                            <Tabs>
                                <Tab title={"Основная информация"}>
                                    <fieldset className='form__section'>
                                        <FieldInput
                                            label={"Доступна для показа?"}
                                            type={"checkbox_variant"}
                                            {...register("active", {
                                                value: true,
                                            })}
                                        />
                                        <FieldInput
                                            label={"Показывать на главной странице?"}
                                            type={"checkbox_variant"}
                                            {...register("mainPage")}
                                        />
                                        <FieldInput
                                            label={"Название новости для анонса*"}
                                            type='textarea'
                                            layout='flex'
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("previewTitle")}
                                        />
                                        <FieldInput
                                            label={"Название новости*"}
                                            type='textarea'
                                            layout='flex'
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("title")}
                                        />
                                        <FieldInput
                                            label='Дата и время'
                                            type='datetime-local'
                                            layout='flex'
                                            required={true}
                                            {...register("date")}
                                        />
                                        <div className='form__multy-block'>
                                            <p className='form__label'>Описание для анонса</p>
                                            <Editor
                                                control={control}
                                                name='editorPreview'
                                                minHeight={250}
                                                buttons={{ link: true }}
                                            />
                                        </div>
                                        <div className='form__multy-block'>
                                            <p className='form__label'>Детальное описание</p>
                                            <Editor
                                                control={control}
                                                name='editorReview'
                                                minHeight={250}
                                                buttons={{ link: true }}
                                            />
                                        </div>
                                    </fieldset>
                                </Tab>
                                <Tab title={"Фотографии"}>
                                    <fieldset className='form__section'>
                                        <ImageSelector
                                            title='КАРТИНКА ДЛЯ АНОНСА'
                                            items={photoPreview}
                                            onlyOneImage={true}
                                            multiFiles={false}
                                            onChange={(items) => setPhotoPreview(items)}
                                        />
                                        <ImageSelector
                                            title='ДЕТАЛЬНАЯ КАРТИНКА'
                                            items={photoReview}
                                            onlyOneImage={true}
                                            multiFiles={false}
                                            onChange={(items) => setPhotoReview(items)}
                                        />
                                        <ImageSelector
                                            title='Фото галерея'
                                            items={photo}
                                            multiFiles={true}
                                            onChange={(items) => setPhoto(items)}
                                        />
                                    </fieldset>
                                </Tab>
                            </Tabs>
                            <div className='form__controls'>
                                <Button type='submit' theme='primary' text='Сохранить' spinnerActive={sending} />
                                <Button
                                    type='button'
                                    theme='text'
                                    text='Отмена'
                                    onClick={back}
                                    spinnerActive={sending}
                                />
                            </div>
                        </form>
                        {popup}
                    </>
                );
            }
        };

        const EditNews = () => {
            const [photo, setPhoto] = React.useState([]);
            const [photoPreview, setPhotoPreview] = React.useState([]);
            const [photoReview, setPhotoReview] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setValue("editorPreview", newsStore.news.preview_text);
                    setValue("editorReview", newsStore.news.text);

                    setPhotoPreview(
                        newsStore.news.preview_image
                            ? [
                                  {
                                      ID: newsStore.news.ID,
                                      url: newsStore.news.preview_image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhotoReview(
                        newsStore.news.image
                            ? [
                                  {
                                      ID: newsStore.news.ID,
                                      url: newsStore.news.image,
                                      main: 1,
                                      order: 1,
                                      isFile: 1,
                                      isLoaded: 1,
                                  },
                              ]
                            : []
                    );

                    setPhoto(newsStore.news.images ? newsStore.news.images : []);
                }
            }, [edit]);

            const checkForComplete = (sendObject) => {
                if (!sendObject.previewTitle) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название для анонса должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.title) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Название должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (sendObject.date === "") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Дата должна быть заполнена."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorPreview || sendObject.editorPreview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Описание для анонса должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.editorReview || sendObject.editorReview === "<p><br></p>") {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Детальное описание должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                return true;
            };

            const onEditNews = async (params) => {
                const data = getValues();

                let sendObject = { ...data };

                sendObject["id"] = id;
                sendObject["previewImage"] = photoPreview;
                sendObject["reviewImage"] = photoReview;
                sendObject["images"] = photo;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await newsStore.editNews(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Новость успешно отредактирована"}
                            opened={true}
                            onClose={() => {
                                back();
                            }}
                        />
                    );
                } else {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={result.errorText}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                }
            };

            const onDelete = async () => {
                setPopup(
                    <AlertPopup
                        text={"Вы уверены что хотите удалить?"}
                        opened={true}
                        onClose={() => setPopup(<></>)}
                        buttons={
                            <>
                                <Button
                                    type='button'
                                    size={"small"}
                                    text={"Нет"}
                                    theme='text'
                                    onClick={() => setPopup(<></>)}
                                />
                                <Button
                                    type='button'
                                    size={"small"}
                                    theme='info'
                                    text={"Да"}
                                    onClick={async () => {
                                        let sendObject = {};

                                        sendObject["id"] = id;
                                        sendObject["archive"] = 1;

                                        const result = await newsStore.removeNews(sendObject);

                                        if (!result.error) {
                                            setPopup(
                                                <AlertPopup
                                                    title=''
                                                    text={"Новость удалена"}
                                                    opened={true}
                                                    onClose={() => {
                                                        setPopup(<></>);
                                                        back();
                                                    }}
                                                />
                                            );
                                        } else {
                                            setPopup(
                                                <AlertPopup
                                                    title='Ошибка'
                                                    text={result.errorText}
                                                    opened={true}
                                                    onClose={() => {
                                                        setPopup(<></>);
                                                    }}
                                                />
                                            );
                                        }
                                    }}
                                />
                            </>
                        }
                    />
                );
            };

            const handleDeleteImages = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "images";
                sendObject["newsID"] = id;

                const result = await newsStore.removeFile(sendObject);
            };

            const handleDeletePreviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "preview";
                sendObject["newsID"] = id;

                const result = await newsStore.removeFile(sendObject);
            };

            const handleDeleteReviewPhoto = async (item) => {
                let sendObject = { ...item };

                sendObject["place"] = "review";
                sendObject["newsID"] = id;

                const result = await newsStore.removeFile(sendObject);
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование новости ID: ${id}`} onBack={back}/>
                        <form onSubmit={handleSubmit(onEditNews)} className='form'>
                            <Tabs>
                                <Tab title={"Основная информация"}>
                                    <fieldset className='form__section'>
                                        <FieldInput
                                            label={"Доступна для показа?"}
                                            type={"checkbox_variant"}
                                            {...register("active", {
                                                value: newsStore.news.active === "Активен",
                                            })}
                                        />
                                        <FieldInput
                                            label={"Показывать на главной странице?"}
                                            type={"checkbox_variant"}
                                            {...register("mainPage", {
                                                value: newsStore.news.show_on_main_page === "Активен",
                                            })}
                                        />
                                        <FieldInput
                                            label={"Название новости для анонса*"}
                                            type='textarea'
                                            layout='flex'
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("previewTitle", {
                                                value: newsStore.news.preview_title,
                                            })}
                                        />
                                        <FieldInput
                                            label={"Название новости*"}
                                            type='textarea'
                                            layout='flex'
                                            required={true}
                                            placeholder={"Введите название"}
                                            {...register("title", {
                                                value: newsStore.news.title,
                                            })}
                                        />
                                        <FieldInput
                                            label='Дата и время'
                                            type='datetime-local'
                                            layout='flex'
                                            required={true}
                                            {...register("date", {
                                                value: moment(newsStore.news.date).format("YYYY-MM-DD HH:mm"),
                                            })}
                                        />
                                        <div className='form__multy-block'>
                                            <p className='form__label'>Описание для анонса</p>
                                            <Editor
                                                control={control}
                                                name='editorPreview'
                                                minHeight={250}
                                                buttons={{ link: true }}
                                            />
                                        </div>
                                        <div className='form__multy-block'>
                                            <p className='form__label'>Детальное описание</p>
                                            <Editor
                                                control={control}
                                                name='editorReview'
                                                minHeight={250}
                                                buttons={{ link: true }}
                                            />
                                        </div>
                                    </fieldset>
                                </Tab>
                                <Tab title={"Фотографии"}>
                                    <fieldset className='form__section'>
                                        <ImageSelector
                                            title='КАРТИНКА ДЛЯ АНОНСА'
                                            items={photoPreview}
                                            onlyOneImage={true}
                                            multiFiles={false}
                                            onChange={(items) => setPhotoPreview(items)}
                                            onDelete={handleDeletePreviewPhoto}
                                        />
                                        <ImageSelector
                                            title='ДЕТАЛЬНАЯ КАРТИНКА'
                                            items={photoReview}
                                            onlyOneImage={true}
                                            multiFiles={false}
                                            onChange={(items) => setPhotoReview(items)}
                                            onDelete={handleDeleteReviewPhoto}
                                        />
                                        <ImageSelector
                                            title='Фото галерея'
                                            items={photo}
                                            multiFiles={true}
                                            onChange={(items) => setPhoto(items)}
                                            onDelete={handleDeleteImages}
                                        />
                                    </fieldset>
                                </Tab>
                            </Tabs>
                            <div className='form__controls'>
                                <Button type='submit' theme='primary' text='Сохранить' spinnerActive={sending} />
                                <Button
                                    type='button'
                                    theme='text'
                                    text='Удалить'
                                    onClick={onDelete}
                                    spinnerActive={sending}
                                />
                                <Button
                                    type='button'
                                    theme='text'
                                    text='Отмена'
                                    onClick={() => {
                                        setEdit(false);
                                    }}
                                    spinnerActive={sending}
                                />
                            </div>
                        </form>
                        {popup}
                    </>
                );
            }
        };

        const ViewNews = () => {
            if (id && !edit && !newsStore.loading && Object.keys(newsStore.news).length > 0) {
                return (
                    <>
                        <TitleBlock title={`Новость ID: ${newsStore.news.ID}`} onBack={back}>
                            <Button
                                size='smaller'
                                type='submit'
                                isIconBtn='true'
                                iconClass={"mdi mdi-pencil"}
                                theme='outline'
                                aria-label='Редактировать новость'
                                onClick={() => {
                                    setEdit(true);
                                }}
                            />
                        </TitleBlock>
                        <Tabs>
                            <Tab title={"Основные сведения"}>
                                <ul className={styles.list}>
                                    <li className={styles.item}>
                                        <h3 className={styles.label}>Доступна для показа?</h3>
                                        <p className={styles.description}>
                                            {newsStore.news.active === "Активен" ? "Да" : "Нет"}
                                        </p>
                                    </li>
                                    <li className={styles.item}>
                                        <h3 className={styles.label}>Показывать на главной странице?</h3>
                                        <p className={styles.description}>
                                            {newsStore.news.show_on_main_page === "Активен" ? "Да" : "Нет"}
                                        </p>
                                    </li>
                                    <li className={styles.item}>
                                        <h3 className={styles.label}>Публичная страница</h3>
                                        <p className={styles.description}>
                                            <NavLink
                                                className={commonStyles.link}
                                                to={"/news/" + id}
                                                target={"_blank"}
                                                rel='noopener nofollow noreferer'
                                            >
                                                На страницу <span className='mdi mdi-open-in-new' />
                                            </NavLink>
                                        </p>
                                    </li>
                                    <li className={styles.item}>
                                        <h3 className={styles.label}>Название новости для анонса</h3>
                                        <p className={styles.description}>{newsStore.news.preview_title}</p>
                                    </li>
                                    <li className={styles.item}>
                                        <h3 className={styles.label}>Название новости</h3>
                                        <p className={styles.description}>{newsStore.news.title}</p>
                                    </li>
                                    <li className={styles.item}>
                                        <h3 className={styles.label}>Дата новости</h3>
                                        <p className={styles.description}>
                                            {moment(newsStore.news.date).format("DD MMMM YYYY HH:mm")}
                                        </p>
                                    </li>
                                </ul>
                                <h2 className={styles.title}>Описание для анонса</h2>
                                <div
                                    className={styles.editor}
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(newsStore.news.preview_text),
                                    }}
                                />
                                <h2 className={styles.title}>Детальное описание</h2>
                                <div
                                    className={styles.editor}
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(newsStore.news.text),
                                    }}
                                />
                            </Tab>
                            <Tab title={"Фотографии"}>
                                <h2 className={styles.title}>Картинка для анонса</h2>
                                <ImageGallery
                                    items={[
                                        {
                                            url: newsStore.news.preview_image,
                                        },
                                    ]}
                                    front={false}
                                />
                                <h2 className={styles.title}>Детальная картинка</h2>
                                <ImageGallery
                                    items={[
                                        {
                                            url: newsStore.news.image,
                                        },
                                    ]}
                                    front={false}
                                />
                                <h2 className={styles.title}>Фото галерея</h2>
                                <ImageGallery items={newsStore.news.images} front={false} />
                            </Tab>
                        </Tabs>
                    </>
                );
            }
        };

        return (
            <>
                <NewNews />
                <EditNews />
                <ViewNews />
            </>
        );
    };

    return (
        <>
            <Loading />
            <MainBlock />
            <NotFound />
        </>
    );
};

export default AdminNewsPage;
