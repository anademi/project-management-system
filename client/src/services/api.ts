import { Board, Task, TaskPayload, User } from "../types";

export class ApiService {
    private apiHost = `http://localhost:8080/api/v1`;

    private async handleResponse(response: Response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Request failed");
        }

        const result = await response.json();
        return result.data;
    }

    async getTasks(): Promise<Task[]> {
        const response = await fetch(`${this.apiHost}/tasks`);
        return this.handleResponse(response);
    }

    async getBoards(): Promise<Board[]> {
        const response = await fetch(`${this.apiHost}/boards`);
        return this.handleResponse(response);
    }

    async getUsers(): Promise<User[]> {
        const response = await fetch(`${this.apiHost}/users`);
        return this.handleResponse(response);
    }

    async getTasksByBoardId(id: number): Promise<Task[] | never> {
        const response = await fetch(`${this.apiHost}/boards/${id}`);
        return this.handleResponse(response);
    }

    async getTaskById(id: number): Promise<Task | never> {
        const response = await fetch(`${this.apiHost}/tasks/${id}`);
        return this.handleResponse(response);
    }

    async createTask(task: TaskPayload): Promise<{ id: number }> {
        const response = await fetch(`${this.apiHost}/tasks/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        return this.handleResponse(response);
    }

    async updateTaskById(id: number, task: TaskPayload): Promise<{ message: string }> {
        const response = await fetch(`${this.apiHost}/tasks/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });

        return this.handleResponse(response);
    }
}