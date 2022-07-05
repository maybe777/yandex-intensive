import React, {useEffect} from 'react'
import styles from './profile.module.css'
import {ProfileEdit} from "../../components/profile-edit/profile-edit";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import {useDispatch} from "react-redux";
import {getUser} from "../../redux/actions/auth-actions";


export function ProfilePage() {

    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getUser())
    }, [dispatch])

    return (
        <div className={styles.profile}>
            <ProfileMenu/>
            <ProfileEdit/>
        </div>
    );

}