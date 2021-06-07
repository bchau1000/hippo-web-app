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
    const [allTags, setAllTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(query.get("title"));
    const [username, setUsername] = useState(query.get("username"));
    const [tags, setTags] = useState(query.getAll("tags"));
    const [page, setPage] = useState(query.get("page") ? query.get("page") : 1);
    const [limit, setLimit] = useState(query.get("limit") ? query.get("limit") : 20);

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
    }

    const onSubmit = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setUrl(createAPIUrl(title, username, tags, page, limit));
        }
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
                    <a href="/browse">Back to Browse</a>
                </div>
            )
        }
    }

    return (
        <section className="browse-page-wrapper">
            <div className="browse-page-container">
                
                <form id="search-form" className="browse-query-container" onKeyDown={(event) => onSubmit(event)}>
                <span className="browse-page-header">
                    Browse
                </span>
                    <div className="search-container">
                        <input 
                            form="search-form" 
                            className="by-title" 
                            type="text" 
                            placeholder="Search by title" 
                            defaultValue={title} 
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        <input 
                            className="by-title"
                            type="text" 
                            placeholder="Search by user"
                            defaultValue={username}
                            onChange={(event) => setUsername(event.target.value)}
                        >
                        </input>
                    </div>
                    <TagInput
                        allTags={allTags}
                        selectedTags={tags}
                        setSelectedTags={setTags}
                    />
                </form>
                <div>
                    <ul className="browse-results-container">
                        {!loading
                            ? showResult()
                            : <LoadingAnim />
                        }
                    </ul>
                    <ol className="browse-pagination-container">
                    </ol>
                    <Paginator
                        totalPages={totalPages}
                        page={page}
                        onPage={onPage}
                    />
                </div>
            </div>
        </section>
    )
}