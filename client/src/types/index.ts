import { STATUSES, PRIORITIES } from "../constants/fieldValues";

export type Status = typeof STATUSES[number]
export type Priority = typeof PRIORITIES[number];

export interface Board {
    id: number,
    name: string,
    description: string,
    taskCount: number | null
}

export interface Task {
    id: number,
    title: string,
    description: string,
    priority: Priority,
    status: Status,
    assignee: Assignee,
    boardName?: string,
    boardId?: number,
}

export interface TaskPayload {
    id?: number;
    assigneeId: number,
    description: string,
    priority: Priority,
    title: string,
    boardId?: number,
    status?: Status,
}

export interface Assignee {
    id: number,
    fullName: string,
    email: string,
    avatarUrl: string
}

export interface User extends Assignee {
    description: string,
    teamId: number,
    teamName: string,
    tasksCount: number
}
