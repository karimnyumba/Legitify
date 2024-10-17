import { TextField, Validator, required } from "@asigloo/vue-dynamic-forms";
import {FieldErrors} from "@/interfaces/global.interface";

export const UserAddFields = {
    id: 'add-organization',
    fields: {
        userName: TextField({
            placeholder: 'Full Name',
            validations: [
                Validator({
                    validator: required, text: FieldErrors.REQUIRED
                })
            ]
        }),
        userWallet: TextField({
            placeholder: 'User Address',
            validations: [
                {
                    validator: required,
                    text: FieldErrors.REQUIRED
                }
            ]
        }),
        userPosition: TextField({
            placeholder: 'User Position',
            validations: [
                {
                    validator: required,
                    text: FieldErrors.REQUIRED
                }
            ]
        }),
    },
}