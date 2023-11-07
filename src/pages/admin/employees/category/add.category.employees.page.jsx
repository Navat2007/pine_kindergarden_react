import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useEmployeesCategoriesStore from "../../../../store/admin/employeeCategoriesStore";

import BasicPage from "../../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../../components/general/alert.popup/alert.popup";
import Button from "../../../../components/admin/button/button.component";
import TitleBlock from "../../../../components/admin/title.block/title.block.component";
import FieldText from "../../../../components/admin/field/field.text.component";
import FieldNumber from "../../../../components/admin/field/field.number.component";

const AddCategoryEmployeesPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue, getValues } = useForm();

    const store = useEmployeesCategoriesStore();
    const [popup, setPopup] = React.useState(<></>);

    const back = () => navigate("/admin/employees");

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

        if (!checkForComplete(sendObject)) return;

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Подразделение успешно добавлено"}
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
        <BasicPage mainStore={store} loadings={[store]} loadingTimer={0}>
            <TitleBlock title={"Создание"} onBack={back} />
            <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                <fieldset className='admin-form__section admin-form__section_width_one-col'>
                    <FieldText
                        label={"Название*"}
                        required={true}
                        placeholder={"Введите название"}
                        {...register("title")}
                    />
                    <FieldNumber
                        label={"Сортировка*"}
                        required={true}
                        min={0}
                        {...register("sorting", {
                            value: 0
                        })}
                    />
                </fieldset>
                <div className='admin-form__controls'>
                    <Button
                        extraClass={"admin-form__button"}
                        type='submit'
                        spinnerActive={store.sending}
                    >
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

export default AddCategoryEmployeesPage;
