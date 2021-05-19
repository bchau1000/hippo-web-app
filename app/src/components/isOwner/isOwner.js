export async function isOwner(username) {
    const body = JSON.stringify({
        "username": username,
    })

    const settings = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    }

    const response = await fetch("/api/owner/username", settings);

    return response.status === 201;
}

export async function isOwnerFolder(folder_id) {
    const body = JSON.stringify({
        'folder_id': folder_id,
    })

    const settings = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: body,
    }

    const response = await fetch('/api/owner/folders', settings);

    if(response.status === 201) 
        return true;
    else if(response.status === 401) 
        return false;
    else 
        return false;
}

export async function isOwnerSet(set_id) {
    const body = JSON.stringify({
        'set_id': set_id,
    })

    const settings = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: body,
    }

    const response = await fetch('/api/owner/sets', settings);

    if(response.status === 201) 
        return true;
    else if(response.status === 401) 
        return false;
    else 
        return false;
}