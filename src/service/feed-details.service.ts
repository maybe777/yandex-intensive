export const dateFormatter = (date: string | undefined) => {
    if (date !== undefined) {
        let today = new Date();
        let target = new Date(date)
        const one_day = 1000 * 60 * 60 * 24;
        let result = Math.ceil((target.getTime() - today.getTime()) / (one_day))
        switch (result) {
            case 0 :
                return "Сегодня, " + date.toString().slice(15, 19) + " GMT+3"
            case -1 :
                return "Вчера, " + date.toString().slice(15, 25) + " GMT+3"
            default :
                return result.toString().slice(0) + " дня назад, " + date.toString().slice(15, 25) + " GMT+3"
        }
    }
}

export const ingredientsReducer = (order: TWSOrder, ingredientsData: Array<IBurgerItem>) => {
    order.ingredients.reduce((total: Array<IBurgerItem>, item) => {
        const ingredient = ingredientsData.find((burgerItem) => burgerItem._id === item)
        if (ingredient) total.push(ingredient)
        return total
    }, [])
}