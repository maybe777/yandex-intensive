import React, {useEffect, useRef, useState} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientDetails from "../details-ingredient/ingredient-details";
import withModal from "../hocs/with-modal";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useDispatch, useSelector} from "react-redux";
import {closeDetails, showDetails} from "../../redux/actions/details-actions";
import {getData} from "../../redux/actions/ingredients-actions";
import {elementCalculator} from "../../service/scroll-calcuator";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerIngredients() {

    // @ts-ignore
    const data = useSelector(store => store.ingredients.data)
    // @ts-ignore
    const items = useSelector(store => store.burger.items)

    const [scrollIndex, setScrollIndex] = useState<Number>(0)

    const [state, setState] = useState<IBurgerIngredientsState>({
        isVisible: false,
        item: ''
    })

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(getData())
    }, [dispatch])

    useEffect(() => {
        let component: HTMLElement | null = document.getElementById('items')
        const handler = (event: any) => {
            let index = elementCalculator(
                // @ts-ignore
                component.scrollTop,
                ALL,
                0,
                ALL.length - 1
            );
            setScrollIndex(index)
        };
        // @ts-ignore
        component.addEventListener("scroll", handler);
        return () => {
            // @ts-ignore
            component.removeEventListener("scroll", handler);
        };
    }, []);

    const bunRef = useRef(null)
    const sauceRef = useRef(null)
    const noviceRef = useRef(null)

    function openModal(item: any) {
        // @ts-ignore
        dispatch(showDetails(item))
        setState({...state, isVisible: true})
    }

    function closeModal() {
        setState({...state, isVisible: false})
        // @ts-ignore
        dispatch(closeDetails())
    }

    const BUNS: BurgerItem[] = data.filter((item: BurgerItem | any) => {
        return item.type === "bun";
    })

    const SAUCE: BurgerItem[] = data.filter((item: BurgerItem | any) => {
        return item.type === "sauce";
    })

    const NOVICE: BurgerItem[] = data.filter((item: BurgerItem | any) => {
        return item.type === "main";
    })

    const ALL: IHeaderData[] = [
        {title: 'Булки', data: BUNS, ref: bunRef},
        {title: 'Соусы', data: SAUCE, ref: sauceRef},
        {title: 'Начинки', data: NOVICE, ref: noviceRef}
    ];

    const WithModal = withModal(IngredientDetails);

    const itemsCount = (item: BurgerItem) => {
        //@ts-ignore
        let result = items.filter(cnt => cnt._id === item._id)
        return result.length
    }

    const catalog = ALL.map((category: IHeaderData, index) => (
        <div className={styles.category} key={"category_key_" + index}>
            <div className={styles.categoryTitle}>
                <h2 ref={category.ref}>{category.title}</h2>
            </div>
            {category.data.map((item: BurgerItem) => (
                <div key={"item_" + item._id} className={styles.ingredient + " mb-3"}
                     onClick={() => {
                         openModal(item)
                     }}>
                    <BurgerIngredient item={item} count={itemsCount(item)}/>
                </div>
            ))}
        </div>
    ));

    return (
        <div className={styles.ingredientWrapper}>
            <div className={styles.navigationContainer + " mb-3"}>
                {ALL.map((item, index) =>
                    // @ts-ignore
                    (<Tab key={"tab_" + index} value={item.title} active={scrollIndex === index}
                          onClick={() => console.log('Clicked')}>
                        {item.title}
                    </Tab>))}
            </div>
            <WithModal isOpen={state.isVisible} onClose={closeModal} header={"Детали ингредиента"} {...state.item}/>
            <div id="items" className={styles.ingredients}>
                {catalog}
            </div>
        </div>
    );

}