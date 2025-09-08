/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

// 🎯 Добавляем categoryMap — маппинг категорий на CSS-классы
export const categoryMap: Record<string, string> = {
  soft: 'card__category_soft',
  hard: 'card__category_hard',
  other: 'card__category_other',
  additional: 'card__category_additional',
  button: 'card__category_button',
};

export const settings = {

};

