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
import { AdminIcons } from "../../../components/svgs";

const EditLessonPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, control, setValue, getValues } = useForm();

    const store = useLessonsStore();
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

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();
        setValue("text", store.item.text);
    }, []);

    const back = () => navigate(`/admin/lessons/${id}`);

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

    const onEdit = async (params) => {
        const data = getValues();

        let sendObject = { ...data };

        sendObject["id"] = id;
        sendObject["image"] = image;

        if (!checkForComplete(sendObject)) return;

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Занятие успешно отредактирована"}
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
                        <Button type='button' theme='text' onClick={() => setPopup(<></>)} spinnerActive={store.sending}>
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
                                            text={"Занятие удалено"}
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

    const handleDeletePreviewPhoto = async (item) => {
        let sendObject = { ...item };

        sendObject["ID"] = id;

        const result = await store.removeFile(sendObject);
    };

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Редактирование ID: ${id}`} onBack={back} />
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
                        onClick={back}
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

export default EditLessonPage;
