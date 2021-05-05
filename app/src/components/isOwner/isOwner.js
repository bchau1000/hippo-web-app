
export default async function isOwner(set_id) {
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

    const response = await fetch('/api/owner', settings);

    if(response.status === 201) {
        return true;
    }
    else if(response.status === 401) {
        return false;
    }
    else {
        const json = await response.json();
        console.log(json);
        return false;
    }
}