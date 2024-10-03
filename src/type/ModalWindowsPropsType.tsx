export interface ModalWindowProps {
    show: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}