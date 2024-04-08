import styles from './Button.module.css'
import React from 'react'

export default function Button(props: { onClick: Function, style?: any, children?: any, className?: string }) {
    return (
        <div onClick={() => props.onClick()} className={`${styles['Button']} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
}