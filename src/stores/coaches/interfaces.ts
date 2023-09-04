export default interface State {
    coaches: CoachInfo[]
}

export interface CoachInfo {
    id: string,
    firstName: string,
    lastName: string,
    areas: string[],
    description: string,
    hourlyRate: number
}
