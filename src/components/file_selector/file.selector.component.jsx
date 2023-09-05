import React from "react";
import axios from "axios";

import Button from "../button/button.component";
import FieldInput from "../field/field.input.component";
import Notif from "../notif/notif.component";
import Popup from "../popup/popup.component";

import styles from "./file.selector.module.scss";
import {AdminIcons, FileIcons} from "../svgs.js";

const FileSelector = ({
                          title,
                          items,
                          multiFiles,
                          withLinks,
                          withDescription,
                          maxFileSize = 5,
                          accept = "*.*",
                          portrait = false,
                          onChange,
                          onError,
                          onDelete,
                      }) => {
    const [photo, setPhoto] = React.useState([]);
    const [photoAddBtnDisabled, setPhotoAddBtnDisabled] = React.useState(false);
    const [photoFileAddBtnDisabled, setPhotoFileAddBtnDisabled] = React.useState(false);
    const [photoInputKey, setPhotoInputKey] = React.useState("");
    const [notif, setNotif] = React.useState(<></>);

    const inputRef = React.createRef();
    const inputFileRef = React.createRef();

    React.useEffect(() => {
        setPhoto(items);
    }, []);

    React.useEffect(() => {
        onChange(photo);
    }, [photo]);

    function getFileType(file) {
        if (file.type.match("image/*")) return "image";

        if (file.type.match("application/pdf")) return "pdf";

        return "file";
    }

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

                if (onError) onError("Не удалось загрузить файл по ссылке");
                else
                    setNotif(
                        <Notif
                            title='Ошибка!'
                            text={"Не удалось загрузить файл по ссылке"}
                            opened={true}
                            onClose={() => {
                                setNotif(<></>);
                            }}
                        />
                    );

                setPhotoAddBtnDisabled(false);
            });
    };

    const handleAddFile = async (e) => {
        let errorFiles = [];

        async function readFileAsDataURL(file) {
            let result_base64 = await new Promise((resolve) => {
                let fileReader = new FileReader();
                fileReader.onload = (e) => resolve(fileReader.result);
                fileReader.readAsDataURL(file);
            });

            return result_base64;
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
                main: photo.length === 0 && tmp_array.length === 0 ? 1 : 0,
                url: result,
                file: file,
                isFile: 1,
                isLoaded: 0,
                title: file.name,
                type: getFileType(file),
                order: getOrderIndex(photo, tmp_array),
            });
        }

        setPhoto([...photo, ...tmp_array]);

        setPhotoInputKey(window.global.makeid(30));

        if (errorFiles.length > 0) {
            setNotif(
                <Popup opened={true} onClose={() => setNotif(<></>)} title={"Ошибка загрузки файлов"}>
                    <h3 className={styles.errorCaption}>{AdminIcons.error} Не удалось добавить следующие файлы:</h3>
                    <ol className={styles.errorList}>
                        {errorFiles.map((error) => (
                            <li key={error.title}>
                                <p className={styles.errorText}>
                                    {error.title} <span className={styles.errorSpan}>{error.text}</span>
                                </p>
                            </li>
                        ))}
                    </ol>
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
        if (itemElement.isLoaded === 1) {
            setNotif(
                <Notif
                    text={
                        "Вы уверены что хотите удалить? Файл сразу удалится с сервера и будет не доступен на публичной странице сайта!"
                    }
                    opened={true}
                    onClose={() => setNotif(<></>)}
                    buttons={
                        <>
                            <Button
                                type='button'
                                size={"small"}
                                text={"Нет"}
                                theme='text'
                                onClick={() => setNotif(<></>)}
                            />
                            <Button
                                type='button'
                                size={"small"}
                                theme='info'
                                text={"Да"}
                                onClick={async () => {
                                    if (itemElement.isFile === 1 && itemElement.isLoaded === 1) {
                                        onDelete(itemElement);
                                    }

                                    let array = [...photo].filter((item) => item.order !== itemElement.order);

                                    setPhoto(setNewOrder(array));

                                    setNotif(<></>);
                                }}
                            />
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
                <div className={`${styles.file}`}>
                    {FileIcons[iconsType]}
                    {
                        withDescription
                            ?
                            <FieldInput
                                type='textarea'
                                extraClass={styles.fileField}
                                placeholder='Введите описание файла..'
                                rows={3}
                                defaultValue={item.description ? item.description : (item.file ? item.file.name : item.title)}
                                onChange={(e) => {
                                    item.description = e.target.value;
                                }}
                            />
                            :
                            <p className={styles.fileName}>{item.description ? item.description : (item.file ? item.file.name : item.title)}</p>
                    }
                </div>
            );
        }

        return (
            <img
                className={styles.image}
                src={item.isFile === 1 && item.isLoaded === 1 ? process.env.REACT_APP_BASE_URL + item.url : item.url}
                alt={"Изображение " + (item.file ? item.file.name : item.title)}
            />
        );
    };

    return (
        <>
            {title && <h2 className={styles.title}>{title}</h2>}
            <ul className={[styles.list, portrait ? styles.list_portrait : ""].join(" ")}>
                {photo.map((item, index) =>
                    item.main ? (
                        <li key={index} className={styles.item}>
                            {getThumbsForGallery(item)}
                            <div className={styles.panel}>
                                <Button
                                    type='button'
                                    theme='white'
                                    size='smaller'
                                    isIconBtn='true'
                                    iconClass={"mdi mdi-close"}
                                    aria-label='Удалить'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleDeletePhoto(item)}
                                />
                            </div>
                            <div className={styles.itemTitle}>1. Главная</div>
                        </li>
                    ) : (
                        <li key={index} className={styles.item}>
                            {getThumbsForGallery(item)}
                            <span className={styles.currentPosition}>{item.order}</span>
                            <div className={styles.panel}>
                                <Button
                                    type='button'
                                    theme='white'
                                    size='smaller'
                                    text={"Сделать главной"}
                                    aria-label='Сделать главной'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleMovePhoto(item.order, 1)}
                                />
                                <Button
                                    type='button'
                                    theme='white'
                                    size='smaller'
                                    isIconBtn='true'
                                    iconClass={"mdi mdi-close"}
                                    aria-label='Удалить'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleDeletePhoto(item)}
                                />
                            </div>
                            <div className={styles.thumbs}>
                                <Button
                                    type='button'
                                    theme='white'
                                    size='smaller'
                                    isIconBtn='true'
                                    iconClass={"mdi mdi-chevron-left"}
                                    aria-label='Назад'
                                    disabled={photoAddBtnDisabled}
                                    onClick={() => handleMovePhoto(item.order, item.order - 1)}
                                />
                                {index < photo.length - 1 && (
                                    <Button
                                        type='button'
                                        theme='white'
                                        size='smaller'
                                        isIconBtn='true'
                                        iconClass={"mdi mdi-chevron-right"}
                                        aria-label='Вперед'
                                        disabled={photoAddBtnDisabled}
                                        onClick={() => handleMovePhoto(item.order, item.order + 1)}
                                    />
                                )}
                            </div>
                        </li>
                    )
                )}
                <li
                    className={[styles.item, styles.item_empty].join(" ")}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleAddFile({
                            target: {
                                files: e.dataTransfer.files,
                            },
                        });
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                >
                    <p className={styles.text}>
                        Начните загружать файлы простым перетаскиванием в любое место этого окна. Ограничение на размер
                        файла 5 MB.
                        <span className={styles.span}>или</span>
                    </p>
                    <Button
                        type='button'
                        text='Выбрать файлы'
                        disabled={photoFileAddBtnDisabled}
                        onClick={() => inputFileRef.current.click()}
                    />
                    <input
                        ref={inputFileRef}
                        key={photoInputKey}
                        onChange={handleAddFile}
                        hidden={true}
                        type='file'
                        accept={accept}
                        multiple={multiFiles}
                    />
                </li>
            </ul>
            {withLinks && (
                <div className={styles.fieldBlock}>
                    <FieldInput
                        ref={inputRef}
                        label={"Ссылка на фото"}
                        type='url'
                        extraClass={styles.field}
                        placeholder='Введите url-адрес...'
                        layout='flex'
                    />
                    <a
                        className={[styles.socialLink, "--hide"].join(" ")}
                        href=''
                        aria-label='Открыть в новой вкладке'
                        title='Открыть в новой вкладке'
                        target={"_blank"}
                        rel='nofollow noreferer noopener'
                    >
                        <span className='mdi mdi-open-in-new'/>
                    </a>
                    <Button
                        type='button'
                        theme='text'
                        size='small'
                        extraClass={styles.fieldBtn}
                        iconClass={"mdi mdi-plus"}
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

export default FileSelector;
