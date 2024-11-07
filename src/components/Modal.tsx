import React, { useEffect } from 'react';
import '../styles/Modal.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('keydown', handleEscape);
        }

        return () => document.removeEventListener('keydown', handleEscape);
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;


