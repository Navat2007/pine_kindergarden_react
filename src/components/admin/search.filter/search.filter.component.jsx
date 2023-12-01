import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../button/button.component";
import MultiSelect from "../multi_select/multi_select.component";
import FieldSearch from "../field/field.search.component";
import FieldText from "../field/field.text.component";
import FieldNumber from "../field/field.number.component";
import FieldDate from "../field/field.date.component";

import "./search.filter.scss";
import { AdminIcons } from "../../svgs";
import FieldSelect from "../field/field.select.component";

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
        if (type === "array") {
            let tmpArray = [];

            array.map((item) => {
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

    const getFieldByType = ({ filter, type, key, header }) => {
        if (!filter) return <Fragment key={key} />;

        switch (filter) {
            case "number":
                return (
                    <FieldNumber
                        key={key}
                        label={header}
                        extraClass={`search-filter__field`}
                        placeholder={`...`}
                        {...register(key, {
                            setValueAs: (v) => (v !== "" ? parseInt(v) : ""),
                        })}
                    />
                );

            case "string":
                return (
                    <FieldText
                        key={key}
                        label={header}
                        extraClass={`search-filter__field`}
                        placeholder={`...`}
                        {...register(key)}
                    />
                );

            case "date":
                return <FieldDate key={key} label={header} extraClass={`search-filter__field`} {...register(key)} />;

            case "datetime":
                return (
                    <FieldDate
                        key={key}
                        type={"datetime-local"}
                        label={header}
                        extraClass={`search-filter__field`}
                        {...register(key)}
                    />
                );

            case "select":
                return (
                    <FieldSelect
                        key={key}
                        label={header}
                        extraClass={`search-filter__field`}
                        selectItems={getSortedUniqueItemsForSelect(
                            items.map((item) => item[key]).filter((item) => item !== null && item !== ""),
                            type
                        ).map((item) => {
                            return {
                                title: item,
                                value: item,
                            };
                        })}
                        {...register(key)}
                    />
                );

            case "multiselect":
                return (
                    <>
                        <p className='admin-form__label'>{header}</p>
                        <MultiSelect
                            placeholder={header + "..."}
                            control={control}
                            isMulti={true}
                            name={key}
                            closeMenuOnSelect={false}
                            options={getSortedUniqueItemsForSelect(
                                items.map((item) => item[key]).filter((item) => item !== null && item !== ""),
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
                return <FieldText key={key} label={header} extraClass={`search-filter__field`} {...register(key)} />;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='search-filter' name='search-form'>
            <fieldset className={"search-filter__row"}>
                <FieldSearch
                    placeholder={"Поиск..."}
                    visuallyLabel={false}
                    extraClass={"search-filter__field"}
                    {...register("search_string")}
                />
                <Button
                    type='button'
                    iconName={AdminIcons.filter}
                    aria-label={opened ? "Скрыть" : "Фильтр"}
                    onClick={() => setOpened(!opened)}
                >
                    {opened ? "Скрыть" : "Фильтр"}
                </Button>
                {children}
            </fieldset>
            <motion.div animate={opened ? "open" : "closed"} variants={variants}>
                <AnimatePresence>
                    {opened && (
                        <motion.div
                            className={`search-filter__filed-columns`}
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                y: 0,
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.25,
                                        delay: 0.15,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: -20,
                                transition: {
                                    height: {
                                        duration: 0.25,
                                    },
                                    opacity: {
                                        duration: 0.15,
                                    },
                                },
                            }}
                        >
                            {config.map((item) => getFieldByType(item))}
                            <div className={`search-filter__controls`}>
                                <Button type='submit'>Найти</Button>
                                <Button
                                    type='button'
                                    theme='text'
                                    onClick={() => {
                                        reset();
                                        onSubmit();
                                    }}
                                >
                                    Очистить
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </form>
    );
};

export default SearchFilter;
