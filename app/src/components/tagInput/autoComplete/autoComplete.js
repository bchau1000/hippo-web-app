import { useState, useEffect } from 'react';

import './autoComplete.css';

export default function AutoComplete(props) {
    const [allTags, setAllTags] = useState([]);
    const [input, setInput] = useState("");
    const [focus, setFocus] = useState(false);
    const [list, setList] = useState([]);
    const [cursor, setCursor] = useState(-1);

    useEffect(() => {
        setAllTags(props.allTags.filter((tag) => props.selectedTags.indexOf(tag) === -1));
    }, [props.selectedTags, props.allTags]);

    useEffect(() => {
        if (input.length) {
            const newList = allTags.slice().filter((tag) => tag.includes(input));
            setList(newList.slice(0, 4));
            setCursor(-1);
        }

    }, [input, allTags]);

    const handleListNav = (event) => {
        if (input.length > 0) {
            if (event.key === 'ArrowUp') {
                if (cursor > 0)
                    setCursor(current => current - 1);
                else
                    setCursor(list.length - 1);
            }
            else if (event.key === 'ArrowDown') {
                if (cursor < list.length - 1)
                    setCursor(current => current + 1);
                else
                    setCursor(0);
            }
            else if (event.key === 'Enter') {
                event.stopPropagation();
                event.preventDefault();

                if (cursor !== -1) {
                    props.addTag(list[cursor]);
                    setCursor(-1);
                    setInput("");
                }

            }
        }
        else {
            if (event.key === 'Enter') {
                
            }
        }

    }

    return (
        <div
            className="autocomplete-container"
            onKeyDown={(event) => handleListNav(event)}
        >
            <input
                list="filtered-tags"
                type="search"
                placeholder="Tags"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            <div
                className="autocomplete-list-container"
            >
                {focus && input.length > 0 &&
                    list.map((tag, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`autocomplete-list-item ${idx === cursor ? "item-selected" : ""}`}
                                onMouseDown={() => {
                                    props.addTag(tag);
                                    setFocus(false);
                                    setInput("");
                                    setCursor(-1);
                                }}
                            >
                                <span>{tag}</span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}