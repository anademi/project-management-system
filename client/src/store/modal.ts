import { create } from 'zustand';
import { TaskPayload } from '../types';
import { persist } from 'zustand/middleware';

export const TASK_INITIAL_STATE: TaskPayload = {
    assigneeId: 0,
    boardId: 0,
    description: "",
    priority: "Medium",
    title: "",
    status: "Backlog",
};

type ModalStore = {
    taskData: Partial<TaskPayload>,
    setTaskData: (data: Partial<TaskPayload>) => void;
    resetTaskData: () => void;

    draftData: Partial<TaskPayload>;
    updateDraft: (data: Partial<TaskPayload>) => void;
    clearDraft: () => void;

    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
};

export const useModal = create<ModalStore>()(persist((set) => ({
    taskData: TASK_INITIAL_STATE,
    isModalOpen: false,
    setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
    setTaskData: (data: Partial<TaskPayload>) => set((state) => ({
        taskData: { ...state.taskData, ...data }
    })),
    resetTaskData: () => set({ taskData: TASK_INITIAL_STATE }),
    draftData: {},
    updateDraft: (data) => set({ draftData: data }),
    clearDraft: () => set({ draftData: {} }),
}), {
    name: 'form-draft',
    partialize: (state) => ({ draftData: state.draftData })
}));