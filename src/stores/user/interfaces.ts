export default interface State {
    user: {
        id?: string
        email?: string | null
    }
}

export interface UserForm {
    email: string
    password: string
}
