import type { ReactNode } from 'react';
import { Popover as AriaPopover, Dialog, OverlayArrow } from 'react-aria-components';

interface PopoverProps {
	children: ReactNode;
	triggerRef: React.RefObject<HTMLButtonElement>;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
}

const Popover = ({ children, triggerRef, isOpen, setOpen }: PopoverProps) => {
	return (
		<AriaPopover
			triggerRef={triggerRef}
			onOpenChange={setOpen}
			isOpen={isOpen}
			className="text-text bg-background-alt"
		>
			<OverlayArrow />
			<Dialog className="bg-background-alt outline-none p-2 flex flex-col gap-2">{children}</Dialog>
		</AriaPopover>
	);
};

export default Popover;
