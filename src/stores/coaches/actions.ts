import type State from "@/stores/coaches/interfaces";
import type {CoachInfo} from "@/stores/coaches/interfaces";


export const addCoach = (context: State, payload: CoachInfo) => {
    const coachData = {
        id: 'c4',
        firstName: payload.firstName,
        lastName: payload.lastName,
        areas: payload.areas,
        description: payload.description,
        hourlyRate: payload.hourlyRate
    }
    context.coaches = [
        ...context.coaches,
        coachData
    ]
}
