import cn from "classnames";
import { ALL_BOARDS_ROUTE, ISSUES_ROUTE } from "../../../constants/routes";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./styles.module.css";
import { useModal } from "../../../store/modal";

export const Navigation = () => {
  const {setIsModalOpen} = useModal();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    pathname === path ||
    pathname.startsWith(path) ||
    pathname.startsWith(path.slice(0, -1));

  const handleCreateButtonClick = () => setIsModalOpen(true);

  return (
    <header>
      <div className={`${styles.headerContainer} container`}>
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            <li>
              <NavLink
                to={ISSUES_ROUTE}
                className={cn(styles.menuLink, {
                  [styles.activePage]: isActive(ISSUES_ROUTE),
                })}
              >
                Все задачи
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ALL_BOARDS_ROUTE}
                className={cn(styles.menuLink, {
                  [styles.activePage]: isActive(ALL_BOARDS_ROUTE),
                })}
              >
                Проекты
              </NavLink>
            </li>
          </ul>
          <button className={`${styles.createTaskBtn} btn`} onClick={handleCreateButtonClick}>
            Создать задачу
          </button>
        </nav>
      </div>
    </header>
  );
};
