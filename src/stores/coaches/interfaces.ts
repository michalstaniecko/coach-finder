export default interface State {
    coaches: CoachInfo[]
}

export interface CoachInfo {
    id: string,
    firstName: string,
    lastName: string,
    areas: CoachAreaInfo[],
    description: string,
    hourlyRate: number
}

export interface CoachFormInfo {
    id: string,
    firstName: {val: string},
    lastName: {val: string},
    areas: { val: CoachAreaInfo[] },
    description: {val: string},
    hourlyRate: {val: number}
}

export type CoachAreaInfo = 'frontend' | 'backend' | 'career';
