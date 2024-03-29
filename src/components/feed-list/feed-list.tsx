import React from "react";
import styles from "./feed-list.module.css";
import {Link, useLocation, useRouteMatch} from "react-router-dom";
import {FeedComponent} from "../feed-component/feed-component";


export const FeedList = ({items}: IFeedList) => {

    const location = useLocation()
    const {url} = useRouteMatch()

    return (
        <div className={styles.feedList}>
            <ul className={styles.feedListUl}>
                {
                    items.map((item: TWSOrder) => (

                        <li key={item._id} className={styles.feedListItem}>
                            <Link
                                to={{
                                    pathname: url + '/' + item._id,
                                    state: {background: location}
                                }}>
                                <FeedComponent
                                    _id={item._id}
                                    createdAt={item.createdAt}
                                    ingredients={item.ingredients}
                                    number={item.number}
                                    name={item.name}
                                    status={item.status}
                                    updatedAt={item.updatedAt}
                                />

                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(1, 6)
console.log(rndInt)