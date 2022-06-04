interface BurgerItem {
    _id: string,
    name: string,
    type?: String,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

interface IBurgerConstructorState {
    isVisible?: Boolean
}

interface IBurgerIngredientsState {
    isVisible?: Boolean,
    item: String
}

interface IIngredientState {
    dataRequest?: Boolean,
    dataFailed?: Boolean,
    data: BurgerItem[]
}

interface IHeaderData {
    title?: String,
    data: BurgerItem[],
    ref?: MutableRefObject<null>,
}

interface IConstructorState {
    items: BurgerItem[]
}

interface IOrderState {
    dataRequest?: Boolean,
    dataFailed?: Boolean,
    number: number
}

interface IDetailsState {
    item: any
}

interface IHeaderItems{
    name?: string,
    ref: any
}

type BurgerAction = {
    type: string,
    item: BurgerItem
}