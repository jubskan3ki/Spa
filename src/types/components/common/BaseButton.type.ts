export type ButtonType = 'button' | 'submit' | 'reset';

export interface BaseButtonProps {
	type?: ButtonType;
	variant?: string;
	className?: string;
	outline?: boolean;
	disabled?: boolean;
	ariaLabel?: string;
}
