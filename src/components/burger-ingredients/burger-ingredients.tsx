import React, {useState} from 'react';
import styles from './burger-ingredients.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientNav from "../ingredient-nav/ingredient-nav";
import {BurgerData} from "../app/app";
import IngredientDetails from "../details-ingredient/ingredient-details";
import withModal from "../hocs/with-modal";


interface BurgerIngredientsProps {
    data: BurgerData[];
}

interface IBurgerIngredientsState {
    isVisible?: Boolean
}

export default function BurgerIngredients(props: BurgerIngredientsProps) {

    const [state, setState] = useState<IBurgerIngredientsState>({
        isVisible: false
    })

    function openModal() {
        setState({...state, isVisible: true})
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

    const catalog = ALL.map((item, index) => (
        <div key={item.title} className={styles.category}>
            <div className={styles.categoryTitle}>
                <h2>{item.title}</h2>
            </div>
            {item.data.map((cat: any, index: string | number | null | undefined) => (
                <div key={cat._id} className={styles.ingredient + " mb-3"} onClick={openModal}>
                    <div>
                        <img src={cat.image} alt={"Burger item"}/>
                    </div>
                    <div className={styles.price + " text text_type_digits-default"}>
                            <span className={"mr-2"}>
                                {cat.price}
                            </span>
                        <span>
                                <CurrencyIcon type={"primary"}/>
                            </span>
                    </div>
                    <div className={styles.description}>
                        <p>{cat.name}</p>
                    </div>
                </div>
            ))}
        </div>
    ));

    return (
        <div className={styles.ingredientWrapper}>
            <IngredientNav/>
            <WithModal isOpen={state.isVisible} onClose={closeModal}/>
            <div className={styles.ingredients}>
                {catalog}
            </div>
        </div>
    );

}