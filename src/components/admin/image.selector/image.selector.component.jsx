import React from "react";
import axios from "axios";

import Button from "../button/button.component";
import FieldInput from "../field/field.text.component";
import AlertPopup from "../../general/alert.popup/alert.popup";
import Popup from "../../general/popup/popup.component";
import "./image.selector.scss";
import {AdminIcons, FileIcons} from "../../svgs.js";
import FieldTextarea from "../field/field.textarea.component";

const ImageSelector = ({
    items,
    extraClass,
    orientation = "landscape",
    multiFiles,
    onlyOneFile,
    accept = "image/*",
    withLinks,
    withDescription,
    maxFileSize = 5,
    onChange,
    onDelete,
    onError,
}) => {
    const [photo, setPhoto] = React.useState([]);
    const [photoAddBtnDisabled, setPhotoAddBtnDisabled] = React.useState(false);
    const [photoFileAddBtnDisabled, setPhotoFileAddBtnDisabled] = React.useState(false);
    const [photoInputKey, setPhotoInputKey] = React.useState("");
    const [notif, setNotif] = React.useState(<></>);

    const inputRef = React.createRef();
    const inputFileRef = React.createRef();

    React.useEffect(() => {
        onChange(photo);
    }, [photo]);

    React.useEffect(() => {
        setPhoto(items);
    }, []);

    function getOrderIndex(array, tmpArray) {
        let index = 0;

        array.map((item) => {
            if (item.order > index) index = item.order;
        });

        tmpArray.map((item) => {
            if (item.order > index) index = item.order;
        });

        return ++index;
    }

    function setNewOrder(array) {
        return array.map((item, index) => {
            if (index === 0) item.main = 1;
            else item.main = 0;

            item.order = index + 1;

            return item;
        });
    }

    function moveElementInArray(input, from, to) {
        let numberOfDeletedElm = 1;

        const elm = input.splice(from, numberOfDeletedElm)[0];

        numberOfDeletedElm = 0;

        input.splice(to, numberOfDeletedElm, elm);
    }

    const handleAddPhoto = async () => {
        //https://source.unsplash.com/random/200x200?sig=1

        setPhotoAddBtnDisabled(true);

        const value = inputRef.current.value;
        const link = value?.includes("http") ? value : "http://" + value;

        await axios
            .get(link)
            .then((res) => {
                if (res.status === 200) {
                    setPhoto([
                        ...photo,
                        {
                            main: photo.length === 0 ? 1 : 0,
                            url: link,
                            order: getOrderIndex(photo),
                        },
                    ]);

                    setPhotoAddBtnDisabled(false);
                }
            })
            .catch((err) => {
                //console.log(err);

                if (onError) onError("Не удалось загрузить изображение по ссылке");
                else
                    setNotif(
                        <AlertPopup
                            title='Ошибка!'
                            text={"Не удалось загрузить изображение по ссылке"}
                            opened={true}
                            onClose={() => {
                                setNotif(<></>);
                            }}
                        />
                    );

                setPhotoAddBtnDisabled(false);
            });
    };

    const handleAddFilePhoto = async (e) => {
        let errorFiles = [];

        async function readFileAsDataURL(file) {
            return await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            });
        }

        let tmp_array = [];
        let match = accept.split(",").join("|");

        for (const file of e.target.files) {
            if (accept === "*.*" || file.type.match(match)) {
                if (file.size <= maxFileSize * 1000000) {
                } else {
                    errorFiles.push({
                        title: file.name,
                        text: "Файл больше " + maxFileSize + " Мб.",
                    });
                    continue;
                }
            } else {
                errorFiles.push({
                    title: file.name,
                    text: "Файл должен быть изображением.",
                });
                continue;
            }

            const result = await readFileAsDataURL(file);

            tmp_array.push({
                main: (photo.length === 0 && tmp_array.length === 0) || onlyOneFile ? 1 : 0,
                url: result,
                file: file,
                isFile: 1,
                isLoaded: 0,
                order: onlyOneFile ? 1 : getOrderIndex(photo, tmp_array),
            });

            if (onlyOneFile) break;
        }

        if (onlyOneFile) setPhoto(tmp_array);
        else setPhoto([...photo, ...tmp_array]);

        setPhotoInputKey(window.global.makeid(30));

        if (errorFiles.length > 0) {
            setNotif(
                <Popup opened={true} onClose={() => setNotif(<></>)} title={"Ошибка загрузки файлов"}>
                    <div className='admin-image-alert'>
                        <h3 className={`admin-image-alert__caption`}>
                            {AdminIcons.error} Не удалось добавить следующие файлы:
                        </h3>
                        <ol className={`admin-image-alert__list`}>
                            {errorFiles.map((error) => (
                                <li className='admin-image-alert__item' key={error.title}>
                                    <p className={`admin-image-alert__text`}>
                                        {error.title}{" "}
                                        <span className={`admin-image-alert__error-span`}>{error.text}</span>
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Popup>
            );
        }
    };

    const handleMovePhoto = (elementOrder, toOrder) => {
        let array = [...photo];

        let currentIndex = array.findIndex((item) => item.order === elementOrder);
        let wantIndex = array.findIndex((item) => item.order === toOrder);

        moveElementInArray(array, currentIndex, wantIndex);

        setPhoto(setNewOrder(array));
    };

    const handleDeletePhoto = (itemElement) => {
        //console.log(itemElement);

        if (itemElement.isLoaded === 1) {
            setNotif(
                <AlertPopup
                    text={
                        "Вы уверены что хотите удалить? Файл сразу удалится с сервера и будет не доступен на публичной странице сайта!"
                    }
                    opened={true}
                    onClose={() => setNotif(<></>)}
                    buttons={
                        <>
                            <Button type='button' theme='text' onClick={() => setNotif(<></>)}>
                                Нет
                            </Button>
                            <Button
                                type='button'
                                onClick={async () => {
                                    if (itemElement.isFile === 1 && itemElement.isLoaded === 1) {
                                        onDelete(itemElement);
                                    }

                                    let array = [...photo].filter((item) => item.order !== itemElement.order);

                                    setPhoto(setNewOrder(array));

                                    setNotif(<></>);
                                }}
                            >
                                Да
                            </Button>
                        </>
                    }
                />
            );
        } else {
            let array = [...photo].filter((item) => item.order !== itemElement.order);

            setPhoto(setNewOrder(array));
        }
    };

    const getThumbsForGallery = (item) => {
        if ((item.file && item.file.type.match("application/")) || (item.type && item.type !== "image")) {
            let iconsType = "default";

            if (item.title.includes(".doc")) {
                iconsType = "doc";
            }

            if (item.title.includes(".xls")) {
                iconsType = "xls";
            }

            if (item.title.includes(".pdf")) {
                iconsType = "pdf";
            }

            return (
                <div className={`admin-file-block`}>
                    {FileIcons[iconsType]}
                    {withDescription ? (
                        <FieldTextarea
                            label='Название'
                            type='textarea'
                            extraClass={"admin-file-block__field"}
                            placeholder='Введите описание файла..'
                            rows={3}
                            defaultValue={item.description ? item.description : item.file ? item.file.name : item.title}
                            onChange={(e) => {
                                item.description = e.target.value;
                            }}
                        />
                    ) : (
                        <p className={"admin-file-block__title"}>
                            {item.description ? item.description : item.file ? item.file.name : item.title}
                        </p>
                    )}
                </div>
            );
        }

        return (
            <img
                className={"admin-file-selector__image"}
                src={item.isFile === 1 && item.isLoaded === 1 ? process.env.REACT_APP_BASE_URL + item.url : item.url}
                alt={"Изображение " + (item.file ? item.file.name : item.title)}
            />
        );
    };

    return (
        <>
            <ul className={`admin-image-selector${extraClass ? ` ${extraClass}` : ``}`}>
                {photo.map((item, index) =>
                    item.main ? (
                        <li
                            key={index}
                            className={`admin-image-selector__item${
                                orientation === "portrait" ? ` admin-image-selector__item_portrait` : ``
                            }${extraClass ? ` ${extraClass}-item` : ``}`}
                        >
                            {getThumbsForGallery(item)}
                            <div
                                className={`admin-image-selector__item-panel${
                                    extraClass ? ` ${extraClass}-item-panel` : ``
                                }`}
                            >
                                <Button
                                    type='button'
                                    isIconBtn='true'
                                    theme='white'
                                    iconName={AdminIcons.close}
                                    aria-label='Удалить'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleDeletePhoto(item)}
                                />
                            </div>
                            {photo.length > 1 && (
                                <p className={`admin-image-selector__title${extraClass ? ` ${extraClass}-title` : ``}`}>
                                    1. Главная
                                </p>
                            )}
                        </li>
                    ) : (
                        <li
                            key={index}
                            className={`admin-image-selector__item${
                                orientation === "portrait" ? ` admin-image-selector__item_portrait` : ``
                            }${extraClass ? ` ${extraClass}-item` : ``}`}
                        >
                            {getThumbsForGallery(item)}
                            <span
                                className={`admin-image-selector__current-position${
                                    extraClass ? ` ${extraClass}-current-position` : ``
                                }`}
                            >
                                {item.order}
                            </span>
                            <div
                                className={`admin-image-selector__item-panel${
                                    extraClass ? ` ${extraClass}-item-panel` : ``
                                }`}
                            >
                                <Button
                                    type='button'
                                    theme='white'
                                    extraClass='admin-image-selector__button'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleMovePhoto(item.order, 1)}
                                >
                                    Сделать главной
                                </Button>
                                <Button
                                    type='button'
                                    isIconBtn='true'
                                    theme='white'
                                    iconName={AdminIcons.close}
                                    aria-label='Удалить'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleDeletePhoto(item)}
                                />
                            </div>
                            <div className={`admin-image-selector__thumbs${extraClass ? ` ${extraClass}-thumbs` : ``}`}>
                                <Button
                                    type='button'
                                    isIconBtn='true'
                                    theme='white'
                                    iconName={AdminIcons.chevron_left}
                                    aria-label='Назад'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleMovePhoto(item.order, item.order - 1)}
                                />
                                {index < photo.length - 1 && (
                                    <Button
                                        type='button'
                                        theme='white'
                                        isIconBtn='true'
                                        iconName={AdminIcons.chevron_right}
                                        aria-label='Вперед'
                                        disabled={photoAddBtnDisabled}
                                        onClick={() => handleMovePhoto(item.order, item.order + 1)}
                                    />
                                )}
                            </div>
                        </li>
                    )
                )}
                {(photo.length === 0 || !onlyOneFile) && (
                    <li
                        className={`admin-image-selector__download-block${
                            extraClass ? ` ${extraClass}-download-block` : ``
                        }`}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleAddFilePhoto({
                                target: {
                                    files: e.dataTransfer.files,
                                },
                            });
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <p
                            className={`admin-image-selector__download-text${
                                extraClass ? ` ${extraClass}-download-text` : ``
                            }`}
                        >
                            {onlyOneFile && "Ограничение на кол-во файлов: 1 файл"}
                            <br />
                            <span>Ограничение на размер изображения: {maxFileSize} MB.</span>
                            <br />
                            <br />
                            Начните загружать изображения простым перетаскиванием в любое место этого окна.
                            <span
                                className={`admin-image-selector__download-span${
                                    extraClass ? ` ${extraClass}-download-span` : ``
                                }`}
                            >
                                или
                            </span>
                        </p>
                        <Button
                            type='button'
                            disabled={photoFileAddBtnDisabled}
                            onClick={() => inputFileRef.current.click()}
                        >
                            {onlyOneFile ? "Выбрать файл" : "Выбрать файлы"}
                        </Button>
                        <input
                            ref={inputFileRef}
                            key={photoInputKey}
                            onChange={handleAddFilePhoto}
                            hidden={true}
                            type='file'
                            accept={accept}
                            multiple={multiFiles}
                        />
                    </li>
                )}
            </ul>
            {withLinks && (
                <div className={`admin-image-selector__group-block${extraClass ? ` ${extraClass}-group-block` : ``}`}>
                    <FieldInput
                        ref={inputRef}
                        label={"Ссылка на фото"}
                        type='url'
                        placeholder='Введите url-адрес...'
                        layout='flex'
                    />
                    <Button
                        type='button'
                        theme='text'
                        iconName={AdminIcons.plus}
                        isIconBtn='true'
                        aria-label='Добавить поле'
                        disabled={photoAddBtnDisabled}
                        onClick={handleAddPhoto}
                    />
                </div>
            )}
            {notif}
        </>
    );
};

export default ImageSelector;
