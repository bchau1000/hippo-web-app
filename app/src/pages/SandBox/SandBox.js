import { useEffect } from 'react';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import "./SandBox.css";

export default function SandBox(props) {

    useEffect(() => {

    }, []);

    return (
        <div className="sandbox-container">
            <div className="loading-container">
                <LoadingAnim text="Registering..."/>
            </div>
        </div>

    )
}