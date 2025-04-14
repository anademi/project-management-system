import { create } from "zustand";
import { User, Board, Task, TaskPayload } from "../types";
import { ApiService } from "../services/api";
import { devtools } from "zustand/middleware";

type TaskStore = {
  tasks: Task[];
  users: User[];
  boards: Board[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  createTask: (payload: Partial<TaskPayload>) => Promise<void>;
  updateTask: (id: number, payload: Partial<TaskPayload>) => Promise<void>;
};

const apiService = new ApiService();

export const useStore = create<TaskStore>()(
  devtools((set) => ({
    tasks: [],
    boards: [],
    users: [],
    loading: false,
    error: null,

    fetchData: async () => {
      set({ loading: true });
      const fetchTasks = async () => {
        try {
          const tasks = await apiService.getTasks();
          set({ tasks });
        } catch (error) {
          set({ error: (error as Error).message || "Ошибка загрузки задач" });
        }
      };

      const fetchBoards = async () => {
        try {
          const boards = await apiService.getBoards();
          set({ boards });
        } catch (error) {
          set({ error: (error as Error).message || "Ошибка загрузки досок" });
        }
      };

      const fetchUsers = async () => {
        try {
          const users = await apiService.getUsers();
          set({ users });
        } catch (error) {
          set({
            error: (error as Error).message || "Ошибка загрузки пользователей",
          });
        }
      };

      await Promise.all([fetchTasks(), fetchBoards(), fetchUsers()]);
      set({ loading: false });
    },

    createTask: async (task: TaskPayload) => {
      set({ loading: true });
      try {
        const createResponse = await apiService.createTask(task);
        const taskResponse = await apiService.getTaskById(createResponse.id);

        set((state) => ({
          tasks: [...state.tasks, { ...taskResponse, boardId: task.boardId }],
        }));
      } catch (error) {
        set({ error: (error as Error).message || "Ошибка создания задачи" });
      } finally {
        set({ loading: false });
      }
    },

    updateTask: async (id: number, updatedTask: TaskPayload) => {
      set({ loading: true });
      try {
        await apiService.updateTaskById(id, updatedTask);
        const taskResponse = await apiService.getTaskById(id);

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...taskResponse } : task,
          ),
        }));
      } catch (error) {
        set({ error: (error as Error).message });
      } finally {
        set({ loading: false });
      }
    },
  })),
);
