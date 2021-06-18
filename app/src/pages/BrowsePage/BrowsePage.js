import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import TagInput from 'components/tagInput/tagInput.js';
import BrowseItem from "./browseItem/browseItem.js";
import LoadingAnim from 'components/loadingAnim/loadingAnim';
import Paginator from "./paginator/paginator.js";

import "./BrowsePage.css";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const createAPIUrl = (params) => {
    let { title, username, tags, page, limit } = params;

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

    const [params, setParams] = useState({
        'title': query.get('title'),
        'username': query.get('username'),
        'tags': query.getAll("tags"),
        'page': query.get("page") ? query.get("page") : 1,
        'limit': query.get("limit")
            ? (query.get("limit") > 100 ? 100 : query.get("limit"))
            : 25
    });

    const [loading, setLoading] = useState(false);

    const [sets, setSets] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [count, setCount] = useState(0);
    const [totalPages, setTotalPages] = useState(Math.ceil(count / params.limit));

    const [url, setUrl] = useState(createAPIUrl(params));

    useEffect(() => {
        setTotalPages(Math.ceil(count / params.limit));
    }, [count, params]);

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
            const response = await fetch("/api/" + url, settings);

            if (response.status === 200) {
                const json = await response.json();

                setSets(json.sets);
                setCount(json.count);

                setParams(params => ({
                    ...params,
                    'page': json.page,
                    'limit': json.limit,
                }))
            }
            window.history.replaceState(null, null, url);
            setLoading(false);
        }

        fetchTags();
        fetchData();

    }, [url]);

    const setTags = (newTags) => {
        setParams({
            ...params,
            'tags': newTags
        })
    }

    const onPage = (newPage) => {
        setParams({
            ...params,
            'page': newPage,
        });

        setUrl(createAPIUrl({
            ...params,
            'page': newPage,
        }));
    }

    const onEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setUrl(createAPIUrl(params))
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setUrl(createAPIUrl(params))
    }

    const resetForm = (event) => {
        event.preventDefault();
        setParams({
            ...params,
            'title': '',
            'username': '',
            'tags': [],
        });
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
                            value={params.title ? params.title : ""}
                            onChange={(event) =>
                                setParams({
                                    ...params,
                                    'title':
                                        event.target.value
                                })
                            }
                        />
                        <input
                            className="by-title"
                            type="text"
                            placeholder="Search by user"
                            value={params.username ? params.username : ""}
                            onChange={(event) =>
                                setParams({
                                    ...params,
                                    'username': event.target.value
                                })
                            }
                        >
                        </input>
                    </div>
                    <TagInput
                        allTags={allTags}
                        selectedTags={params.tags}
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
                            <select
                                id="limit-dropdown"
                                onChange={(event) =>
                                    setParams({
                                        ...params,
                                        'limit': event.target.value,
                                    })
                                }
                                defaultValue={params.limit}
                            >
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
                            page={params.page}
                            onPage={onPage}
                        />
                        <ul className="browse-results-container">
                            {showResult()}
                        </ul>
                        <Paginator
                            totalPages={totalPages}
                            page={params.page}
                            onPage={onPage}
                        />
                    </div>
                    : <LoadingAnim />
                }
            </div>
        </section>
    )
}