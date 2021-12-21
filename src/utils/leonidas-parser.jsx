import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from "remark-math";

import leonidasTemplates from './leonidas-templates';

export default function leonidas(text, style) {
    //Define the data object we are returning
    let raw_obj = raw_leonidas(text, style);

    //Define the Modules we are using
    let modules = {
        "rehype": [rehypeSanitize, rehypeRaw, rehypeKatex],
        "remark": [remarkGfm, remarkMath]
    }

    //Break down the string into characters
    let characters = text.split('');

    //Loop through every character
    for (let i = 0; i < characters.length; i++) {
        const element = characters[i];

        //Check if it is the "-" character
        if (element === "-") {
            //Check if the next one is a bracket
            if (characters[i + 1] === "(") {
                //We Know its a leonidas element. We Check for the closing bracket
                let target = "";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === ")") {
                        break;
                    }
                    else {
                        target += element2;
                    }
                }
                target = target.toLowerCase();
                target = target.replace(")", "");

                //Now we get the identifier and the value for checking by the colon
                let target_chars = target.split('');
                let identifier = "";
                let value = "";
                let state = "identifier";
                for (let k = 0; k < target_chars.length; k++) {
                    const element3 = target_chars[k];
                    if (element3 === ":") {
                        state = "value";
                    }
                    else if (state === "identifier") {
                        identifier += element3;
                    }
                    else if (state === "value") {
                        value += element3;
                    }
                }

                //Check Individually
                if (identifier === "add") {
                    if (value === "ttu" && !modules.remark.includes(remarkGfm)) {
                        modules.remark.push(remarkGfm);
                    }
                    else if (value === "math" && !modules.remark.includes(remarkMath)) {
                        modules.remark.push(remarkMath);
                    }
                    else if (value === "html" && !modules.rehype.includes(rehypeRaw)) {
                        modules.rehype.push(rehypeRaw);
                    }
                    else if (value === "katex" && !modules.rehype.includes(rehypeKatex)) {
                        modules.rehype.push(rehypeKatex);
                    }
                    else if (value === "sanitize" && !modules.rehype.includes(rehypeSanitize)) {
                        modules.rehype.push(rehypeRaw);
                    }
                }
                else if (identifier === "remove") {
                    if (value === "ttu" && modules.remark.includes(remarkGfm)) {
                        for (let i = 0; i < modules.remark.length; i++) {
                            const element = modules.remark[i];
                            if (element === remarkGfm) {
                                modules.remark.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (value === "math" && modules.remark.includes(remarkMath)) {
                        for (let i = 0; i < modules.remark.length; i++) {
                            const element = modules.remark[i];
                            if (element === remarkMath) {
                                modules.remark.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (value === "html" && modules.rehype.includes(rehypeRaw)) {
                        for (let i = 0; i < modules.rehype.length; i++) {
                            const element = modules.rehype[i];
                            if (element === rehypeRaw) {
                                modules.rehype.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (value === "katex" && modules.rehype.includes(rehypeKatex)) {
                        for (let i = 0; i < modules.rehype.length; i++) {
                            const element = modules.rehype[i];
                            if (element === rehypeKatex) {
                                modules.rehype.splice(i, 1);
                                break;
                            }
                        }
                    }
                    else if (value === "sanitize" && modules.rehype.includes(rehypeSanitize)) {
                        for (let i = 0; i < modules.rehype.length; i++) {
                            const element = modules.rehype[i];
                            if (element === rehypeSanitize) {
                                modules.rehype.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }

        //Check if it is the "!" character
        if (element === "!") {
            //Check if the next one is a bracket
            if (characters[i + 1] === "(") {
                //We Know its a leonidas element. We Check for the closing bracket
                let target = "";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === ")") {
                        break;
                    }
                    else {
                        target += element2;
                    }
                }
                target = target.toLowerCase();
                target = target.replace(")", "");

                //Now we get the identifier and the value for checking by the colon
                let target_chars = target.split('');
                let identifier = "";
                let value = "";
                let state = "identifier";
                for (let k = 0; k < target_chars.length; k++) {
                    const element3 = target_chars[k];
                    if (element3 === ":") {
                        state = "value";
                    }
                    else if (state === "identifier") {
                        identifier += element3;
                    }
                    else if (state === "value") {
                        value += element3;
                    }
                }

                if (identifier === "theme") {
                    let theme_template = leonidasTemplates[value];
                    let temp_text = theme_template += text;
                    let temp_obj = raw_leonidas(temp_text, style);
                    const keys = Object.keys(raw_obj);
                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        if (raw_obj[key] !== temp_obj[key]) {
                            raw_obj[key] = temp_obj[key];
                        }
                    }
                }
            }
        }
    }

    return new LeonidasObj(raw_obj, modules);
}

export function raw_leonidas(text, style) {
    //Main Object
    let main_object = style;

    //Define the data object we are returning
    let whole_style = style;
    main_object.main_style = whole_style;

    //Break down the string into characters
    let newText = text.replace(" ", "");
    let characters = newText.split('');

    //Loop through every character
    for (let i = 0; i < characters.length; i++) {
        const element = characters[i];

        //Check if it is the "@" character
        if (element === "@") {
            //Check if the next one is a bracket
            if (characters[i + 1] === "(") {

                //We Know its a leonidas element. We Check for the closing bracket
                let target = "";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === ")") {
                        break;
                    }
                    else {
                        target += element2;
                    }
                }
                target = target.replace(" ", "");
                target = target.replace(")", "");

                //Now we get the identifier and the value for checking by the colon
                let target_chars = target.split('');
                let identifier = "";
                let value = "";
                let state = "identifier"
                for (let k = 0; k < target_chars.length; k++) {
                    const element3 = target_chars[k];
                    if (element3 === ":") {
                        state = "value";
                        continue;
                    }

                    if (state === "identifier") {
                        identifier += element3;
                    }

                    if (state === "value") {
                        value += element3;
                    }

                }
                main_object.main_style[identifier] = value;
            }
        }
    }
    return whole_style;
}

export function trim_leonidas(text) {
    //Get Characters
    let return_text = text;
    const characters = text.trim('');
    for (let i = 0; i < characters.length; i++) {
        const element = characters[i];

        //Check if it is the "@" character for a style property
        if (element === "@") {
            let target = "";
            //Check if the next one is a bracket
            if (characters[i + 1] === "(") {
                target += "@";
                target += "(";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === ")") {
                        break;
                    }
                    else {
                        target += element2;
                    }
                }
                target += ")";
                return_text = return_text.replace(target, "");
            }
        }

        //Check if it is the "/" character for a comment
        if (element === "/") {
            let target_2 = "";
            if (characters[i + 1] == "*") {
                target_2 += "/";
                target_2 += "*";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === "*") {
                        if (characters[j + 1] === "/") {
                            break;
                        }
                        break;
                    }
                    else {
                        target_2 += element2;
                    }
                }

                target_2 += "*";
                target_2 += "/";
                return_text = return_text.replace(target_2, "");
            }
        }

        //Check if it is the "-" character for a remove/add statement
        if (element === "-") {
            let target_3 = "";
            //Check if the next one is a bracket
            if (characters[i + 1] === "(") {
                target_3 += "-";
                target_3 += "(";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === ")") {
                        break;
                    }
                    else {
                        target_3 += element2;
                    }
                }
                target_3 += ")";
                return_text = return_text.replace(target_3, "");
            }
        }

        //Check if it is the "!" character for theme/template statement
        if (element === "!") {
            let target_4 = "";
            //Check if the next one is a bracket
            if (characters[i + 1] === "(") {
                target_4 += "!";
                target_4 += "(";
                for (let j = i + 2; j < characters.length; j++) {
                    const element2 = characters[j];
                    if (element2 === ")") {
                        break;
                    }
                    else {
                        target_4 += element2;
                    }
                }
                target_4 += ")";
                return_text = return_text.replace(target_4, "");
            }
        }
    }
    return return_text;
}

export class LeonidasObj {
    constructor (obj, modules) {
        this.values = obj;
        this.modules = modules;
    }
}

export class LeonidasProperty {
    constructor (char, target, identifier, value) {
        this.char = char;
        this.target = target;
        this.identifier = identifier;
        this.value = value;
    }
}

export class LeonidasParserPresets {
    static font_size(text) {
        if (text == "apple") {
            return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        }
        return text;
    }
}