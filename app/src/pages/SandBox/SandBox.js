import { useEffect } from 'react';
import "./SandBox.css";

export default function SandBox(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    useEffect(() => {

    }, []);

    return (
        <div className="sandbox-container">

        </div>

    )
}