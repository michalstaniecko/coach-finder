import type {Unsubscribe} from 'firebase/database'

export default interface State {
    requests: RequestInfo[]
    unsubscribeSnapshot: Unsubscribe | null
}

export interface RequestInfo {
    id?: string,
    coachId: string,
    userEmail: string,
    message: string,
    firstName?: string
}

export interface RequestFormInfo {
    coachId: string,
    email: string,
    firstName: string,
    message: string
}
