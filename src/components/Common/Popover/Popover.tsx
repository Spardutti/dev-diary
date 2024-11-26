import type { ReactNode } from 'react';

interface PopoverProps {
	children: ReactNode;
	triggerRef: React.RefObject<HTMLButtonElement>;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
}

const Popover = ({ children, triggerRef, isOpen, setOpen }: PopoverProps) => {
	return <p>asd</p>;
};

export default Popover;
