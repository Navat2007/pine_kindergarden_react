import React from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import useAboutStore from "../../../store/admin/aboutStore";

import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import BasicPage from "../../../components/admin/basic.page/basic.page.component";
import TitleBlock from "../../../components/admin/title.block/title.block.component";
import Editor from "../../../components/general/reach.editor/editor.component";
import Button from "../../../components/admin/button/button.component";

const EditAboutPage = () => {
    const store = useAboutStore();
    const navigate = useNavigate();
    const {handleSubmit, reset, control, setValue, getValues} = useForm();

    const [popup, setPopup] = React.useState(<></>);

    React.useEffect(() => {
        const fetchData = async () => {
            await store.loadByID({id: 1});
        };

        fetchData();

        setValue("preview", store.item.preview);
        setValue("text", store.item.text);
    }, []);

    const back = () => navigate(`/admin/about`);

    const checkForComplete = (sendObject) => {
        if (!sendObject.preview || sendObject.preview === "<p><br></p>") {
            setPopup(
                <AlertPopup
                    title='Ошибка'
                    text={"Краткое описание должно быть заполнено."}
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
                    text={"Детальное описание должно быть заполнено."}
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

    const onEdit = async () => {
        const data = getValues();

        let sendObject = {...data};

        if (!checkForComplete(sendObject)) return;

        await store.edit(sendObject);

        if (!store.error) {
            setPopup(
                <AlertPopup
                    title=''
                    text={"Основные сведения успешно отредактированы"}
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
            <TitleBlock
                title={`Редактирование основных сведений`}
                onBack={back}
            />
            <form onSubmit={handleSubmit(onEdit)} className='admin-form'>
                <fieldset className='admin-form__section'>
                    <p className='admin-form__subtitle'>Краткое описание</p>
                    <Editor control={control} name='preview' minHeight={250} buttons={{link: true}}/>
                    <p className='admin-form__subtitle'>Детальное описание</p>
                    <Editor control={control} name='text' minHeight={250} buttons={{link: true}}/>
                </fieldset>
                <div className='admin-form__controls'>
                    <Button type='submit' spinnerActive={store.sending}>
                        Сохранить
                    </Button>
                    <Button
                        type='button'
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

export default EditAboutPage;