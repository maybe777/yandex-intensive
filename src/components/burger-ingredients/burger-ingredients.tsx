import React, {useState} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientNav from "../ingredient-nav/ingredient-nav";
import {BurgerData} from "../app/app";
import IngredientDetails from "../details-ingredient/ingredient-details";
import withModal from "../hocs/with-modal";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";


interface BurgerIngredientsProps {
    data: BurgerData[];
}

interface IBurgerIngredientsState {
    isVisible?: Boolean,
    item: String
}

export default function BurgerIngredients(props: BurgerIngredientsProps) {

    const [state, setState] = useState<IBurgerIngredientsState>({
        isVisible: false,
        item: ''
    })

    function openModal(id: string) {
        setState({...state, isVisible: true, item: id})
    }

    function closeModal() {
        setState({...state, isVisible: false})
    }

    const BUNS = props.data.filter((item) => {
        // @ts-ignore
        return item.type === "bun";
    })

    const SAUCE = props.data.filter((item) => {
        // @ts-ignore
        return item.type === "sauce";
    })

    const NOVICE = props.data.filter((item) => {
        // @ts-ignore
        return item.type === "main";
    })

    const ALL = [{title: 'Булки', data: BUNS}, {title: 'Соусы', data: SAUCE}, {title: 'Начинки', data: NOVICE}];

    const WithModal = withModal(IngredientDetails);

    const catalog = ALL.map((category, index) => (
        <div key={category.title} className={styles.category}>
            <div className={styles.categoryTitle}>
                <h2>{category.title}</h2>
            </div>
            {category.data.map((item: any) => (
                <div key={item._id} className={styles.ingredient + " mb-3"} onClick={() => {
                    openModal(item)
                }}>
                    <BurgerIngredient {...item} />
                </div>
            ))}
        </div>
    ));

    return (
        <div className={styles.ingredientWrapper}>
            <IngredientNav/>
            <WithModal isOpen={state.isVisible} onClose={closeModal} header={"Детали ингредиента"} {...state.item}/>
            <div className={styles.ingredients}>
                {catalog}
            </div>
        </div>
    );

}