import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

import useEmployeesCategoriesStore from "../../../../store/admin/employeeCategoriesStore";

import BasicPage from "../../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../../components/general/alert.popup/alert.popup";
import Button from "../../../../components/admin/button/button.component";
import TitleBlock from "../../../../components/admin/title.block/title.block.component";
import FieldText from "../../../../components/admin/field/field.text.component";

import {AdminIcons} from "../../../../components/svgs";
import FieldNumber from "../../../../components/admin/field/field.number.component";

const EditCategoryEmployeesPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, setValue, getValues} = useForm();

    const store = useEmployeesCategoriesStore();
    const [popup, setPopup] = React.useState(<></>);

    const back = () => navigate("/admin/employees");

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({id});
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        if(store.item)
            reset(store.item);
    }, [store.item]);

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

        let sendObject = {...data};

        sendObject["id"] = id;

        if (!checkForComplete(sendObject)) return;

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Подразделение успешно отредактировано"}
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
                            theme='text'
                            onClick={() => setPopup(<></>)}
                            spinnerActive={store.sending}
                        >
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
                                            text={"Подразделение удалено"}
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
                            spinnerActive={store.sending}
                        >
                            Да
                        </Button>
                    </>
                }
            />
        );
    };

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Редактирование ID: ${id}`} onBack={back}/>
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
                    <FieldNumber
                        label={"Сортировка*"}
                        required={true}
                        min={0}
                        {...register("sorting", {
                            value: store.item.sorting
                        })}
                    />
                </fieldset>
                <div className='admin-form__controls'>
                    <Button
                        type='submit'
                        extraClass='admin-form__button'
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
                    <Button
                        type='button'
                        theme='text-error'
                        iconName={AdminIcons.delete}
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

export default EditCategoryEmployeesPage;
