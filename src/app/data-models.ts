export interface DataModel {
    moons: {
        [index: number] : string
    },
    parts: {
        title: string,
        months: MonthModel[]
    }[]
}

export interface MonthModel {
    monthId: number,
    season: "spring" | "summer" | "fall" | "winter",
    year: number,
    weeks: number,
    tournament?: {
        weapon: string,
        reward: string,
        icon: string
    },
    note: string,
    days: {
        [index: number] : DayModel | null
    }
}

export interface DayModel {
    date: string,
    marker?: "f" | "instruct",
    events?: {
        note?: string,
        story?: string,
        holiday?: string,
        birthday?: string,
        monster?: boolean,
        paralogues?: string[],
        fish?: string,
        gardening?: boolean,
        meal?: string,
        choir?: boolean,
        battle?: string
    }
}