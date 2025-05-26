import { requiredMessage } from 'form-validation/validation-message.static'
import * as Yup from 'yup'

export const useLinkTextFormValidation = () => {
    const schema = Yup.object().shape({
        text_display: Yup.string().required(requiredMessage('Text Display')),
        url: Yup.string().required(requiredMessage('URL')),
    })

    const initialValues = {
        text_display: '',
        url: '',
    }

    return {
        schema,
        initialValues,
    }
}
