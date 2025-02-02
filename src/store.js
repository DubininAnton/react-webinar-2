class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listners = [];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Создание записи
   */
  /* Добавил count */
  createItem({code, title = 'Новая запись', selected = false, count = 0, once = ""}) { 
    this.setState({
      ...this.state,
      items: this.state.items.concat({code, title, selected, count, once})
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        if (item.code === code){
          item.selected = !item.selected;
          if(item.selected) {
            item.count ++; /* Счетчик количества раз выделения пунктов меню */
            if(item.count >=2 && item.count<=4 ||  /* Добавил возможность изменения окончания слова "раз" */
                item.count >=22 && item.count<=24 ||
                item.count >=32 && item.count<=34) {
              item.once = "раза"
            } else {
              item.once = "раз"
            }
          } 
        } else {
          item.selected = false /* Условие для реализации задания по сбросу выделения у всех пунктов меню кроме выбранного */
        }
        return item;
      })
    });
  }
}

export default Store;
