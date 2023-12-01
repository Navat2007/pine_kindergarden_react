import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useLessonsStore from "../../../store/admin/lessonsStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import ImageSelector from "../../../components/admin/image.selector/image.selector.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";

import FieldText from "../../../components/admin/field/field.text.component";

const AddLessonPage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const store = useLessonsStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();
    }, []);

    const back = () => navigate("/admin/lessons");

    const [photoPreview, setPhotoPreview] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

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

        if (!sendObject.text || sendObject.text === "<p><br></p>") {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Описание должно быть заполнено."}
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

        sendObject["image"] = photoPreview;

        if (!checkForComplete(sendObject)) return;

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Занятие успешно добавлено"}
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
            <TitleBlock title={"Создание"} onBack={back} />
            <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                <fieldset className='admin-form__section admin-form__section_width_one-col'>
                    <FieldText
                        label={"Название*"}
                        required={true}
                        placeholder={"Введите название"}
                        {...register("title")}
                    />
                    <p className='admin-form__subtitle'>Фотография</p>
                    <ImageSelector
                        items={photoPreview}
                        onlyOneFile={true}
                        multiFiles={false}
                        onChange={(items) => setPhotoPreview(items)}
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

export default AddLessonPage;
