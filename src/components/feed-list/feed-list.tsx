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
                    items.map((item: TWSOrder, index) => (
                        <Link
                            to={{
                                pathname: url + '/' + item._id,
                                state: {background: location}
                            }}>
                            <li key={item._id + index} className={styles.feedListItem}>
                                <FeedComponent
                                    _id={item._id}
                                    createdAt={item.createdAt}
                                    ingredients={item.ingredients}
                                    number={item.number}
                                    name={item.name}
                                    status={item.status}
                                    updatedAt={item.updatedAt}
                                />
                            </li>
                        </Link>))}
            </ul>
        </div>
    )
}