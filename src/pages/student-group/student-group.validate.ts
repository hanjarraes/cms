import * as Yup from 'yup'

export interface IQuiz {
    name:string
}

export const useQuizFormValidation = () => {
    const schema = Yup.object().shape({

    })

    const initialValues:IQuiz = {
        name: '',
    }

    return {
        schema,
        initialValues,
    }
}
