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

import { AdminIcons } from "../../../components/svgs";

const EditMediaFilePage = (props) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, getValues } = useForm();

    const store = useMediaFilesStore();

    const back = () => navigate(`/admin/mediaFiles/${id}`);

    const [file, setFile] = React.useState([]);
    const [popup, setPopup] = React.useState(<></>);

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({ id });
        };

        reset();
        fetchData();

        setFile(
            store.item.url
                ? [
                    {
                        ID: store.item.ID,
                        url: store.item.url,
                        main: 1,
                        order: 1,
                        isFile: 1,
                        isLoaded: 1,
                        type: store.item.type,
                        title: store.item.title,
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

    const onEdit = async () => {
        const data = getValues();

        let sendObject = { ...data };

        if (!checkForComplete(sendObject)) return;

        sendObject["id"] = id;

        if(file[0].file){
            sendObject["file"] = file;
            sendObject["type"] = getFileType(file[0].file);
        }
        else {
            sendObject["type"] = file[0].type;
        }

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Файл успешно отредактирован"}
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
                                            text={"Файл удален"}
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
        let sendObject = {};

        sendObject["id"] = id;

        await store.remove(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Документ удален"}
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
                        <FieldText
                            label={"Описание"}
                            required={false}
                            placeholder={"Введите описание"}
                            {...register("text", {
                                value: store.item.text,
                            })}
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

export default EditMediaFilePage;
