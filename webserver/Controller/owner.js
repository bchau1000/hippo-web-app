/*This is logic to check if the owner is the requesting user */
const pool = require("../Config/config");
exports.setOwner = (request, response) => {
    const set_id = request.body.set_id;
    const user_id = request.user.id;
    const username = request.user.username;

    try {
        pool.query(
            "SELECT count(*) as 'count'\n" +
            "FROM sets\n" +
            "WHERE id = ? AND user_id = ?;",
            [set_id, user_id],
            (error, result) => {
                if (error) {
                    console.log('400 Bad Request: "/api/owner/sets"');
                    return response.status(400).send({
                        'status': 400,
                        'message': error,
                    });
                }

                if (result[0].count < 1) {
                    console.log('403 Forbidden: "/api/owner/sets"');
                    return response.status(401).send({
                        'status': 401,
                        'message': 'Must be the owner of a set to edit/delete it'
                    })
                }
                else {
                    console.log('200 Ok: "/api/owner/sets"');
                    return response.status(201).send({
                        'status': 201,
                        'message': username
                    });
                }

            }
        );
    }
    catch (error) {
        console.log('404 Not Found: "/api/owner/sets"');
        return response.status(404).send({
            'status': 404,
            'message': error,
        });
    }

}

exports.folderOwner =  (request, response) => {
    const folder_id = request.body.folder_id;
    const user_id = request.user.id;
    const username = request.user.username;

    try {
        pool.query(
            "SELECT count(*) as 'count'\n" +
            "FROM folders\n" +
            "WHERE id = ? AND user_id = ?;",
            [folder_id, user_id],
            (error, result) => {
                if (error) {
                    console.log('400 Bad Request: "/api/owner/folders"');
                    return response.status(400).send({
                        'status': 400,
                        'message': error,
                    });
                }
                if (result.length < 1) {

                    console.log('403 Forbidden: "/api/owner/folders"');
                    return response.status(401).send({
                        'status': 401,
                        'message': 'Must be the owner of a folder to delete it'
                    })
                }
                else {
                    console.log('200 Ok: "/api/owner/folders"');
                    return response.status(201).send({
                        'status': 201,
                        'message': username
                    });
                }

            }
        );
    }
    catch (error) {
        console.log('404 Not Found: "/api/owner/folders"');
        return response.status(404).send({
            'status': 404,
            'message': error,
        });
    }

}

exports.usernameOwner = (request, response) => {
    const requestUsername = request.user.username;
    const ownerUsername = request.body.username;

    if (requestUsername === ownerUsername) {
        console.log('200 Created: "/api/owner/username"');
        return response.status(201).send({
            "status": 201,
            "content": ownerUsername,
        });
    } else {
        console.log('403 Forbidden: "/api/owner/username"');
        return response.status(403).send({
            "status": 403,
            "content": ownerUsername,
        });
    }
}