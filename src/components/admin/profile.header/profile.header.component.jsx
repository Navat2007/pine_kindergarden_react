import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../../store/authStore";

import Button from "../button/button";
import Notif from "../../general/notif/notif.component";
import no_photo_man from "../../../images/no_photo_man.png";
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
                    src={user?.photo !== "" ? window.global.baseUrl + user.photo : no_photo_man}
                    alt='Фото профиля'
                />
                <p className='profile-header__title'>{user.login ? user.login : user.email}</p>
                <p className='profile-header__subtitle'>{userRole}</p>
            </div>
            <Button
                type='button'
                iconName={AdminIcons.exit}
                iconBtn='true'
                aria-label='Выйти из профиля'
                onClick={() => setPopupOpened(true)}
            />
            <Notif
                text={"Вы действительно хотите выйти?"}
                opened={popupOpened}
                onClose={() => {
                    setPopupOpened(false);
                }}
                buttons={
                    <>
                        <Button
                            type='button'
                            text='Нет'
                            size={"small"}
                            theme='text'
                            onClick={() => setPopupOpened(false)}
                        />
                        <Button
                            type='button'
                            text='Да'
                            theme='info'
                            size={"small"}
                            onClick={() => {
                                logout();
                                navigate("/", { replace: true });
                            }}
                        />
                    </>
                }
            />
        </div>
    );
};

export default ProfileHeader;
