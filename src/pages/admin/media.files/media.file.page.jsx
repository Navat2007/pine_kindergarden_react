import React from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import useMediaFilesStore from "../../../store/admin/mediaFilesStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import FileSelector from "../../../components/general/file.selector/file.selector.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";

import {AdminIcons} from "../../../components/svgs";
import FileGallery from "../../../components/general/file.gallery/file.gallery.component";

const AdminMediaFilePage = (props) => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, getValues} = useForm();

    const store = useMediaFilesStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await store.loadByID({id});
    };

    React.useEffect(() => {
        reset();
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/mediaFiles");

    //Private component
    const Article = () => {
        const getFileType = (data) => {
            console.log(data);
            switch (data.type) {
                case "image/jpeg":
                case "image/png":
                case "image/gif":
                    return "image";

                case "application/pdf":
                    return "pdf";

                case "application/msword":
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    return "doc";

                case "application/vnd.ms-excel":
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    return "xls";

                case "application/vnd.ms-powerpoint":
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    return "ppt";

                case "application/vnd.oasis.opendocument.text":
                    return "odt";

                case "application/vnd.oasis.opendocument.spreadsheet":
                    return "ods";

                case "application/vnd.oasis.opendocument.presentation":
                    return "odp";

                default:
                    return "other";
            }
        };

        const Create = () => {
            const [file, setFile] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            const checkForComplete = (sendObject) => {
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

                if (file.length === 0) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Выберите файл."}
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

            const onAdd = async () => {
                const data = getValues();

                let sendObject = {...data};

                if (!checkForComplete(sendObject)) return;

                sendObject["file"] = file;
                sendObject["type"] = getFileType(file[0].file);

                setSending(true);

                const result = await store.add(sendObject);

                setSending(false);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Файл успешно добавлен"}
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
                        <TitleBlock title={"Создание"} onBack={back}/>
                        <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                            <div className='admin-form__two-columns'>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Основная информация</h2>
                                    <FieldText
                                        label={"Название*"}
                                        required={true}
                                        placeholder={"Введите название"}
                                        {...register("title")}
                                    />
                                    <FieldText
                                        label={"Описание"}
                                        required={false}
                                        placeholder={"Введите описание"}
                                        {...register("text")}
                                    />
                                </fieldset>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Файл</h2>
                                    <FileSelector
                                        items={file}
                                        multiFiles={false}
                                        onlyOneFile={true}
                                        orientation={"portrait"}
                                        onChange={(items) => setFile(items)}
                                    />
                                </fieldset>
                            </div>
                            <div className='admin-form__controls'>
                                <Button extraClass={"admin-form__button"} type='submit' spinnerActive={sending}>
                                    Сохранить
                                </Button>
                                <Button
                                    type='button'
                                    extraClass={"admin-form__button"}
                                    theme='text'
                                    onClick={back}
                                    spinnerActive={sending}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </form>
                        {popup}
                    </>
                );
            }
        };

        const Edit = () => {
            const [file, setFile] = React.useState(
                store.item.url
                    ? [
                        {
                            ID: store.item.ID,
                            url: store.item.url,
                            main: 1,
                            order: 1,
                            isFile: 1,
                            isLoaded: 1,
                        },
                    ]
                    : []
            );
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
                if (edit) {
                    setFile(
                        store.item.image
                            ? [
                                {
                                    ID: store.item.ID,
                                    url: store.item.image,
                                    main: 1,
                                    order: 1,
                                    isFile: 1,
                                    isLoaded: 1,
                                },
                            ]
                            : []
                    );
                }
            }, [edit]);

            const checkForComplete = (sendObject) => {
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

                if (file.length === 0) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Выберите файл."}
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

            const onEdit = async () => {
                const data = getValues();

                let sendObject = {...data};

                if (!checkForComplete(sendObject)) return;

                sendObject["id"] = id;
                sendObject["file"] = file;
                sendObject["type"] = getFileType(file[0].file);

                setSending(true);

                const result = await store.edit(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Файл успешно отредактирован"}
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
                                <Button type='button' theme='text' onClick={() => setPopup(<></>)}>
                                    Нет
                                </Button>
                                <Button
                                    type='button'
                                    onClick={async () => {
                                        let sendObject = {};

                                        sendObject["id"] = id;

                                        const result = await store.remove(sendObject);

                                        if (!result.error) {
                                            setPopup(
                                                <AlertPopup
                                                    title=''
                                                    text={"Документ удален"}
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
                                >
                                    Да
                                </Button>
                            </>
                        }
                    />
                );
            };

            const handleDeletePreviewPhoto = async (item) => {
                let sendObject = {...item};

                sendObject["ID"] = id;

                const result = await store.removeFile(sendObject);
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование ID: ${id}`} onBack={back}/>
                        <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                            <div className='admin-form__two-columns'>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Основная информация</h2>
                                    <FieldText
                                        label={"Название*"}
                                        required={true}
                                        placeholder={"Введите название"}
                                        {...register("title", {
                                            value: store.item.title,
                                        })}
                                    />
                                    <FieldText
                                        label={"Описание"}
                                        required={false}
                                        placeholder={"Введите описание"}
                                        {...register("text", {
                                            value: store.item.text,
                                        })}
                                    />
                                </fieldset>
                                <fieldset className='admin-form__section'>
                                    <h2 className='admin-form__title'>Файл</h2>
                                    <FileSelector
                                        items={file}
                                        multiFiles={false}
                                        onlyOneFile={true}
                                        orientation={"portrait"}
                                        onChange={(items) => setFile(items)}
                                    />
                                </fieldset>
                            </div>
                            <div className='admin-form__controls'>
                                <Button type='submit' theme='primary' text='Сохранить' spinnerActive={sending}/>
                                <Button type='button' theme='text' onClick={onDelete} spinnerActive={sending}>
                                    Удалить
                                </Button>
                                <Button
                                    type='button'
                                    theme='text'
                                    onClick={() => {
                                        setEdit(false);
                                    }}
                                    spinnerActive={sending}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </form>
                        {popup}
                    </>
                );
            }
        };

        const View = () => {
            if (id && !edit && !store.loading && Object.keys(store.item).length > 0) {
                return (
                    <>
                        <TitleBlock title={`Файл ID: ${store.item.ID}`} onBack={back}>
                            <Button
                                type='submit'
                                isIconBtn='true'
                                theme='text'
                                iconName={AdminIcons.edit}
                                aria-label='Редактировать'
                                onClick={() => {
                                    setEdit(true);
                                }}
                            />
                        </TitleBlock>
                        <section className='admin-view-section'>
                            <div className='admin-view-section__two-columns'>
                                <div className='admin-view-section__column'>
                                    <h2 className='admin-view-section__title'>Основная информация</h2>
                                    <ul className='admin-view-section__list'>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Название</h3>
                                            <p className='admin-view-section__description'>{store.item.title}</p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Описание</h3>
                                            <p className='admin-view-section__description'>{store.item.text}</p>
                                        </li>
                                        <li className='admin-view-section__item'>
                                            <h3 className='admin-view-section__label'>Ссылка на документ</h3>
                                            <p className='admin-view-section__description'>
                                                <NavLink
                                                    className='admin-view-section__link'
                                                    to={store.item.url.includes("http")
                                                        ? store.item.url
                                                        : process.env.REACT_APP_BASE_URL + store.item.url}
                                                    target={"_blank"}
                                                    rel='noopener nofollow noreferer'
                                                >
                                                    Открыть {AdminIcons.open_in_new}
                                                </NavLink>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className='admin-view-section__column'>
                                    <h2 className='admin-view-section__title'>Файл</h2>
                                    <FileGallery
                                        items={[
                                            {
                                                title: store.item.file_name,
                                                url: store.item.url,
                                                type: store.item.type,
                                                isFile: 1,
                                                isLoaded: 1,
                                                order: 1,
                                            },
                                        ]}
                                        orientation={"portrait"}
                                        front={false}
                                    />
                                </div>
                            </div>
                        </section>
                    </>
                );
            }
        };

        return (
            <>
                <Create/>
                <Edit/>
                <View/>
            </>
        );
    };

    return (
        <BasicPage id={id} mainStore={store} loadings={[store]} back={back}>
            <Article/>
        </BasicPage>
    );
};

export default AdminMediaFilePage;
