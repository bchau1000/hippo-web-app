export default async function isOwnerFolder(folder_id) {
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