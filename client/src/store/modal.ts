import { create } from 'zustand';
import { TaskPayload } from '../types';
import { devtools } from 'zustand/middleware';

export const TASK_INITIAL_STATE: TaskPayload = {
    assigneeId: 0,
    boardId: 0,
    description: "",
    priority: "Medium",
    title: "",
    status: "Backlog",
};

type ModalStore = {
    taskData: TaskPayload,
    setTaskData: (data: Partial<TaskPayload>) => Promise<void>;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => Promise<void>;
    resetTaskData: () => void;
};

export const useModal = create<ModalStore>()(devtools((set) => ({
    taskData: TASK_INITIAL_STATE,
    isModalOpen: false,
    setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
    setTaskData: (data: TaskPayload) => set((state) => ({
        taskData: { ...state.taskData, ...data }
    })),
    resetTaskData: () => set({ taskData: TASK_INITIAL_STATE }),
})));