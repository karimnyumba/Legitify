import {Validator, required, TextAreaField} from "@asigloo/vue-dynamic-forms";
import {FieldErrors} from "@/interfaces/global.interface";

export const DocumentAddFields = {
    id: 'add-organization',
    fields: {
        documentDescription: TextAreaField({
            placeholder: 'Document Description',
            validations: [
                Validator({
                    validator: required, text: FieldErrors.REQUIRED
                })
            ]
        })
    },
}