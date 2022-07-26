import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "../../service/hooks";
import {wsConnectionClosed, wsConnection} from "../../redux/actions/ws-feed-actions";


export const Feed: FC = () => {

    const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all'

    const {messages} = useSelector(store => store.ws)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(wsConnection(WS_FEED_URL))

        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

    return (
        <div>
            <h1>Feed Page</h1>

            {//@ts-ignore
                messages.map((message: any, index) => (<p key={index}>{message}</p>))
            }
        </div>
    );

}