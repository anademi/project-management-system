import { Task } from '../../types';
import { STATUSES, STATUS_DISPLAY_NAME } from '../../constants/fieldValues';

import styles from './styles.module.css'
import { useStore } from "../../store";
import { useModal } from "../../store/modal";
import { useMemo, useState } from 'react';

type Filters = {
    searchQuery: string,
    statusFilter: string,
    boardNameFilter: string
}

export const IssuesPage = () => {
    const {
        boards,
        tasks,
        loading,
        error,
    } = useStore();
    const {
        setIsModalOpen, setTaskData, resetTaskData
    } = useModal();

    const [filters, setFilters] = useState({} as Filters);

    const handleEditTask = (data: Task) => {
        setIsModalOpen(true)
        const { assignee, ...taskData } = data;
        setTaskData({ ...taskData, assigneeId: assignee.id })
    }

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    const handleCreateButtonClick = () => { resetTaskData(); setIsModalOpen(true) }

    const { searchQuery, statusFilter, boardNameFilter } = filters;
    const filteredTasks = useMemo(
        () =>
            tasks.filter((task) => {
                const matchesSearch = !searchQuery || task.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                    task.assignee.fullName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                const matchesStatus = !statusFilter || task.status === statusFilter;
                const matchesBoard = !boardNameFilter || task.boardName === boardNameFilter;

                return matchesSearch && matchesStatus && matchesBoard;
            }),
        [tasks, searchQuery, statusFilter, boardNameFilter],
    );

    const elements = filteredTasks.map((task) => {
        const { id, title, boardName, status, assignee } = task;

        return (
            <li className={`${styles.listItem} itemHover`} key={id} onClick={() => handleEditTask(task)}>
                <h2 className={styles.taskTitle}>{title}</h2>
                <p className={styles.boardName}>{boardName}</p>
                <p className={styles.statusLabel}>{STATUS_DISPLAY_NAME[status]}</p>
                <p className={styles.assigneeName}>{assignee.fullName}</p>
            </li>
        )
    })

    if (loading) {
        return (
            <div>
                LOADING
            </div>
        );
    }

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    if (!tasks.length) return <div>Доски не найдены</div>;

    return (
        <div className={`${styles.issuesContainer} container`}>
            <h1 className='sr-only'>Страница всех задач</h1>
            <form className={styles.toolbar}>
                <input
                    className={styles.searchField}
                    type='text'
                    name='searchQuery'
                    placeholder="Поиск по названию задачи или исполнителю"
                    value={searchQuery}
                    onChange={handleFilter} />
                <div className={styles.filters}>
                    <select
                        className={styles.selectFilter}
                        name='statusFilter'
                        id='statusFilter'
                        value={statusFilter}
                        onChange={handleFilter}>
                        <option value=''>Статус задачи</option>
                        {STATUSES.map((status, i) => {
                            return (
                                <option value={status} key={i}>{STATUS_DISPLAY_NAME[status]}</option>
                            )
                        })}
                    </select>
                    <select
                        className={styles.selectFilter}
                        name='boardNameFilter'
                        id='boardNameFilter'
                        value={boardNameFilter}
                        onChange={handleFilter}>
                        <option value=''>Проект</option>
                        {boards.map((board, i) => {
                            return (
                                <option value={board.name} key={i}>{board.name}</option>
                            )
                        })}
                    </select>
                </div>
            </form>
            <ol className={styles.list}>
                {elements}
            </ol>
            <button className={`${styles.createTaskBtn} btn`} onClick={handleCreateButtonClick}>
                Создать задачу
            </button>
        </div>

    );
}