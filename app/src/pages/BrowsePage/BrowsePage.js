import {useState, useEffect} from 'react';

import "./BrowsePage.css";

export default function BrowsePage(props) {
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        setPageNum(0);
    }, []);

    return(
        <section className="browse-page-container">
            {pageNum}
        </section>
    )
}