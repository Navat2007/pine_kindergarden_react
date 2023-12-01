import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useFoodMenuStore from "../../../store/admin/foodMenuStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import ImageSelector from "../../../components/admin/image.selector/image.selector.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";
import FieldUrl from "../../../components/admin/field/field.url.component";
import FieldTextArea from "../../../components/admin/field/field.textarea.component";

import { AdminIcons } from "../../../components/svgs";

const EditFoodPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, getValues, setValue } = useForm();

    const store = useFoodMenuStore();

    const back = () => navigate(`/admin/food/menu/${id}`);

    const [image, setImage] = React.useState(
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
    const [popup, setPopup] = React.useState(<></>);

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();

        setImage(
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

        if (!sendObject.text) {
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
                    text={"Меню успешно отредактировано"}
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
                                            text={"Меню удалено"}
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

    const handleDeletePreviewPhoto = async (item) => {
        let sendObject = { ...item };

        sendObject["ID"] = id;

        const result = await store.removeFile(sendObject);
    };

    return (
        <BasicPage mainStore={store} loadings={[store]}>
            <TitleBlock title={`Редактирование ID: ${id}`} onBack={back} />
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
                        <FieldTextArea
                            label={"Описание*"}
                            required={true}
                            placeholder={"Введите описание"}
                            {...register("text", {
                                value: store.item.text,
                            })}
                        />
                        <FieldUrl
                            label={"Ссылка на документ*"}
                            required={true}
                            withFileSelect={true}
                            placeholder={"https://..."}
                            {...register("url", {
                                value: store.item.url,
                            })}
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
                            orientation={"portrait"}
                            onChange={(items) => setImage(items)}
                            onDelete={handleDeletePreviewPhoto}
                        />
                    </fieldset>
                </div>
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

export default EditFoodPage;
