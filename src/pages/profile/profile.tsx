import React from 'react'
import styles from './profile.module.css'
import {ProfileEdit} from "../../components/profile-edit/profile-edit";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";


export function ProfilePage() {

    return (
        <div className={styles.profile}>
            <ProfileMenu/>
            <ProfileEdit/>
        </div>
    );

}