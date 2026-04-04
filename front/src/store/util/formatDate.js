const formatDate = (dateRaw, format = 'ru-RU') => {
	const date = new Date(dateRaw);
	return date.toLocaleDateString(format);
};

export default formatDate;
