import React from 'react';

import Button from "../button/button.component";
import AlertPopup from "../../alert.popup/alert.popup";

import noImage from "../../../images/no_image.png";

const ImageChange = ({image, onChange, onDelete, fileSize = 2}) => {

    const [popup, setPopup] = React.useState(<></>);
    const [photo, setPhoto] = React.useState("");
    const [imageInputKey, setImageInputKey] = React.useState("");

    React.useEffect(() => {

        if(image)
            setPhoto(image);

    }, []);

    React.useEffect(() => {



    }, [photo]);

    async function readFileAsDataURL(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });

        return result_base64;
    }

    const handlePhotoChange = async (e) => {
        if (e.target.files.length > 0) {
            let file = e.target.files[0];

            if (file.type.match("image.*")) {
                if (file.size <= fileSize * 1000000) {
                    const result = await readFileAsDataURL(file);
                    setPhoto(result);
                    onChange(file);
                } else {
                    setPopup(
                        <AlertPopup
                            text={"Файл больше " + fileSize + " Мб."}
                            opened={true}
                            onClose={() => setPopup(<></>)}
                        />
                    );
                }
            } else {
                setPopup(
                    <AlertPopup
                        text={"Файл должен быть изображением."}
                        opened={true}
                        onClose={() => setPopup(<></>)}
                    />
                );
            }

            setImageInputKey(window.global.makeid(30));
        }
    };

    return (
        <>
            <div className="form__profile-img-block">
                <img
                    className="form__profile-img"
                    src={photo === "" ? noImage : photo}
                    alt={"Нет фото"}
                />
                <div className="form__profile-img-panel">
                    {
                        photo === ""
                        &&
                        <Button
                            type="button"
                            size="small"
                            theme="text"
                            isIconBtn={true}
                            iconClass="mdi mdi-plus-circle"
                            aria-label="Добавить фото"
                            onClick={(e) => {
                                document.getElementById("image_change").click();
                            }}
                        />
                    }
                    {
                        photo !== ""
                        &&
                        <>
                            <Button
                                type="button"
                                size={"smaller"}
                                theme={"text"}
                                isIconBtn={"true"}
                                iconClass={"mdi mdi-refresh"}
                                aria-label={"Обновить фото"}
                                title={"Обновить фото"}
                                onClick={(e) => {
                                    document.getElementById("image_change").click();
                                }}
                            />
                            <Button
                                type="button"
                                size={"smaller"}
                                theme={"text"}
                                isIconBtn={"true"}
                                iconClass={"mdi mdi-delete"}
                                aria-label={"Удалить фото"}
                                title={"Удалить фото"}
                                onClick={(e) => {
                                    setPhoto("");
                                    onDelete();
                                }}
                            />
                        </>
                    }
                </div>
                <input
                    className={"--hide"}
                    id="image_change"
                    type="file"
                    key={imageInputKey}
                    onChange={handlePhotoChange}
                />
            </div>
            {popup}
        </>
    );
};

export default ImageChange;