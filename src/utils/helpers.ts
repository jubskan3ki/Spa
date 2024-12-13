export const formatDate = (date: string | Date): string => {
	const d = new Date(date);
	return d.toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

export const truncateText = (text: string, maxLength: number): string => {
	return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
