import React from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import useDocumentsStore from "../../../store/admin/documentsStore";

import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import ImageSelector from "../../../components/admin/image.selector/image.selector.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldUrl from "../../../components/admin/field/field.url.component";

const AddDocumentPage = () => {
    const navigate = useNavigate();

    const back = () => navigate("/admin/documents");

    //Private component
    const store = useDocumentsStore();
    const {register, handleSubmit, reset, getValues, setValue} = useForm();

    const [image, setImage] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

    const checkForComplete = (sendObject) => {
        if (!sendObject.titleShort) {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Краткое название должно быть заполнено."}
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

        if (!sendObject.url) {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Ссылка на документ должна быть заполнена."}
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

        let sendObject = {...data};

        sendObject["image"] = image;

        if (!checkForComplete(sendObject)) return;

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Документ успешно добавлен"}
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
        <>
            <TitleBlock title={"Создание"} onBack={back}/>
            <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Основная информация</h2>
                        <FieldText
                            label={"Название документа (кратко)*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("titleShort")}
                        />
                        <FieldText
                            label={"Название документа (полностью)*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title")}
                        />
                        <FieldUrl
                            label={"Ссылка на документ*"}
                            required={true}
                            withFileSelect={true}
                            placeholder={"https://..."}
                            {...register("url")}
                            onFileSelected={(file) => {
                                setValue("url", process.env.REACT_APP_BASE_URL + file.url);
                            }}
                        />
                    </fieldset>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Картинка для превью документа</h2>
                        <ImageSelector
                            items={image}
                            onlyOneFile={true}
                            multiFiles={false}
                            onChange={(items) => setImage(items)}
                        />
                    </fieldset>
                </div>
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
        </>
    );
};

export default AddDocumentPage;
