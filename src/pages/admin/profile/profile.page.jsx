import React from "react";
import { useForm } from "react-hook-form";

import {userStore} from "../../../store/userStore";

// import Button from "../../../components/public/button/button.component.jsx";
import AlertPopup from "../../../components/general/alert.popup/alert.popup";
import Popup from "../../../components/general/popup/popup.component";
import FieldInput from "../../../components/general/field/field.input.component";

import { AdminIcons } from "../../../components/svgs.js";
import noPhoto from "../../../images/no-photo.jpg";

const ProfilePage = () => {
    const user = userStore.value;
    const { register, handleSubmit, reset } = useForm();

    const [phone, setPhone] = React.useState();
    const [popup, setPopup] = React.useState(<></>);
    const [imageInputKey, setImageInputKey] = React.useState("");
    const [sending, setSending] = React.useState(false);

    const formatPhone = (value) => {
        if (value === "") return "";

        let tmpPhone = value
            .trim()
            .replaceAll(" ", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("+", "")
            .replaceAll("-", "")
            .replaceAll("_", "");

        if (tmpPhone.startsWith("7")) tmpPhone = tmpPhone.substring(1);

        if (tmpPhone.startsWith("8")) tmpPhone = tmpPhone.substring(1);

        tmpPhone = `+7 (${tmpPhone.substring(0, 3)}) ${tmpPhone.substring(3, 6)}-${tmpPhone.substring(
            6,
            8
        )}-${tmpPhone.substring(8, 10)}`;

        return tmpPhone;
    };

    const handlePhotoChange = async (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0];

            if (file.type.match("image.*")) {
                if (file.size <= 1500000) {
                    //await fetchEditPhoto({ id: user.ID, photo: file });
                } else {
                    setPopup(<AlertPopup text={"Файл больше 1,5 Мб."} opened={true} onClose={() => setPopup(<></>)} />);
                }
            } else {
                setPopup(
                    <AlertPopup text={"Файл должен быть изображением."} opened={true} onClose={() => setPopup(<></>)} />
                );
            }

            setImageInputKey(window.global.makeid(30));
        }
    };

    const onUserEditSubmit = async (params) => {
        params.id = user.ID;

        //console.log(params);

        //await fetchEditUser(params);

        setPopup(<></>);
    };

    const onEditBtnClick = () => {
        setPopup(
            <Popup
                title={"Редактирование данных"}
                opened={true}
                onClose={() => {
                    reset();
                    setPopup(<></>);
                }}
            >
                <form onSubmit={handleSubmit(onUserEditSubmit)} className='admin-form'>
                    <fieldset className='admin-form__section'>
                        <FieldInput
                            label={"ФИО:"}
                            placeholder={"..."}
                            layout='flex'
                            size='small'
                            required={true}
                            {...register("fio", {
                                value: user.fio,
                            })}
                        />
                        <FieldInput
                            label={"Телефон:"}
                            type={"phone"}
                            placeholder={"..."}
                            layout='flex'
                            size='small'
                            required={true}
                            {...register("phone", {
                                value: user.phone,
                            })}
                        />
                    </fieldset>
                    <div className='form__controls'>
                        {/* <Button type='submit' spinnerActive={sending} style={{ marginLeft: "auto", display: "block" }}>
                            Отправить
                        </Button> */}
                    </div>
                </form>
            </Popup>
        );
    };

    const onDeleteBtnClick = () => {
        setPopup(
            <AlertPopup
                text={"Вы уверены что хотите удалить?"}
                opened={true}
                onClose={() => setPopup(<></>)}
                buttons={
                    <>
                        {/* <Button theme='text' onClick={() => setPopup(<></>)}>
                            Нет
                        </Button>
                        <Button
                            theme='info'
                            onClick={async () => {
                                //await fetchEditPhoto({ id: user.ID, delete: 1 });
                                setPopup(<></>);
                            }}
                        >
                            Да
                        </Button> */}
                    </>
                }
            />
        );
    };

    React.useEffect(() => {
        setPhone(formatPhone(user.phone));
    }, [user]);

    return (
        <>
            <div className={"commonStyles.title_block"}>
                <h1 className={"commonStyles.title"}>
                    {user?.role === "user" ? "Информация о руководителе школьного театра" : "Информация о профиле"}
                </h1>
            </div>
            <div className={"commonStyles.profile"}>
                <div className={"commonStyles.profile_img_block"}>
                    <img
                        className={"commonStyles.profile_img"}
                        src={user?.photo !== "" ? window.global.baseUrl + user.photo : noPhoto}
                        alt={user?.fio}
                    />
                    <div className={"commonStyles.profile_img_panel"}>
                        {user?.photo !== "" && (
                            <>
                                {/* <Button
                                    type='button'
                                    size='small'
                                    theme='text'
                                    isIconBtn={true}
                                    iconClass='mdi mdi-refresh'
                                    aria-label='Обновить фото'
                                    onClick={(e) => {
                                        document.getElementById("img-profile").click();
                                    }}
                                />
                                <Button
                                    type='button'
                                    theme='text'
                                    size='small'
                                    isIconBtn={true}
                                    iconClass='mdi mdi-delete'
                                    aria-label='Удалить фото'
                                    onClick={onDeleteBtnClick}
                                /> */}
                            </>
                        )}

                    </div>
                    <input
                        className={"commonStyles.profile_img_input"}
                        id='img-profile'
                        type='file'
                        key={imageInputKey}
                        onChange={handlePhotoChange}
                    />
                </div>
                <div className={"commonStyles.profile_info"}>
                    <h2 className={"commonStyles.profile_title"}>{user?.fio}</h2>
                    <ul className={"commonStyles.profile_table"}>
                        <li>
                            <h3 className={"commonStyles.profile_text"}>{user.email ? user.email : user.login}</h3>
                            <p className={"commonStyles.profile_description"}>E-mail (логин)</p>
                        </li>
                        {user.position && (
                            <li>
                                <h3 className={"commonStyles.profile_text"}>{user.position}</h3>
                                <p className={"commonStyles.profile_description"}>Должность</p>
                            </li>
                        )}
                    </ul>
                    {/* <Button
                        theme='outline'
                        type='button'
                        extraClass={"commonStyles.profile_edit_btn"}
                        onClick={onEditBtnClick}
                    >
                        Редактировать
                    </Button> */}
                </div>
                <ul className={"commonStyles.profile_row " + ` ` + "commonStyles.profile_table"}>
                    {phone && (
                        <li>
                            <a
                                href={`tel:${phone}`}
                                className={["commonStyles.profile_item", "commonStyles.link"].join(" ")}
                                rel='noreferrer nofollow noopener'
                                target='_blank'
                            >
                                <span className={"commonStyles.svgIcon"}>{AdminIcons.phone}</span>
                                {phone}
                            </a>
                        </li>
                    )}
                    {user?.org_name && user?.org_short_name && user?.org_name !== "" && user?.org_short_name !== "" && (
                        <li>
                            <p className={"commonStyles.profile_item"}>
                                <span className={"commonStyles.svgIcon"}>{AdminIcons.toolbox}</span>
                                {user?.org_name}
                                <span className={"commonStyles.profile_description"}>{user?.org_short_name}</span>
                            </p>
                        </li>
                    )}
                    {user?.mrsd && user?.mrsd.length > 0 && user?.mrsd[0] !== "" && user?.mrsd[0] !== 0 && (
                        <li>
                            <p className={"commonStyles.profile_item"}>
                                <span className={"commonStyles.svgIcon"}>{AdminIcons.crosshairs}</span>
                                {user.mrsd.map((mrsd) => (
                                    <>№ {mrsd} </>
                                ))}
                                <span className={"commonStyles.profile_description"}>(Межрайон)</span>
                            </p>
                        </li>
                    )}
                </ul>
            </div>
            {popup}
        </>
    );
};

export default ProfilePage;
