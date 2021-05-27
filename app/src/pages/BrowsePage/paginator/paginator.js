import { useEffect } from 'react';
import "./paginator.css";

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export default function Paginator(props) {
    const totalPages = props.totalPages;
    const page = props.page;
    const offset = 3;
    let start = (page - offset < 1) ? 1 : page - offset;
    let end = (page + offset > totalPages) ? totalPages : page + offset;

    if (start < 4)
        while (end < totalPages && (end - start) < 6)
            end++;


    if (start < end) {
        const pages = range(start, end);
        return (
            <div className="paginator-wrapper">
                <ol className="paginator-container">
                    <li className={`${page > 1 ? "not-current-page" : "hide-button"}`} onClick={() => props.onPage(page - 1)}>{"<"}</li>
                    {
                        pages.map((pg, _) => {
                            return (
                                <li key={pg} className={`${pg === page ? "current-page" : "not-current-page"}`} onClick={() => props.onPage(pg)}>
                                    {pg}
                                </li>
                            )
                        })
                    }
                    {end < totalPages &&
                        <li>...</li>
                    }
                    <li className={`not-current-page ${page < totalPages ? "" : "hide-button"}`} onClick={() => props.onPage(page + 1)}>{">"}</li>
                </ol>
            </div>

        )
    }
    else {
        return (
            <div className="paginator-wrapper" style={{fontSize: "25px"}}/>
        )
    }
}