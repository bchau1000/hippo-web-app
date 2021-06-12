import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import TagInput from 'components/tagInput/tagInput.js';
import BrowseItem from "./browseItem/browseItem.js";
import LoadingAnim from 'components/loadingAnim/loadingAnim';
import Paginator from "./paginator/paginator.js";

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

    return `${url}page=${page}&limit=${limit}`;
}

export default function BrowsePage(props) {
    const query = useQuery();
    const history = useHistory();
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(query.get("title"));
    const [username, setUsername] = useState(query.get("username"));
    const [tags, setTags] = useState(query.getAll("tags"));
    const [page, setPage] = useState(query.get("page") ? query.get("page") : 1);
    const [limit, setLimit] = useState(query.get("limit") ? query.get("limit") : 25);

    const [count, setCount] = useState(0);
    const [totalPages, setTotalPages] = useState(Math.ceil(count / limit));
    const [sets, setSets] = useState([]);
    const [url, setUrl] = useState(createAPIUrl(title, username, tags, page, limit));

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            const settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await fetch("api/tags", settings);

            if (response.status === 200) {
                const json = await response.json();
                const length = json.tags.length;
                let newAllTags = []

                for (let i = 0; i < length; i++)
                    newAllTags.push(json.tags[i].name);

                setAllTags(newAllTags);
            }


        }
        const fetchData = async () => {
            const settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const response = await fetch("api/" + url, settings);

            if (response.status === 200) {
                const json = await response.json();

                setSets(json.sets);
                setPage(json.page);
                setCount(json.count);
                setLimit(json.limit);
            }
            window.history.replaceState(null, null, url);
            setLoading(false);
        }

        fetchTags();
        fetchData();

    }, [url]);

    useEffect(() => {
        setTotalPages(Math.ceil(count / limit));
    }, [count, limit]);

    const onPage = (newPage) => {
        setPage(newPage);
        setUrl(createAPIUrl(title, username, tags, newPage, limit));
    }

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setUrl(createAPIUrl(title, username, tags, 1, limit))
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setUrl(createAPIUrl(title, username, tags, 1, limit))
    }

    const resetForm = (event) => {
        event.preventDefault();
        setTitle("");
        setUsername("");
        setTags([]);
    }

    const showResult = () => {
        if (sets.length > 0) {
            return (
                sets.map((set, idx) => {
                    return (
                        <BrowseItem
                            key={idx}
                            set={set}
                        />
                    )
                })
            )
        }
        else {
            return (
                <div className="empty-results-container">
                    <span>There's Nothing Here!</span>
                    <button 
                        onClick={(event) => {
                            resetForm(event);
                            window.location.href = '/browse';
                        }}
                    >
                        Back to Browse
                    </button>
                </div>
            )
        }
    }

    return (
        <section className="browse-page-wrapper">
            <div className="browse-page-container">

                <form id="search-form" className="browse-query-container" onKeyDown={(event) => onEnter(event)}>
                    <span className="browse-page-header">
                        Browse
                    </span>
                    <div className="search-container">
                        <input
                            form="search-form"
                            className="by-title"
                            type="text"
                            placeholder="Search by title"
                            value={title ? title : ""}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <input
                            className="by-title"
                            type="text"
                            placeholder="Search by user"
                            value={username ? username : ""}
                            onChange={(event) => setUsername(event.target.value)}
                        >
                        </input>
                    </div>
                    <TagInput
                        allTags={allTags}
                        selectedTags={tags}
                        setSelectedTags={setTags}
                    />
                    <div className="search-buttons-container">
                        <button
                            onClick={(event) => onSubmit(event)}
                        >
                            Search
                        </button>
                        <button
                            style={{ 'backgroundColor': 'rgba(24, 24, 24, 0.4)' }}
                            onClick={(event) => resetForm(event)}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="search-format-container">
                        <label
                            htmlFor="limit-dropdown"
                            className="format-dropdown"
                        >
                            <span>{"Items/Page:"}</span>
                            <select id="limit-dropdown" onChange={(event) => setLimit(event.target.value)} defaultValue={limit}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>

                        </label>
                    </div>

                </form>
                {!loading
                    ? <div>
                        <div className="browse-num-results">
                            <span>Found {count} results</span>
                        </div>


                        <Paginator
                            totalPages={totalPages}
                            page={page}
                            onPage={onPage}
                        />

                        <ul className="browse-results-container">
                            { showResult() }
                        </ul>
                        <Paginator
                            totalPages={totalPages}
                            page={page}
                            onPage={onPage}
                        />
                    </div>

                    : <LoadingAnim />
                }
            </div>
        </section>
    )
}