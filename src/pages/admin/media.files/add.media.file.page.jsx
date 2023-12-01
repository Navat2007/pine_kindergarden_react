import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import useMediaFilesStore from "../../../store/admin/mediaFilesStore";

import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import FileSelector from "../../../components/admin/file.selector/file.selector.component";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Button from "../../../components/admin/button/button.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import FieldText from "../../../components/admin/field/field.text.component";

const AddMediaFilePage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, getValues } = useForm();

    const store = useMediaFilesStore();

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();
    }, []);

    const back = () => navigate("/admin/mediaFiles");

    const [file, setFile] = React.useState([]);
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

        if (file.length === 0) {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Выберите файл."}
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

    const getFileType = (data) => {
        switch (data.type) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
                return "image";

            case "application/pdf":
                return "pdf";

            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "doc";

            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "xls";

            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return "ppt";

            case "application/vnd.oasis.opendocument.text":
                return "odt";

            case "application/vnd.oasis.opendocument.spreadsheet":
                return "ods";

            case "application/vnd.oasis.opendocument.presentation":
                return "odp";

            default:
                return "other";
        }
    };

    const onAdd = async () => {
        const data = getValues();

        let sendObject = { ...data };

        if (!checkForComplete(sendObject)) return;

        sendObject["file"] = file;
        sendObject["type"] = getFileType(file[0].file);

        await store.add(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Файл успешно добавлен"}
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
                <div className='admin-form__two-columns'>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Основная информация</h2>
                        <FieldText
                            label={"Название*"}
                            required={true}
                            placeholder={"Введите название"}
                            {...register("title")}
                        />
                        <FieldText
                            label={"Описание"}
                            required={false}
                            placeholder={"Введите описание"}
                            {...register("text")}
                        />
                    </fieldset>
                    <fieldset className='admin-form__section'>
                        <h2 className='admin-form__title'>Файл</h2>
                        <FileSelector
                            items={file}
                            multiFiles={false}
                            onlyOneFile={true}
                            orientation={"portrait"}
                            onChange={(items) => setFile(items)}
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
        </BasicPage>
    );
};

export default AddMediaFilePage;
