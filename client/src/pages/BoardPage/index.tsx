import { useParams } from "react-router-dom";
import { Task } from "../../types";

import styles from "./styles.module.css";
import { STATUS_DISPLAY_NAME, STATUSES } from "../../constants/fieldValues";
import { useStore } from "../../store";
import { useModal } from "../../store/modal";

export const BoardPage = () => {
    const {
        tasks,
        boards,
        loading,
        error,
    } = useStore();
    const { setIsModalOpen, setTaskData } = useModal()
    const { id: idParams } = useParams<{ id: string }>();

    const handleEditTask = (data: Task) => {
        setIsModalOpen(true)
        const { assignee, ...taskData } = data;
        setTaskData({ ...taskData, assigneeId: assignee.id })
    }

    const getBoardName = (id: number) => {
        const board = boards.find((board) => board.id === id);

        return board ? board.name : "Доска не найдена";
    };

    const tasksByStatus = tasks
        .filter(task => task.boardId === Number(idParams))
        .reduce((acc, task) => {
            const status = task.status as string;
            if (!acc[status]) {
                acc[status] = [task];
            } else {
                acc[status].push(task);
            }
            return acc;
        }, {} as { [key: string]: Task[] });

    if (loading) {
        return <div>LOADING</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={`${styles.itemContainer} container`}>
            <h1 className={styles.boardTitle}>{`Доска проекта ${getBoardName(Number(idParams))}`}</h1>
            <ul className={styles.statusList}>
                {STATUSES.map((status) => (
                    <li className={styles.statusListItem} key={status}>
                        <h2 className={styles.statusTitle}>
                            {STATUS_DISPLAY_NAME[status]}
                        </h2>
                        <ol className={styles.tasksList}>
                            {tasksByStatus[status] && tasksByStatus[status].map((task) => (
                                <li className='itemHover' key={task.id} onClick={() => handleEditTask(task)}>
                                    <h3 className={styles.taskTitle}>{task.title}</h3>
                                    <p className={styles.assignee}>{task.assignee.fullName}</p>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ul>
        </div>
    );
};
