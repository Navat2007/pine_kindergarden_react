import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";

import Button from "../button/button.component";
import AlertPopup from "../../general/alert.popup/alert.popup";
import noPhoto from "../../../images/no-photo.jpg";
import "./profile.scss";
import { AdminIcons } from "../../svgs";

const ProfileHeader = ({ className }) => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const [userRole, setUserRole] = React.useState("");
    const [popupOpened, setPopupOpened] = React.useState(false);

    React.useEffect(() => {
        switch (user.role) {
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
    }, [user.role]);

    return (
        <div className='profile-header'>
            <div
                className='profile-header__inner'
                onClick={() => {
                    navigate("/profile");
                }}
            >
                <img
                    className='profile-header__image'
                    src={user?.photo !== "" ? window.global.baseUrl + user.photo : noPhoto}
                    alt='Фото профиля'
                />
                <p className='profile-header__title'>{user.login ? user.login : user.email}</p>
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
                                logout();
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
