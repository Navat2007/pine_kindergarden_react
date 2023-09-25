import React from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import useTeachersStore from "../../../store/admin/teachersStore";
import useTeachersCategoriesStore from "../../../store/admin/teacherCategoriesStore";

import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldCheckbox from "../../../components/admin/field/field.checkbox.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldDate from "../../../components/admin/field/field.date.component";
import FieldUrl from "../../../components/admin/field/field.url.component";
import FieldSelect from "../../../components/admin/field/field.select.component";

import {AdminIcons} from "../../../components/svgs";
import Table from "../../../components/admin/table/table.component";

const AdminTeacherPage = (props) => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, control, setValue, getValues} = useForm();

    const store = useTeachersStore();
    const storeCategories = useTeachersCategoriesStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await storeCategories.loadAll();
        await store.loadByID({id});
    };

    React.useEffect(() => {
        fetchData();
    }, [id]);

    const back = () => navigate("/admin/teachers");

    //Private component
    const Loading = () => {
        if (store.loading || storeCategories.loading) {
            return <TitleBlock title={`Загрузка...`}/>;
        }
    };

    const NotFound = () => {
        if (id && !store.loading && Object.keys(store.item).length === 0) {
            return <TitleBlock title={`Педагог не найден`} onBack={back}/>;
        }
    };

    const Article = () => {
        const Create = () => {
            const [photo, setPhoto] = React.useState([]);
            const [educations, setEducations] = React.useState([]);
            const [qualification, setQualification] = React.useState([]);
            const [work, setWork] = React.useState([]);
            const [reward, setReward] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            const itemConfigEducation = [
                {
                    header: "ID",
                    key: "ID",
                    type: "int",
                    filter: "number",
                    sorting: true,
                    hide: true
                },
                {
                    header: "Наименование учебного учреждения",
                    key: "orgName",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Дата окончания",
                    key: "endDate",
                    type: "date",
                    filter: "date",
                    sorting: true,
                    required: true
                },
                {
                    header: "Специальность, квалификация по диплому",
                    key: "qualification",
                    type: "string",
                    filter: "select",
                    sorting: true,
                    required: true
                },
            ];
            const itemConfigQualification = [
                {
                    header: "ID",
                    key: "ID",
                    type: "int",
                    filter: "number",
                    sorting: true,
                    hide: true
                },
                {
                    header: "Наименование",
                    key: "title",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Место проведения",
                    key: "place",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Дата прохождения",
                    key: "date",
                    type: "date",
                    filter: "date",
                    sorting: true,
                    required: true
                },
                {
                    header: "Количество часов",
                    key: "hours",
                    type: "int",
                    filter: "int",
                    sorting: true,
                    required: true
                },
            ];
            const itemConfigWork = [
                {
                    header: "ID",
                    key: "ID",
                    type: "int",
                    filter: "number",
                    sorting: true,
                    hide: true
                },
                {
                    header: "Общий стаж",
                    key: "summary",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Педагогический стаж",
                    key: "education",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "В данном учреждении",
                    key: "work",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Квалификационная категория",
                    key: "category",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Дата аттестации",
                    key: "date",
                    type: "date",
                    filter: "date",
                    sorting: true,
                    required: true
                },
                {
                    header: "Приказ",
                    key: "date_order",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: false
                },
            ];
            const itemConfigReward = [
                {
                    header: "ID",
                    key: "ID",
                    type: "int",
                    filter: "number",
                    sorting: true,
                    hide: true
                },
                {
                    header: "Наименование",
                    key: "title",
                    type: "string",
                    filter: "string",
                    sorting: true,
                    required: true
                },
                {
                    header: "Дата",
                    key: "date",
                    type: "date",
                    filter: "date",
                    sorting: true,
                    required: true
                },
            ];

            const checkForComplete = (sendObject) => {
                console.log(sendObject);

                if (!sendObject.fio) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"ФИО должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.position) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Должность должна быть заполнена."}
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
                let sendObject = {...getValues()};

                sendObject["image"] = photo;

                if (educations.length > 0) {
                    let tmpArray = Array.from(
                        educations
                            .filter(
                                (education) =>
                                    getValues("orgName_" + education.id) !== "" &&
                                    getValues("endDate_" + education.id) !== "" &&
                                    getValues("qualification_" + education.id) !== ""
                            )
                            .map((education) => {
                                return {
                                    orgName: getValues("orgName_" + education.id),
                                    endDate: getValues("endDate_" + education.id),
                                    qualification: getValues("qualification_" + education.id),
                                };
                            })
                    );

                    sendObject["educations"] = tmpArray.length > 0 ? tmpArray : [];
                }

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.add(sendObject);

                setSending(false);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Сотрудник успешно добавлен"}
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
                        <Tabs>
                            <Tab title={"Основная информация"}>
                                <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                                    <div className='admin-form__two-columns'>
                                        <fieldset className='admin-form__section'>
                                            <h3 className='admin-form__title'>Основная информация</h3>
                                            <FieldText
                                                label={"ФИО*"}
                                                required={true}
                                                placeholder={"Введите фио"}
                                                {...register("fio")}
                                            />
                                            <FieldText
                                                label={"Должность*"}
                                                required={true}
                                                placeholder={"Введите должность"}
                                                {...register("position")}
                                            />
                                            <FieldSelect
                                                label={"Структурное подразделение*"}
                                                required={true}
                                                selectItems={storeCategories.items.map((item) => {
                                                    return {
                                                        title: item.title,
                                                        value: item.ID,
                                                    };
                                                })}
                                                {...register("category")}
                                            />
                                            <FieldUrl
                                                label={"Ссылка на личную страницу"}
                                                placeholder={"https://..."}
                                                {...register("page")}
                                            />
                                        </fieldset>
                                        <fieldset className='admin-form__section'>
                                            <h3 className='admin-form__title'>Фотография</h3>
                                            <ImageSelector
                                                items={photo}
                                                onlyOneImage={true}
                                                multiFiles={false}
                                                orientation='portrait'
                                                onChange={(items) => setPhoto(items)}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className='admin-form__controls'>
                                        <Button
                                            text='Сохранить'
                                            extraClass={"admin-form__button"}
                                            type='submit'
                                            spinnerActive={sending}/>
                                        <Button
                                            type='button'
                                            extraClass={"admin-form__button"}
                                            theme='text'
                                            text='Отмена'
                                            onClick={back}
                                            spinnerActive={sending}
                                        />
                                    </div>
                                </form>
                            </Tab>
                            <Tab title={"Образование"}>
                                <Table
                                    title={"Информация об образовании"}
                                    items={educations}
                                    itemsConfig={itemConfigEducation}
                                    withItemControls={true}
                                    onItemsChange={(items) => {
                                        setEducations(items);
                                    }}
                                />
                            </Tab>
                            <Tab title={"Повышение квалификации"}>
                                <Table
                                    title={"Информация о квалификации"}
                                    items={qualification}
                                    itemsConfig={itemConfigQualification}
                                    withItemControls={true}
                                    onItemsChange={(items) => {
                                        setQualification(items);
                                    }}
                                />
                            </Tab>
                            <Tab title={"Трудовой стаж"}>
                                <Table
                                    title={"Информация о трудовом стаже"}
                                    items={work}
                                    itemsConfig={itemConfigWork}
                                    withItemControls={true}
                                    itemControlsOneItem={true}
                                    onItemsChange={(items) => {
                                        setWork(items);
                                    }}
                                />
                            </Tab>
                            <Tab title={"Награды, благодарности"}>
                                <Table
                                    title={"Информация о наградах, благодарностях"}
                                    items={reward}
                                    itemsConfig={itemConfigReward}
                                    withItemControls={true}
                                    onItemsChange={(items) => {
                                        setReward(items);
                                    }}
                                />
                            </Tab>
                        </Tabs>
                        {popup}
                    </>
                );
            }
        };

        const Edit = () => {
            const [photo, setPhoto] = React.useState(
                store.item.photo
                    ? [
                        {
                            ID: store.item.ID,
                            url: store.item.photo,
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
                    setPhoto(
                        store.item.photo
                            ? [
                                {
                                    ID: store.item.ID,
                                    url: store.item.photo,
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
                if (!sendObject.fio) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"ФИО должно быть заполнено."}
                            opened={true}
                            onClose={() => {
                                setPopup(<></>);
                            }}
                        />
                    );
                    return false;
                }

                if (!sendObject.position) {
                    setPopup(
                        <AlertPopup
                            title='Ошибка'
                            text={"Должность должна быть заполнена."}
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

                let sendObject = {...data};

                sendObject["id"] = id;
                sendObject["image"] = photo;

                if (!checkForComplete(sendObject)) return;

                setSending(true);

                const result = await store.edit(sendObject);

                setSending(false);

                console.log(result);

                if (!result.error) {
                    setPopup(
                        <AlertPopup
                            title=''
                            text={"Сотрудник успешно отредактирован"}
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
                                                    text={"Сотрудник удален"}
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

            const handleDeletePhoto = async (item) => {
                let sendObject = {...item};

                sendObject["ID"] = id;

                const result = await store.removeFile(sendObject);
            };

            if (id && edit) {
                return (
                    <>
                        <TitleBlock title={`Редактирование ID: ${id}`} onBack={back}/>
                        <Tabs>
                            <Tab title={"Основная информация"}>
                                <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                                    <fieldset className='admin-form__section admin-form__section_width_one-col'>
                                        <FieldText
                                            label={"ФИО*"}
                                            required={true}
                                            placeholder={"Введите фио"}
                                            {...register("fio", {
                                                value: store.item.fio,
                                            })}
                                        />
                                        <FieldText
                                            label={"Должность*"}
                                            required={true}
                                            placeholder={"Введите должность"}
                                            {...register("position", {
                                                value: store.item.position,
                                            })}
                                        />
                                        <FieldSelect
                                            label={"Структурное подразделение*"}
                                            required={true}
                                            selectItems={storeCategories.items.map((item) => {
                                                return {
                                                    title: item.title,
                                                    value: item.ID,
                                                };
                                            })}
                                            {...register("category", {
                                                value: store.item.category,
                                            })}
                                        />
                                        <FieldUrl
                                            label={"Ссылка на личную страницу"}
                                            placeholder={"https://..."}
                                            {...register("page", {
                                                value: store.item.page,
                                            })}
                                        />
                                        <p className='admin-form__subtitle'>Фотография</p>
                                        <ImageSelector
                                            items={photo}
                                            onlyOneImage={true}
                                            multiFiles={false}
                                            onChange={(items) => setPhoto(items)}
                                            onDelete={handleDeletePhoto}
                                        />
                                    </fieldset>
                                    <div className='admin-form__controls'>
                                        <Button extraClass={"admin-form__button"} type='submit' spinnerActive={sending}>
                                            Сохранить
                                        </Button>
                                        <Button type='button' theme='text' onClick={onDelete} spinnerActive={sending}>
                                            Удалить
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
                            </Tab>
                            <Tab title={"Образование"}></Tab>
                            <Tab title={"Повышение квалификации"}></Tab>
                            <Tab title={"Трудовой стаж"}></Tab>
                            <Tab title={"Награды, благодарности"}></Tab>
                        </Tabs>
                        {popup}
                    </>
                );
            }
        };

        const View = () => {
            if (id && !edit && !store.loading && Object.keys(store.item).length > 0) {
                return (
                    <>
                        <TitleBlock title={`Сотрудник ID: ${store.item.ID}`} onBack={back}>
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
                                            to={"/teacher/" + id}
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
                            </ul>
                            <h2 className='admin-view-section__title'>Фотография</h2>
                            <ImageGallery
                                items={[
                                    {
                                        url: store.item.photo,
                                    },
                                ]}
                                front={false}
                            />
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
        <>
            <Loading/>
            <Article/>
            <NotFound/>
        </>
    );
};

export default AdminTeacherPage;
