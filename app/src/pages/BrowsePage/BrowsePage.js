import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import BrowseItem from "./browseItem/browseItem.js";
import LoadingAnim from 'components/loadingAnim/loadingAnim';
import "./BrowsePage.css";


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const createAPIUrl = (title, username, tags, page, limit) => {
    let url = "browse?";
    const tagsLength = tags.length;

    url += title ? "title=" + title + "&" : "";
    url += username ? "username=" + username + "&" : "";

    if (tagsLength)
        for (let i = 0; i < tagsLength; i++)
            url += "tags=" + tags[i] + "&";

    return url + "page=" + page + "&" + "limit=" + limit;
}

export default function BrowsePage(props) {
    const query = useQuery();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(query.get("title"));
    const [username, setUsername] = useState(query.get("username"));
    const [tags, setTags] = useState(query.getAll("tags"));
    const [page, setPage] = useState(query.get("page") ? query.get("page") : 1);
    const [limit, setLimit] = useState(query.get("limit") ? query.get("limit") : 5);
    const [sets, setSets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const API_URL = createAPIUrl(title, username, tags, page, limit);
            const settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await fetch("api/" + API_URL, settings);

            if (response.status === 200) {
                const json = await response.json();
                console.log(json);
                setSets(json.sets);
                setPage(json.page);
            }
            window.history.replaceState(null, null, API_URL);
            setLoading(false);
        }
        fetchData();
    }, [title, username, tags, page]);

    useEffect(() => {
        console.log(sets);
    }, [sets]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setTitle(event.target[0].value);
        setPage(1);
    }

    return (
        <section className="browse-page-wrapper">
            <div className="browse-page-container"> 
                <form className="browse-query-container" onSubmit={(event) => onSubmit(event)}>
                    <div className="search-container">
                        <input type="text" placeholder="Search by title..."></input>
                    </div>
                </form>
                <ul className="browse-results-container">
                    {!loading ?
                        sets.map((set, idx) => {
                            return (
                                <BrowseItem
                                    key={idx}
                                    set={set}
                                />
                            )
                        })
                        : <LoadingAnim/>
                    }
                </ul>
                <ol className="browse-pagination-container">
                </ol>

            </div>
        </section>
    )
}