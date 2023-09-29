import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useTeachersStore from "../../../store/admin/teachersStore";
import useTeachersCategoriesStore from "../../../store/admin/teacherCategoriesStore";

import Table from "../../../components/admin/table/table.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import ImageSelector from "../../../components/general/image.selector/image.selector.component";
import ImageGallery from "../../../components/general/image.gallery/image.gallery.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldUrl from "../../../components/admin/field/field.url.component";
import FieldSelect from "../../../components/admin/field/field.select.component";

import { AdminIcons } from "../../../components/svgs";

const AdminTeacherPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, getValues, control } = useForm();

    const store = useTeachersStore();
    const storeCategories = useTeachersCategoriesStore();

    const [edit, setEdit] = React.useState(false);

    const fetchData = async () => {
        await storeCategories.loadAll();
        await store.loadByID({ id });
    };

    React.useEffect(() => {
        reset();
        fetchData();
    }, [id]);

    const back = () => {
        window.localStorage.removeItem(`teacher_create_tab`);
        navigate("/admin/teachers");
    };

    //Private component
    const Article = () => {
        const itemConfigEducation = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
                hide: true,
            },
            {
                header: "Наименование учебного учреждения",
                key: "orgName",
                type: "string",
                filter: "string",
                sorting: true,
                required: true,
            },
            {
                header: "Дата окончания",
                key: "endDate",
                type: "date",
                filter: "date",
                sorting: true,
                required: true,
            },
            {
                header: "Специальность, квалификация по диплому",
                key: "qualification",
                type: "string",
                filter: "select",
                sorting: true,
                required: true,
            },
        ];
        const itemConfigQualification = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
                hide: true,
            },
            {
                header: "Наименование",
                key: "title",
                type: "string",
                filter: "string",
                sorting: true,
                required: true,
            },
            {
                header: "Место проведения",
                key: "place",
                type: "string",
                filter: "string",
                sorting: true,
                required: true,
            },
            {
                header: "Дата прохождения",
                key: "date",
                type: "date",
                filter: "date",
                sorting: true,
                required: true,
            },
            {
                header: "Количество часов",
                key: "hours",
                type: "int",
                filter: "int",
                sorting: true,
                required: true,
            },
        ];
        const itemConfigWork = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
                hide: true,
            },
            {
                header: "Общий стаж",
                key: "summary",
                type: "string",
                filter: "string",
                sorting: true,
                required: false,
            },
            {
                header: "Педагогический стаж",
                key: "education",
                type: "string",
                filter: "string",
                sorting: true,
                required: false,
            },
            {
                header: "В данном учреждении",
                key: "work",
                type: "string",
                filter: "string",
                sorting: true,
                required: false,
            },
            {
                header: "Квалификационная категория",
                key: "category",
                type: "string",
                filter: "string",
                sorting: true,
                required: false,
            },
            {
                header: "Дата аттестации",
                key: "date",
                type: "date",
                filter: "date",
                sorting: true,
                required: false,
            },
            {
                header: "Приказ",
                key: "date_order",
                type: "string",
                filter: "string",
                sorting: true,
                required: false,
            },
        ];
        const itemConfigReward = [
            {
                header: "ID",
                key: "ID",
                type: "int",
                filter: "number",
                sorting: true,
                hide: true,
            },
            {
                header: "Наименование",
                key: "title",
                type: "string",
                filter: "string",
                sorting: true,
                required: true,
            },
            {
                header: "Дата",
                key: "date",
                type: "date",
                filter: "date",
                sorting: true,
                required: true,
            },
        ];

        const Create = () => {
            const [photo, setPhoto] = React.useState([]);
            const [educations, setEducations] = React.useState([]);
            const [qualification, setQualification] = React.useState([]);
            const [work, setWork] = React.useState([]);
            const [reward, setReward] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

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

            const onAdd = async () => {
                let sendObject = { ...getValues() };

                sendObject["image"] = photo;

                if (educations.length > 0) sendObject["educations"] = educations;

                if (qualification.length > 0) sendObject["qualification"] = qualification;

                if (work.length > 0) sendObject["work"] = work;

                if (reward.length > 0) sendObject["reward"] = reward;

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

            if (!id && !store.loading && !storeCategories.loading) {
                return (
                    <>
                        <TitleBlock title={"Создание"} onBack={back} />
                        <Tabs place={"teacher_create"}>
                            <Tab title={"Основная информация"}>
                                <form id='add_form' onSubmit={handleSubmit(onAdd)} className='admin-form'>
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
                                                onlyOneFile={true}
                                                multiFiles={false}
                                                orientation='portrait'
                                                extraClass={"admin-form__photo"}
                                                onChange={(items) => setPhoto(items)}
                                            />
                                        </fieldset>
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
                        <div className='admin-form__controls'>
                            <Button
                                text='Сохранить'
                                extraClass={"admin-form__button"}
                                type='submit'
                                form='add_form'
                                spinnerActive={sending}
                            />
                            <Button
                                type='button'
                                extraClass={"admin-form__button"}
                                theme='text'
                                text='Отмена'
                                onClick={back}
                                spinnerActive={sending}
                            />
                        </div>
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
            const [educations, setEducations] = React.useState([]);
            const [qualification, setQualification] = React.useState([]);
            const [work, setWork] = React.useState([]);
            const [reward, setReward] = React.useState([]);
            const [popup, setPopup] = React.useState(<></>);
            const [sending, setSending] = React.useState(false);

            React.useEffect(() => {
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
                setEducations(store.item.educations);
                setQualification(store.item.qualifications);
                setWork(store.item.works);
                setReward(store.item.rewards);
            }, []);

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

                let sendObject = { ...data };

                sendObject["id"] = id;
                sendObject["image"] = photo;

                if (educations.length > 0) sendObject["educations"] = educations;

                if (qualification.length > 0) sendObject["qualification"] = qualification;

                if (work.length > 0) sendObject["work"] = work;

                if (reward.length > 0) sendObject["reward"] = reward;

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
                let sendObject = { ...item };

                sendObject["ID"] = id;

                const result = await store.removeFile(sendObject);
            };

            if (id && edit && !store.loading && !storeCategories.loading) {
                return (
                    <div className='admin-section'>
                        <TitleBlock title={`Редактирование ID: ${id}`} onBack={back} />
                        <Tabs place={"teacher_create"}>
                            <Tab title={"Основная информация"}>
                                <form id='edit_form' onSubmit={handleSubmit(onEdit)} className='admin-form'>
                                    <div className='admin-form__two-columns'>
                                        <fieldset className='admin-form__section'>
                                            <h3 className='admin-form__title'>Основная информация</h3>
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
                                        </fieldset>
                                        <fieldset className='admin-form__section'>
                                            <h3 className='admin-form__title'>Фотография</h3>
                                            <ImageSelector
                                                items={photo}
                                                orientation='portrait'
                                                extraClass='admin-form__photo'
                                                onlyOneFile={true}
                                                multiFiles={false}
                                                onChange={(items) => setPhoto(items)}
                                                onDelete={handleDeletePhoto}
                                            />
                                        </fieldset>
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
                        <div className='admin-section__bottom-panel admin-form__controls'>
                            <Button
                                extraClass='admin-form__button'
                                type='submit'
                                form='edit_form'
                                spinnerActive={sending}
                            >
                                Сохранить
                            </Button>
                            <Button
                                type='button'
                                extraClass='admin-form__button'
                                theme='text'
                                onClick={back}
                                spinnerActive={sending}
                            >
                                Отмена
                            </Button>
                            <Button
                                type='button'
                                iconName={AdminIcons.delete}
                                theme='text-error'
                                onClick={onDelete}
                                spinnerActive={sending}
                            >
                                Удалить
                            </Button>
                        </div>
                        {popup}
                    </div>
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
                        <Tabs>
                            <Tab title={"Основная информация"}>
                                <section className='admin-view-section'>
                                    <div className='admin-view-section__two-columns'>
                                        <div className='admin-view-section__column'>
                                            <h2 className='admin-view-section__title'>Основная информация</h2>
                                            <ul className='admin-view-section__list'>
                                                <li className='admin-view-section__item'>
                                                    <h3 className='admin-view-section__label'>ФИО</h3>
                                                    <p className='admin-view-section__description'>{store.item.fio}</p>
                                                </li>
                                                <li className='admin-view-section__item'>
                                                    <h3 className='admin-view-section__label'>Должность</h3>
                                                    <p className='admin-view-section__description'>
                                                        {store.item.position}
                                                    </p>
                                                </li>
                                                <li className='admin-view-section__item'>
                                                    <h3 className='admin-view-section__label'>Публичная страница</h3>
                                                    <p className='admin-view-section__description'>
                                                        <NavLink
                                                            className='admin-view-section__link'
                                                            to={"/teachers/" + id}
                                                            target={"_blank"}
                                                            rel='noopener nofollow noreferer'
                                                        >
                                                            На страницу {AdminIcons.open_in_new}
                                                        </NavLink>
                                                    </p>
                                                </li>
                                                {store.item.page && (
                                                    <li className='admin-view-section__item'>
                                                        <h3 className='admin-view-section__label'>Личная страница</h3>
                                                        <p className='admin-view-section__description'>
                                                            <NavLink
                                                                className='admin-view-section__link'
                                                                to={store.item.page}
                                                                target={"_blank"}
                                                                rel='noopener nofollow noreferer'
                                                            >
                                                                {store.item.page}
                                                            </NavLink>
                                                        </p>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className='admin-view-section__column'>
                                            <h2 className='admin-view-section__title'>Фотография</h2>
                                            <ImageGallery
                                                orientation='portrait'
                                                extraClass={"admin-view-section__photo"}
                                                items={[
                                                    {
                                                        url: store.item.photo,
                                                    },
                                                ]}
                                                front={false}
                                            />
                                        </div>
                                    </div>
                                </section>
                            </Tab>
                            {store.item.educations.length > 0 && (
                                <Tab title={"Образование"}>
                                    <section className='admin-view-section'>
                                        <h2 className='admin-view-section__title'>Образование</h2>
                                        <Table
                                            title={"Информация об образовании"}
                                            items={store.item.educations}
                                            itemsConfig={itemConfigEducation}
                                        />
                                    </section>
                                </Tab>
                            )}
                            {store.item.qualifications.length > 0 && (
                                <Tab title={"Квалификация"}>
                                    <section className='admin-view-section'>
                                        <h2 className='admin-view-section__title'>Квалификация</h2>
                                        <Table
                                            title={"Информация об квалификации"}
                                            items={store.item.qualifications}
                                            itemsConfig={itemConfigQualification}
                                        />
                                    </section>
                                </Tab>
                            )}
                            {store.item.works.length > 0 && (
                                <Tab title={"Трудовой стаж"}>
                                    <h2 className='admin-view-section__title'>Трудовой стаж</h2>
                                    <Table
                                        title={"Информация о трудовом стаже"}
                                        items={store.item.works}
                                        itemsConfig={itemConfigWork}
                                    />
                                </Tab>
                            )}
                            {store.item.rewards.length > 0 && (
                                <Tab title={"Награды, благодарности"}>
                                    <section className='admin-view-section'>
                                        <h2 className='admin-view-section__title'>Награды, благодарности</h2>
                                        <Table
                                            title={"Информация о наградах, благодарностях"}
                                            items={store.item.rewards}
                                            itemsConfig={itemConfigReward}
                                        />
                                    </section>
                                </Tab>
                            )}
                        </Tabs>
                    </>
                );
            }
        };

        return (
            <>
                <Create />
                <Edit />
                <View />
            </>
        );
    };

    return (
        <BasicPage id={id} mainStore={store} loadings={[store, storeCategories]} back={back}>
            <Article />
        </BasicPage>
    );
};

export default AdminTeacherPage;
