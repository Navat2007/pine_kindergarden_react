import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import createDOMPurify from "dompurify";
import { useForm } from "react-hook-form";

import useGroupsStore from "../../../store/admin/groupsStore";
import useTeachersStore from "../../../store/admin/teachersStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import MultiSelect from "../../../components/general/multi_select/multi_select.component";
import FieldText from "../../../components/admin/field/field.text.component";

import { AdminIcons } from "../../../components/svgs";
import TeachersSlider from "../../../components/general/teachers.slider/teachers.slider";

const AdminGroupPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window);

    const [edit, setEdit] = React.useState(false);

    const back = () => navigate("/admin/about");

    const Create = () => {
        const store = useGroupsStore();
        const teachersStore = useTeachersStore();

        const { register, handleSubmit, reset, control, getValues } = useForm();
        const [image, setImage] = React.useState([]);
        const [popup, setPopup] = React.useState(<></>);

        const fetchData = async () => {
            await teachersStore.loadAll();
        };

        React.useEffect(() => {
            reset();
            fetchData();
        }, []);

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

            return true;
        };

        const onAdd = async (params) => {
            const data = getValues();

            let sendObject = { ...data };

            if (data.teachers_select && data.teachers_select.length > 0)
                sendObject["teachers"] = Array.from(data.teachers_select.map((item) => item.value));

            sendObject["image"] = image && image.length > 0 ? image : "";

            if (!checkForComplete(sendObject)) return;

            await store.add(sendObject);

            if (!store.error) {
                setPopup(
                    <AlertPopup
                        title=''
                        text={"Группа успешно добавлена"}
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
                        text={store.errorText}
                        opened={true}
                        onClose={() => {
                            setPopup(<></>);
                        }}
                    />
                );
            }
        };

        return (
            <BasicPage mainStore={teachersStore} loadings={[teachersStore]}>
                <TitleBlock title={"Создание"} onBack={back} />
                <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                    <fieldset className='admin-form__section admin-form__section_width_one-col'>
                        <FieldText
                            label={"Название*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title")}
                        />
                        <FieldText
                            label={"Краткое описание"}
                            placeholder={"Введите краткое описание"}
                            {...register("preview")}
                        />
                        <p className='admin-form__subtitle'>Воспитатели</p>
                        <MultiSelect
                            control={control}
                            isMulti={true}
                            name={"teachers_select"}
                            closeMenuOnSelect={false}
                            options={teachersStore.items?.sort((a, b) => a.fio.localeCompare(b.fio)).map((item) => {
                                return {
                                    label: item.fio,
                                    value: item.ID,
                                };
                            })}
                        />
                        <p className='admin-form__subtitle'>Фотография</p>
                        <ImageSelector
                            items={image}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setImage(items)}
                        />
                    </fieldset>
                    <fieldset className='admin-form__section'>
                        <p className='admin-form__subtitle'>Детальное описание</p>
                        <Editor control={control} name='text' minHeight={250} buttons={{ link: true }} />
                    </fieldset>
                    <div className='admin-form__controls'>
                        <Button extraClass={"admin-form__button"} type='submit' spinnerActive={store.sending}>
                            Сохранить
                        </Button>
                        <Button
                            type='button'
                            extraClass={"admin-form__button"}
                            theme='text'
                            onClick={back}
                            spinnerActive={store.sending}
                        >
                            Отмена
                        </Button>
                    </div>
                </form>
                {popup}
            </BasicPage>
        );
    };

    const Edit = () => {
        const store = useGroupsStore();
        const teachersStore = useTeachersStore();

        const { register, handleSubmit, reset, control, setValue, getValues } = useForm();
        const [image, setImage] = React.useState(
            store.item.image !== ""
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
        const [popup, setPopup] = React.useState(<></>);

        const fetchData = async () => {
            await store.loadByID({ id });
            await teachersStore.loadAll();
        };

        React.useEffect(() => {
            if (edit) {
                reset();
                fetchData();
                setValue("text", store.item.text);
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

            return true;
        };

        const onEdit = async (params) => {
            const data = getValues();

            let sendObject = { ...data };

            sendObject["id"] = id;
            sendObject["image"] = image && image.length > 0 ? image : "";

            if (data.teachers_select && data.teachers_select.length > 0)
                sendObject["teachers"] = Array.from(data.teachers_select.map((item) => item.value));

            if (!checkForComplete(sendObject)) return;

            await store.edit(sendObject);

            if (!store.error) {
                setPopup(
                    <AlertPopup
                        title=''
                        text={"Занятие успешно отредактировано"}
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
                        text={store.errorText}
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

                                    await store.remove(sendObject);

                                    if (!store.error) {
                                        setPopup(
                                            <AlertPopup
                                                title=''
                                                text={"Группа удалена"}
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
                                                text={store.errorText}
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
            let sendObject = { ...item };

            sendObject["ID"] = id;

            await store.removeFile(sendObject);
        };

        return (
            <BasicPage mainStore={store} loadings={[store, teachersStore]}>
                <TitleBlock title={`Редактирование ID: ${id}`} onBack={() => {setEdit(false);}} />
                <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                    <fieldset className='admin-form__section admin-form__section_width_one-col'>
                        <FieldText
                            label={"Название*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title", {
                                value: store.item.title,
                            })}
                        />
                        <FieldText
                            label={"Краткое описание"}
                            placeholder={"Введите краткое описание"}
                            {...register("preview", {
                                value: store.item.preview,
                            })}
                        />
                        <p className='admin-form__subtitle'>Воспитатели</p>
                        <MultiSelect
                            control={control}
                            isMulti={true}
                            name={"teachers_select"}
                            closeMenuOnSelect={false}
                            values={store.item.teachers?.map((item) => {
                                return {
                                    label: item.fio,
                                    value: item.ID,
                                };
                            })}
                            options={teachersStore.items?.sort((a, b) => a.fio.localeCompare(b.fio)).map((item) => {
                                return {
                                    label: item.fio,
                                    value: item.ID,
                                };
                            })}
                        />
                        <p className='admin-form__subtitle'>Фотография</p>
                        <ImageSelector
                            items={image}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setImage(items)}
                            onDelete={handleDeletePreviewPhoto}
                        />
                    </fieldset>
                    <fieldset className='admin-form__section'>
                        <p className='admin-form__subtitle'>Детальное описание</p>
                        <Editor control={control} name='text' minHeight={250} buttons={{ link: true }} />
                    </fieldset>
                    <div className='admin-form__controls'>
                        <Button type='submit' extraClass='admin-form__button' spinnerActive={store.sending}>
                            Сохранить
                        </Button>
                        <Button
                            type='button'
                            extraClass='admin-form__button'
                            theme='text'
                            onClick={() => {
                                setEdit(false);
                            }}
                            spinnerActive={store.sending}
                        >
                            Отмена
                        </Button>
                        <Button
                            type='button'
                            iconName={AdminIcons.delete}
                            theme='text-error'
                            onClick={onDelete}
                            spinnerActive={store.sending}
                        >
                            Удалить
                        </Button>
                    </div>
                </form>
                {popup}
            </BasicPage>
        );
    };

    const View = () => {
        const store = useGroupsStore();

        const fetchData = async () => {
            await store.loadByID({ id });
        };

        React.useEffect(() => {
            fetchData();
        }, [id]);

        return (
            <BasicPage mainStore={store} loadings={[store]}>
                <TitleBlock title={`Группа ID: ${store.item.ID}`} onBack={back}>
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
                    <ul className='admin-view-section__list'>
                        <li className='admin-view-section__item'>
                            <h3 className='admin-view-section__label'>Публичная страница</h3>
                            <p className='admin-view-section__description'>
                                <NavLink
                                    className='admin-view-section__link'
                                    to={"/group/" + id}
                                    target={"_blank"}
                                    rel='noopener nofollow noreferer'
                                >
                                    На страницу {AdminIcons.open_in_new}
                                </NavLink>
                            </p>
                        </li>
                        <li className='admin-view-section__item'>
                            <h3 className='admin-view-section__label'>Название</h3>
                            <p className='admin-view-section__description'>{store.item.title}</p>
                        </li>
                        <li className='admin-view-section__item'>
                            <h3 className='admin-view-section__label'>Краткое описание</h3>
                            <p className='admin-view-section__description'>{store.item.preview}</p>
                        </li>
                    </ul>
                    <h2 className='admin-view-section__title'>Фотография</h2>
                    <ImageGallery
                        items={[
                            {
                                url: store.item.image,
                            },
                        ]}
                        front={false}
                    />
                    {store.item?.teachers?.length > 0 && (
                        <>
                            <h2 className='admin-view-section__title'>Воспитатели</h2>
                            <TeachersSlider
                                isBorderGradient={false}
                                type={"slide"}
                                items={store.item?.teachers}
                            />
                        </>
                    )}
                    <h2 className='admin-view-section__title'>Детальное описание</h2>
                    <div
                        className='admin-view-section__editor'
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(store.item.text),
                        }}
                    />
                </section>
            </BasicPage>
        );
    };

    if(!id)
    {
        return <Create />;
    }
    else if(id && edit)
    {
        return <Edit />;
    }
    else
    {
        return <View />;
    }
};

export default AdminGroupPage;