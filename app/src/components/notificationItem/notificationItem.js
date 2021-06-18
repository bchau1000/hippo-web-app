import { useState, useEffect } from 'react';
import './notificationItem.css';

function getStatus(notification) {
    switch(notification.status) {
        case 'Success':
            return {
                icon: 'done',
                color: 'status-success',
            };
        case 'Error':
            return {
                icon: 'priority_high',
                color: 'status-error',
            };
        default:
            return {
                icon: 'notifications',
                color: 'status-neutral',
            };
    }
}

export default function NotificationItem(props) {
    const notification = props.notification;
    const [count, setCount] = useState(2000);
    const status = getStatus(notification);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(current => current - 1);
        }, 1);

        return () => clearInterval(interval);
    }, [props]);

    useEffect(() => {
        if (count <= 0) {
            props.dispatch({ type: 'REMOVE', value: notification.id });
            return;
        }
    }, [count]);

    return (
        <div
            className={"pn-item-container no-select " + status.color}
            onClick={() => props.dispatch({ type: 'REMOVE', value: notification.id })}
        >
            <div className="pn-item-content">
                <span className="material-icons">{status.icon}</span>

                <div
                    className="pn-text"
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        {notification.status}
                    </span>
                    <span>
                        {notification.text}
                    </span>
                </div>
                <span
                    className="material-icons"
                    style={{
                        marginLeft: 'auto',
                    }}
                >close</span>
            </div>
            <progress className={status.color} max="2000" value={count}></progress>
        </div>
    )
}