export default interface State {
    requests: RequestInfo[]
}

export interface RequestInfo {
    id: string,
    coachId: string,
    userEmail: string,
    message: string
}

export interface RequestFormInfo {
    coachId: string,
    email: string,
    message: string
}
