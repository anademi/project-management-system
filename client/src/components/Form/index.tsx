import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BOARD_ROUTE, ISSUES_ROUTE } from "../../constants/routes";
import { PRIORITIES, STATUS_DISPLAY_NAME, STATUSES } from "../../constants/fieldValues";

import styles from "./styles.module.css";
import { useStore } from "../../store";
import { TASK_INITIAL_STATE, useModal } from "../../store/modal";
import { Status, TaskPayload } from "../../types";

const numericFields = ["assigneeId", "boardId"];

export const Form = () => {
    const {
        tasks,
        boards,
        users,
        createTask,
        updateTask,
    } = useStore();
    const { setIsModalOpen, taskData, setTaskData, resetTaskData, draftData, updateDraft, clearDraft } = useModal()
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id: idParams } = useParams<{ id: string }>();
    const mode = taskData.id !== undefined ? 'edit' : 'create';

    const formTitle = mode === 'create' ? "Создание задачи" : "Редактирование задачи";
    const isBoardPage = pathname.includes(`${BOARD_ROUTE}/`);
    const isButtonDisabled =
        !taskData.title ||
        !taskData.description ||
        !taskData.boardId ||
        !taskData.priority ||
        !taskData.status ||
        !taskData.assigneeId


    useEffect(() => {
        if (isBoardPage && idParams) {
            setTaskData({
                ...taskData,
                boardId: Number(idParams),
            });
        }
    }, [idParams, isBoardPage]);

    useEffect(() => {
        if (Object.keys(draftData).length > 0) {
            setTaskData({ ...TASK_INITIAL_STATE, ...draftData });
        }

        return () => {
            clearDraft();
            resetTaskData();
        };
    }, []);

    useEffect(() => {
        if (mode === 'create') {
            updateDraft(taskData);
        }

    }, [taskData, mode]);

    const currentTask = taskData.id && tasks.find(task => task.id === taskData.id);

    const getBoardName = (id: string | undefined) => {
        const board = boards.find((board) => board.id === Number(id));

        return board ? board.name : "Доска не найдена";
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: numericFields.includes(name) ? Number(value) : (name === 'status' ? value as Status : value),
        } as Partial<TaskPayload>);
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (mode === "edit" && taskData.id) {
                await updateTask(taskData.id, taskData)
            } else {
                await createTask(taskData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>{formTitle}</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <label>
                    <span className={styles.inputTitle}>Название задачи</span>
                    <input
                        className={styles.textField}
                        type="text"
                        id="taskName"
                        name="title"
                        placeholder="Введите название задачи"
                        maxLength={100}
                        required
                        value={taskData.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span className={styles.inputTitle}>Описание</span>
                    <textarea
                        className={styles.textField}
                        rows={4}
                        id="taskDescription"
                        name="description"
                        placeholder="Введите описание задачи"
                        value={taskData.description}
                        onChange={handleChange}
                    />
                </label>
                {isBoardPage ? (
                    <label>
                        <span className={styles.inputTitle}>Проект</span>
                        <select
                            className={styles.selectField}
                            name="boardId"
                            value={taskData.boardId}
                            onChange={handleChange}
                            disabled
                        >
                            <option value={idParams}>
                                {getBoardName(idParams)}
                            </option>
                        </select>
                    </label>
                ) : (
                    <label>
                        <span className={styles.inputTitle}>Проект</span>
                        <select
                            className={styles.selectField}
                            name="boardId"
                            value={taskData.boardId || 0}
                            onChange={handleChange}
                        >
                            <option value={0}>Не выбран</option>
                            {boards.map((element) => {
                                return <option key={element.id} value={element.id}>{element.name}</option>;
                            })}
                        </select>
                    </label>
                )}

                <label>
                    <span className={styles.inputTitle}>Приоритет</span>
                    <select
                        className={styles.selectField}
                        name="priority"
                        value={taskData.priority as string}
                        onChange={handleChange}
                    >
                        {PRIORITIES.map((element) => {
                            return <option key={element} value={element as string}>{element}</option>;
                        })}
                    </select>
                </label>
                <label>
                    <span className={styles.inputTitle}>Статус</span>
                    <select
                        className={styles.selectField}
                        name="status"
                        value={taskData.status as string}
                        onChange={handleChange}
                        disabled={mode === 'create'}
                    >
                        {STATUSES.map((element) => {
                            return <option key={element} value={element as string}>{STATUS_DISPLAY_NAME[element]}</option>;
                        })}
                    </select>
                </label>
                <label>
                    <span className={styles.inputTitle}>Исполнитель</span>
                    <select
                        className={styles.selectField}
                        name="assigneeId"
                        value={taskData.assigneeId}
                        onChange={handleChange}
                    >
                        <option value={0}>Не выбран</option>
                        {users.map((element) => {
                            return <option key={element.id} value={element.id}>{element.fullName}</option>;
                        })}
                    </select>
                </label>
                <div className={styles.formBtnContainer}>
                    {pathname.includes(ISSUES_ROUTE) && currentTask && (
                        <input
                            className="btn"
                            type="button"
                            value="Перейти на доску"
                            disabled={isButtonDisabled}
                            onClick={() => navigate(`${BOARD_ROUTE}/${currentTask.boardId}`)}
                        />

                    )}
                    <input
                        className="btn"
                        type="submit"
                        value={(mode === 'create') ? 'Создать' : 'Обновить'}
                        disabled={isButtonDisabled}
                    />
                </div>
            </form>
        </div>
    );
};
