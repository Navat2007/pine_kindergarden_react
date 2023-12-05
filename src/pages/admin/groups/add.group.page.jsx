import React from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

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

const AddGroupPage = () => {
    const navigate = useNavigate();

    const store = useGroupsStore();
    const teachersStore = useTeachersStore();

    const {register, handleSubmit, reset, control, getValues} = useForm();
    const [image, setImage] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

    const back = () => navigate("/admin/groups");

    React.useEffect(() => {
        const fetchData = async () => {
            await teachersStore.loadAll();
        };

        reset();
        fetchData();
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

    const onAdd = async (params) => {
        const data = getValues();

        let sendObject = {...data};

        if (data.teachers_select && data.teachers_select.length > 0)
            sendObject["employees"] = Array.from(data.teachers_select.map((item) => item.value));

        sendObject["image"] = image && image.length > 0 ? image : "";

        if (!checkForComplete(sendObject)) return;

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Группа успешно добавлена"}
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
        <BasicPage mainStore={teachersStore} loadings={[teachersStore]}>
            <TitleBlock title={"Создание"} onBack={back}/>
            <form onSubmit={handleSubmit(onAdd)} className='admin-form'>
                <fieldset className='admin-form__section admin-form__section_width_one-col'>
                    <FieldText
                        label={"Название*"}
                        required={true}
                        placeholder={"Введите название"}
                        {...register("title")}
                    />
                    <FieldText
                        label={"Краткое описание"}
                        placeholder={"Введите краткое описание"}
                        {...register("preview")}
                    />
                    <p className='admin-form__subtitle'>Воспитатели</p>
                    <MultiSelect
                        control={control}
                        isMulti={true}
                        name={"teachers_select"}
                        closeMenuOnSelect={false}
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
                    />
                </fieldset>
                <fieldset className='admin-form__section'>
                    <p className='admin-form__subtitle'>Детальное описание</p>
                    <Editor control={control} name='text' minHeight={250} buttons={{link: true}}/>
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

export default AddGroupPage;