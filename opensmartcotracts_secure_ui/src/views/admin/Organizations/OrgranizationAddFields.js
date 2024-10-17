import {EmailField, TextField, Validator, required, SelectField} from "@asigloo/vue-dynamic-forms";
import {FieldErrors} from "@/interfaces/global.interface";

export const OrgarnizationAddFields = {
    id: 'add-organization',
    fields: {
        institutionName: TextField({
            placeholder: 'Institution Name',
            validations: [
                Validator({
                    validator: required, text: FieldErrors.REQUIRED
                })
            ]
        }),
        institutionAddress: TextField({
            placeholder: 'Institution Address',
            validations: [
                {
                    validator: required,
                    text: FieldErrors.REQUIRED
                }
            ]
        }),
        institutionLocation: TextField({
            placeholder: 'Institution Location',
            validations: [
                {
                    validator: required,
                    text: FieldErrors.REQUIRED
                }
            ]
        }),
    },
}