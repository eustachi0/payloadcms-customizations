import * as React from "react";
import { useEffect, useState, useRef } from "react";
import {
    //CustomSaveButtonProps,
    CustomSaveDraftButtonProps,
    //CustomPublishButtonProps,
    //CustomPreviewButtonProps,
} from "payload/types";

import { useForm, useFormFields } from "payload/components/forms";

export const CustomSaveDraftButton: CustomSaveDraftButtonProps = ({ DefaultButton, disabled, label, saveDraft }) => {

    const { setModified } = useForm()


    const [fieldName, setFieldName] = useState<string>(null)
    const fieldsHaveChanged = useRef<any>('')

    // MY ORIGINAL SOLUTION
    const getFieldName = (event) => {
        let eventTarget: any = event.target
        let fieldElement: any = null


        while (eventTarget) {
            if (eventTarget.closest('.render-fields')) {
                if (eventTarget.parentNode.outerHTML.includes('id="field-')) {
                    fieldElement = (eventTarget.parentNode.outerHTML)
                        .split(' ')
                        .filter(x => x.startsWith('id="field-'))[0]
                        .slice(10, -1)
                        .replaceAll('__', ".")
                    setFieldName(fieldElement)
                    break
                } else {
                    eventTarget = eventTarget.parentNode
                }
            } else {
                break
            }
        }
    };


    //check if fieldName is an array to be flattened
    const checkFieldType = (field: any): string | any[] => {
        if (Array.isArray(field) || typeof field === 'object') {
            const arr: string[] = [];
            const flattenArr = (field: any) => {
                for (const val in field) {
                    const fieldVal = field[val];
                    if (Array.isArray(fieldVal) || typeof fieldVal === 'object') {
                        flattenArr(fieldVal);
                    } else {
                        arr.push(fieldVal);
                    }
                }
            }
            flattenArr(field);
            const result: string = arr.join('').replaceAll(',', '')
            if (result === '') {
                return undefined
            }
            return result as string;
        } else {
            if (field === '') {
                return undefined
            }
            return field;
        }
    };

    // check if fieldName value is equal to initialValue
    const checkFieldState = (fieldValue: any, fieldInitialValue: any): boolean => fieldValue !== fieldInitialValue;

    // USE FORM FIELDS
    const field = useFormFields(([fields, dispatch]) => {
        const fieldValue = checkFieldType(fields[fieldName]?.value)
        const fieldInitialValue = checkFieldType(fields[fieldName]?.initialValue)

        return {
            fieldHasChanged: checkFieldState(fieldValue, fieldInitialValue),
        }
    })

    useEffect(() => {
        const timeout = setTimeout(() => {

            if (fieldName !== null) {
                if (fieldName.includes('.id')) {
                    setFieldName(fieldName.split('.')[0])
                }

                if (field.fieldHasChanged === true && !fieldsHaveChanged.current.includes(fieldName)) {
                    fieldsHaveChanged.current = [
                        ...fieldsHaveChanged.current, fieldName
                    ]
                }

                if (field.fieldHasChanged === false && fieldsHaveChanged.current.includes(fieldName)) {
                    fieldsHaveChanged.current = [
                        ...fieldsHaveChanged.current.slice(0, fieldsHaveChanged.current.indexOf(fieldName))
                    ]
                }

                // see fiedls that have changed - for testing purposes
                console.log('fieldsCurrentState.current: ', fieldsHaveChanged.current)
            }

            if (fieldsHaveChanged.current.length === 0) {
                setModified(false)
            }

        }, 250)
        window.addEventListener("click", getFieldName);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("click", getFieldName);
        };
    }, [getFieldName]);

    return (
        <DefaultButton label={label} disabled={disabled} saveDraft={saveDraft} />
    );
};

