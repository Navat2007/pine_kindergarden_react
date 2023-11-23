import React from "react";
import { useNavigate } from "react-router-dom";

import {Logout} from "../../../services/user";
import {userStore} from "../../../store/userStore";

import Button from "../button/button.component";
import AlertPopup from "../../general/alert.popup/alert.popup";
import noPhoto from "../../../images/no-photo.jpg";
import "./profile.scss";
import { AdminIcons } from "../../svgs";

const ProfileHeader = ({ className }) => {
    const navigate = useNavigate();

    const [userRole, setUserRole] = React.useState("");
    const [popupOpened, setPopupOpened] = React.useState(false);

    React.useEffect(() => {
        switch (userStore.value.role) {
            case "superadmin":
                setUserRole("Главный администратор");
                break;
            case "admin":
                setUserRole("Администратор");
                break;
            case "user":
                setUserRole("Пользователь");
                break;
            default:
                setUserRole("");
                break;
        }
    }, [userStore.value.role]);

    return (
        <div className='profile-header'>
            <div
                className='profile-header__inner'
                onClick={() => {
                    //navigate("/profile");
                }}
            >
                <img
                    className='profile-header__image'
                    src={userStore.value?.photo !== "" ? window.global.baseUrl + userStore.value.photo : noPhoto}
                    alt='Фото профиля'
                />
                <p className='profile-header__title'>{userStore.value.login ? userStore.value.login : userStore.value.email}</p>
                <p className='profile-header__subtitle'>{userRole}</p>
            </div>
            <Button
                type='button'
                iconName={AdminIcons.exit}
                isIconBtn
                aria-label='Выйти из профиля'
                onClick={() => setPopupOpened(true)}
            />
            <AlertPopup
                text={"Вы действительно хотите выйти?"}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
                buttons={
                    <>
                        <Button theme={"text"} type='button' onClick={() => setPopupOpened(false)}>
                            Нет
                        </Button>
                        <Button
                            type='button'
                            onClick={() => {
                                Logout();
                                navigate("/", { replace: true });
                            }}
                        >
                            Да
                        </Button>
                    </>
                }
            />
        </div>
    );
};

export default ProfileHeader;
