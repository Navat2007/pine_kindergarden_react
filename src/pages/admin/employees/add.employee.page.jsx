import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useEmployeesStore from "../../../store/admin/employeesStore";
import useEmployeesCategoriesStore from "../../../store/admin/employeeCategoriesStore";

import Table from "../../../components/admin/table/table.component";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Tabs from "../../../components/general/tabs/tabs.component";
import Tab from "../../../components/general/tabs/tab.component";
import ImageSelector from "../../../components/admin/image.selector/image.selector.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldUrl from "../../../components/admin/field/field.url.component";
import FieldSelect from "../../../components/admin/field/field.select.component";

const AddEmployeePage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, getValues, control } = useForm();

    const store = useEmployeesStore();
    const storeCategories = useEmployeesCategoriesStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await storeCategories.loadAll();
            await store.loadByID({ id });
        };

        reset();
        fetchData();
    }, []);

    const back = () => {
        window.localStorage.removeItem(`teacher_create_tab`);
        navigate("/admin/employees");
    };

    const [photo, setPhoto] = React.useState([]);
    const [educations, setEducations] = React.useState([]);
    const [qualification, setQualification] = React.useState([]);
    const [work, setWork] = React.useState([]);
    const [reward, setReward] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

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

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Сотрудник успешно добавлен"}
                    opened={true}
                    onClose={back}
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
        <BasicPage mainStore={store} loadings={[store]}>
            <div className='admin-section'>
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
                                        defaultSelectItem={null}
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
                <div className='admin-section__bottom-panel admin-form__controls'>
                    <Button
                        extraClass='admin-form__button'
                        type='submit'
                        form='add_form'
                        spinnerActive={store.sending}
                    >
                        Сохранить
                    </Button>
                    <Button
                        type='button'
                        extraClass='admin-form__button'
                        theme='text'
                        onClick={back}
                        spinnerActive={store.sending}
                    >
                        Отмена
                    </Button>
                </div>
                {popup}
            </div>
        </BasicPage>
    );
};

export default AddEmployeePage;
