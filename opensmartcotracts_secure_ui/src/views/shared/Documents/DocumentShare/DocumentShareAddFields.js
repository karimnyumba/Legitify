import {Validator, required, TextAreaField, TextField} from "@asigloo/vue-dynamic-forms";
import {FieldErrors} from "@/interfaces/global.interface";

export const DocumentShareAddFields = {
    id: 'add-organization',
    fields: {
        receiver: TextField({
            placeholder: 'Recipient Address',
            validations: [
                Validator({
                    validator: required, text: FieldErrors.REQUIRED
                })
            ]
        }),
        comment: TextAreaField({
            placeholder: 'Comment',
            validations: [
                Validator({
                    validator: required, text: FieldErrors.REQUIRED
                })
            ]
        })
    },
}