import React from 'react';

import Logo from '../assets/rocket.svg';

import styles from './Header.module.css';

export const Header: React.FC = () => {

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src={Logo} alt="Logo" />
                <h1><span className={styles.titleBlue}>to</span><span className={styles.titlePurple}>do</span></h1>
            </div>
        </div>
    );
}
