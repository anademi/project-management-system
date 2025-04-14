import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div
            className={styles.modalOverlay}
            onClick={handleOverlayClick}
        >
            <div className={styles.modalContent}>
                <button
                    className={styles.modalClose}
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};