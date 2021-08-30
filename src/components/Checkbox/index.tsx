import React from 'react'
import styles from "./styles.module.scss"

function Checkbox(props) {
    return (
        <div className={styles.Checkbox} style={{width: props.size, height: props.size}} onClick={props.onClick}>
            <div className={`${props.active ? styles.CheckboxInnerActive : styles.CheckboxInnerInactive} ${styles.CheckboxInner}`}></div>
        </div>
    )
}

export default Checkbox
