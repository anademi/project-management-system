import styles from './styles.module.css';
import { Link } from "react-router-dom";
import { BOARD_ROUTE } from "../../constants/routes";
import { useStore } from "../../store";

export const AllBoardsPage = () => {
    const {
        boards,
        loading,
        error,
    } = useStore();

    const elements = boards.map((board) => {
        const { id, name, description, taskCount } = board;

        return (
            <li className={`${styles.listItem} itemHover`} key={id}>
                <Link to={`${BOARD_ROUTE}/${id}`}>
                    <h2 className={styles.boardTitle}>{name}</h2>
                    <p className={styles.boardDescr}>Описание: {description}</p>
                    <p className={styles.taskCount}>Количество задач: {taskCount}</p>
                </Link>
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

    if (!boards.length) return <div>Доски не найдены</div>;

    return (
        <div className={`${styles.boardsContainer} container`}>
            <h1 className='sr-only'>Страница всех проектов</h1>
            <ul className={styles.list}>
                {elements}
            </ul>
        </div>
    );
}