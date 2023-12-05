import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useGroupsStore from "../../../store/admin/groupsStore";
import useTeachersStore from "../../../store/admin/employeesStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import ImageSelector from "../../../components/admin/image.selector/image.selector.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import MultiSelect from "../../../components/admin/multi_select/multi_select.component";
import FieldText from "../../../components/admin/field/field.text.component";

import { AdminIcons } from "../../../components/svgs";

const EditGroupPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const back = () => navigate(`/admin/groups/${id}`);

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

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
            await teachersStore.loadAll();
        };

        reset();
        fetchData();
        setValue("text", store.item.text);
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

    const onEdit = async (params) => {
        const data = getValues();

        let sendObject = { ...data };

        sendObject["id"] = id;
        sendObject["image"] = image && image.length > 0 ? image : "";

        if (data.teachers_select && data.teachers_select.length > 0)
            sendObject["employees"] = Array.from(data.teachers_select.map((item) => item.value));

        if (!checkForComplete(sendObject)) return;

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Занятие успешно отредактировано"}
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
                        values={store.item.employees?.map((item) => {
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

export default EditGroupPage;