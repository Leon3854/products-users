# API для управления товарами, остатками и историей действий

В данном модуле реализованы функции для работы с товарами, их остатками на складах и журналом действий:

- Получение списка всех товаров (`getAllProducts`)
- Создание нового товара (`createProduct`)
- Создание и управление остатками товаров на складах (`createInventory`, `increaseInventory`, `decreaseInventory`, `getInventories`)
- Получение товаров по фильтрам (`getProductFilters`)
- Логирование действий с товарами (`logAction`)
- Получение истории действий с фильтрацией и пагинацией (`getActionHistory`)

Все операции выполняются с использованием Prisma ORM для взаимодействия с базой данных. Обработка ошибок реализована с выводом сообщений в консоль и повторным выбросом исключений.

## Описание по разделам

Ниже приведено более детальное описание основных функциональных блоков модуля:

### Товары
- Получение и фильтрация товаров
- Создание новых товаров

### Остатки
- Создание и изменение остатков на складах
- Получение остатков по фильтрам

### История действий
- Логирование операций с товарами
- Получение истории с фильтрами и пагинацией
