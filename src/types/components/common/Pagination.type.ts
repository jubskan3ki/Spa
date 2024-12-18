export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	prevIcon: string;
	nextIcon: string;
}

export interface PaginationEmits {
	(e: 'pageChange', page: number): void;
}
