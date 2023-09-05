import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./search.module.scss";

import Button from "../button/button.component";
import FieldInput from "../field/field.input.component";
import MultiSelect from "../multi_select/multi_select.component";

const SearchFilter = ({ config, onSubmit, items, children, front }) => {
    const [opened, setOpened] = React.useState(false);
    const { register, handleSubmit, reset, control } = useForm();

    const variants = {
        open: {
            opacity: 1,
            y: 0,
        },
        closed: {
            opacity: 0,
            y: -10,
        },
    };

    const getSortedUniqueItemsForSelect = (array, type) => {

        if(type === "array")
        {
            let tmpArray = [];

            array.map(item => {
                for (let i = 0; i < item.length; i++) {
                    tmpArray.push(item[i]);
                }
            });

            array = tmpArray;
        }

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        let unique = array.filter(onlyUnique);

        return [...unique].sort((a, b) => {
            if (!a || !b) return -1;

            switch (type) {
                case "int":
                    return a - b;
                case "string":
                    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
                case "date":
                    return moment(a).isAfter(moment(b)) ? 1 : -1;
                default:
                    return a > b ? 1 : -1;
            }
        });
    };

    const getFieldByType = ({ filter, type, key, header, theme, size = "small" }) => {
        if (!filter) return <Fragment key={key} />;

        switch (filter) {
            case "number":
                return (
                    <FieldInput
                        key={key}
                        size={size}
                        theme={theme}
                        extraClass={styles.field}
                        {...register(key, {
                            setValueAs: (v) => (v !== "" ? parseInt(v) : ""),
                        })}
                        defaultValue={""}
                        type={"number"}
                        label={header}
                        placeholder={`...`}
                    />
                );

            case "string":
                return (
                    <FieldInput
                        key={key}
                        theme={theme}
                        size={size}
                        extraClass={styles.field}
                        {...register(key)}
                        label={header}
                        placeholder={`...`}
                    />
                );

            case "date":
                return (
                    <FieldInput
                        size={size}
                        theme={theme}
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        type={"date"}
                        label={header}
                    />
                );

            case "datetime":
                return (
                    <FieldInput
                        size={size}
                        theme={theme}
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        type={"datetime-local"}
                        label={header}
                    />
                );

            case "select":
                return (
                    <FieldInput
                        size={size}
                        theme={theme}
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        type={"select"}
                        label={header}
                        selectItems={getSortedUniqueItemsForSelect(
                            items
                                .map((item) => item[key])
                                .filter((item) => item !== null && item !== ""),
                            type
                        ).map((item) => {
                            return {
                                title: item,
                                value: item,
                            };
                        })}
                    />
                );

            case "multiselect":
                return (
                    <>
                        <p className="form__label">
                            {header}
                        </p>
                        <MultiSelect
                            placeholder={header + "..."}
                            control={control}
                            isMulti={true}
                            name={key}
                            closeMenuOnSelect={false}
                            options={getSortedUniqueItemsForSelect(
                                items
                                    .map((item) => item[key])
                                    .filter((item) => item !== null && item !== ""),
                                type
                            ).map((item) => {
                                return {
                                    label: item,
                                    value: item,
                                };
                            })}
                        />
                    </>
                );

            default:
                return (
                    <FieldInput
                        size={size}
                        theme={theme}
                        extraClass={styles.field}
                        key={key}
                        {...register(key)}
                        label={header}
                    />
                );
        }
    };

    if (front)
        return (
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={[styles.search, styles.search_theme_public].join(
                    " "
                )}
            >
                <div className={[styles.row, styles.row_main_search].join(" ")}>
                    <FieldInput
                        type={"search"}
                        theme={"public"}
                        extraClass={styles.field}
                        placeholder={"Поиск..."}
                        {...register("search_string")}
                    />
                    <Button
                        type="button"
                        theme={"public_primary"}
                        extraClass={styles.button}
                        text={opened ? "Скрыть" : "Фильтр"}
                        aria-label={opened ? "Скрыть" : "Фильтр"}
                        onClick={() => setOpened(!opened)}
                    />
                    {children}
                </div>
                <motion.div
                    animate={opened ? "open" : "closed"}
                    variants={variants}
                >
                    <AnimatePresence>
                        {opened && (
                            <motion.div
                                className={styles.row}
                                initial={{
                                    height: 0,
                                    opacity: 0,
                                    y: -20,
                                    marginTop: "1.25em",
                                }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    y: 0,
                                    marginTop: "1.25em",
                                    transition: {
                                        height: {
                                            duration: 0.25,
                                        },
                                        opacity: {
                                            duration: 0.25,
                                            delay: 0.15,
                                        },
                                        marginTop: {
                                            duration: 0.25,
                                        },
                                    },
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    y: -20,
                                    marginTop: "0",
                                    transition: {
                                        height: {
                                            duration: 0.25,
                                        },
                                        opacity: {
                                            duration: 0.15,
                                        },
                                        marginTop: {
                                            duration: 0.25,
                                        },
                                    },
                                }}
                            >
                                {config.map((item) => getFieldByType(item))}
                                <motion.div className={styles.controls}>
                                    <Button
                                        type="submit"
                                        text="Найти"
                                        theme={"public_primary"}
                                    />
                                    <Button
                                        type="button"
                                        text="Очистить"
                                        theme={"public_text"}
                                        onClick={() => {
                                            reset();
                                            onSubmit();
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </form>
        );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={[styles.search, styles.search_theme_admin].join(" ")}
        >
            <div className={[styles.row, styles.row_main_search].join(" ")}>
                <FieldInput
                    type={"search"}
                    size="small"
                    extraClass={styles.field}
                    placeholder={"Поиск..."}
                    {...register("search_string")}
                />
                <Button
                    type="button"
                    size="small"
                    iconClass="mdi mdi-filter-variant"
                    extraClass={styles.button}
                    text={opened ? "Скрыть" : "Фильтр"}
                    aria-label={opened ? "Скрыть" : "Фильтр"}
                    onClick={() => setOpened(!opened)}
                />
                {children}
            </div>
            <motion.div
                animate={opened ? "open" : "closed"}
                variants={variants}
            >
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            className={styles.row}
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                                marginTop: "1.25em",
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                y: 0,
                                marginTop: "1.25em",
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.25,
                                        delay: 0.15,
                                    },
                                    marginTop: {
                                        duration: 0.25,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                                marginTop: "0",
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.15,
                                    },
                                    marginTop: {
                                        duration: 0.25,
                                    },
                                },
                            }}
                        >
                            {config.map((item) => getFieldByType(item))}
                            <motion.div className={styles.controls}>
                                <Button
                                    type="submit"
                                    size="small"
                                    text="Найти"
                                />
                                <Button
                                    type="button"
                                    text="Очистить"
                                    size="small"
                                    theme="text"
                                    onClick={() => {
                                        reset();
                                        onSubmit();
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </form>
    );
};

export default SearchFilter;
