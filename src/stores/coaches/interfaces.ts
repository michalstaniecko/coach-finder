export default interface State {
    coaches: CoachInfo[]
}

export interface CoachInfo {
    id?: string,
    firstName: string,
    lastName: string,
    areas: CoachAreaInfo[],
    description: string,
    hourlyRate: number
}

export type CoachAreaInfo = 'frontend' | 'backend' | 'career';
