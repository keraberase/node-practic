
const parseNumber = (value, defaultValue) => {
  const parsedValue = parseInt(value, 10);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};

// Функция для парсинга параметров пагинации из объекта query
export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
