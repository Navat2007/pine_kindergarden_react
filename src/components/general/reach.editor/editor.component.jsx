import React from 'react';
import JoditEditor from "jodit-react";
import {Controller} from "react-hook-form";

// all options from https://xdsoft.net/jodit/docs/,
const Editor = ({control, name, readonly, placeholder = "", required, value, buttons = {
    link: false,
}, minHeight = 500, ...rest}) => {

    const config = {
        readonly: readonly,
        toolbarSticky: false,
        toolbarAdaptive: false,
        about: false,
        addNewLine: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        minHeight: minHeight + 'px',
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        defaultActionOnPaste: "insert_only_text",
        buttons: "bold,italic,underline,ul,align,font,fontsize,superscript,subscript,|,undo,redo,|,fullsize,preview,print,|", //fontsize
        //preset: 'inline',
        placeholder: placeholder
    };

    Object.keys(buttons).map((item) => {
        if(buttons[item]) {
            config.buttons += `,${item}`;
        }
    })

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={value}
            rules={{required: required}}
            render={({field}) => (
                <JoditEditor
                    ref={field.ref}
                    config={config}
                    value={field.value}
                    onChange={(value) => {
                    }}
                    onBlur={(value) => {
                        field.onChange(value);
                    }}
                    {...rest}
                />
            )}
        />
    );
};

export default Editor;