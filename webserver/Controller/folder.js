/*All FOLDER RELATED FUNCTIONS
 INCLUDING CREATE,READ,UPDATE AND DELETE*/ 
 const pool = require("../Config/config");
const async = require("async")
exports.getFoldersByUsername = (request, response) => {
        const username = request.params.username;
        try {
            pool.query(
                "SELECT * FROM users WHERE username = ?;",
                username,
                (error, result) => {
                    if (error) {
                        return response.status(401).send({
                            'status': 401,
                            'content': error
                        });
                    }
    
                    if (result.length < 1) {
                        return response.status(401).send({
                            'status': 401,
                            'content': 'Username does not exist.'
                        })
                    }
                    else {
                        const user_id = result[0].id;
                        pool.query(
                            "SELECT f.id as 'folder_id', f.name as 'folder_name', fs.set_id as 'set_id', title, description\n" +
                            "FROM folders as f LEFT JOIN (folders_and_sets as fs, sets as s)\n" +
                            "ON f.id = fs.folder_id AND s.id = fs.set_id\n" +
                            "WHERE f.user_id = ?;",
                            user_id,
                            (error, result) => {
                                if (error) {
                                    return response.status(401).send({
                                        'status': 401,
                                        'content': error
                                    });
                                }
                                const len = result.length;
                                let parsed = {};
                                let metaData = {};
                                let send = [];
    
    
                                for (let i = 0; i < len; i++) {
                                    const set = {
                                        "id": result[i].set_id,
                                        "title": result[i].title,
                                        "description": result[i].description
                                    }
    
                                    if (parsed[result[i].folder_id] === undefined)
                                        parsed[result[i].folder_id] = [set];
                                    else
                                        parsed[result[i].folder_id].push(set);
    
                                    metaData[result[i].folder_id] = result[i].folder_name;
                                }
    
                                Object.keys(parsed).forEach(function (key) {
                                    send.push({
                                        "id": key,
                                        "name": metaData[key],
                                        "sets": parsed[key]
                                    })
                                });
    
                                return response.status(201).send(send);
                            }
                        )
                    }
                }
            )
        }
        catch (error) {
            return response.status(404).send({
                'status': 404,
                'content': error
            });
        }
}


exports.insertNewFolder = (request, response) => {
        const user_id = request.user.id;
        const folder_name = request.body.name;
        const sets = request.body.sets;
        console.log()
    
        try {
            pool.query(
                'INSERT INTO folders(name, user_id) VALUES(?, ?);',
                [folder_name, user_id],
                (error, result) => {
                    if (error) {
                        return response.status(401).send({
                            'status': 401,
                            'content': error,
                        });
                        
                    }
    
                    const folder_id = result.insertId;
                    const len = sets.length;
    
                    if (len == 0) {
                        return response.status(201).send({
                            'status': 201,
                            'content': "Added new folder",
                        });
                    }
                    else {
                        let insert_sets = [];
                        for (let i = 0; i < len; i++) {
                            insert_sets.push(new Array(
                                folder_id,
                                sets[i].id
                            ));
                        }
    
                        pool.query(
                            'INSERT INTO folders_and_sets(folder_id, set_id) VALUES ?;',
                            [insert_sets],
                            (error, result) => {
                                if (error) {
                                    return response.status(401).send({
                                        'status': 401,
                                        'content': error,
                                    });
                                }
                                else
                                    return response.status(201).send({
                                        'status': 201,
                                        'content': {
                                            "folder_id": folder_id,
                                        },
                                    });
                            }
                        )
                    }
    
                }
            )
        }
        catch (error) {
            response.status(404).send({
                'status': 404,
                'content': error,
            })
        }
}

    exports.editFolder =  (request, response) => {
        const folder_id = request.body.id;
        const sets = request.body.sets;
        const length = sets.length;
        let insertValues = [];
    
        for (let i = 0; i < length; i++) {
            if (folder_id !== null) {
                insertValues.push(new Array(
                    folder_id,
                    sets[i].id
                ));
            }
        }
    
        try {
            async.series([
                function (callback) {
                    pool.query(
                        "DELETE FROM folders_and_sets WHERE folder_id = ?;",
                        [folder_id],
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                return response.status(401).send({
                                    "status": 401,
                                    "content": error,
                                });
                            }
                            else
                                callback(null, result);
                        }
                    );
                },
                function (callback) {
                    if (length > 0) {
                        pool.query(
                            "INSERT INTO folders_and_sets(folder_id, set_id) VALUES ?;",
                            [insertValues],
                            (error, result) => {
                                if (error) {
                                    console.log(error);
                                    return response.status(401).send({
                                        "status": 401,
                                        "content": error,
                                    });
                                }
                                else
                                    callback(null, result);
                            }
                        );
                    }
                    else
                        callback(null, null);
    
                }
            ], function (error, result) {
                if (error) {
                    console.log(error);
                    return response.status(401).send({
                        "status": 401,
                        "content": error,
                    });
                }
                else {
                    return response.status(201).send({
                        "status": 201,
                        "content": result,
                    });
                }
    
            })
        }
        catch (error) {
            return response.status(404).send({
                "status": 404,
                "content": error,
            });
        }
    }

    exports.deleteFolder = (request, response) => {
        const folder_id = request.body.folder_id;
        try {
            pool.query(
                "DELETE FROM folders WHERE id = ?;\n" +
                "DELETE FROM folders_and_sets WHERE folder_id = ?;",
                [folder_id, folder_id],
                (error, result) => {
                    if (error) {
                        return response.status(401).send({
                            "status": 401,
                            "content": error,
                        });
                    }
                    else {
                        return response.status(201).send({
                            "status": 201,
                            "content": result
                        });
                    }
    
                }
            )
        }
        catch (error) {
            return response.status(404).send({
                "status": 404,
                "content": error,
            });
        }
    }

