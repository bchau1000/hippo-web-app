const pool = require("../Config/config");
const async = require('async')

exports.defaultBrowse = (request, response) => {
    const {
        newUrl,
        page,
        limit,
        sqlQuery,
        sqlValues,
        countQuery,
        countValues
    } = request;

    try {
        async.series(
            [
                function (callback) {
                    pool.query(
                        countQuery,
                        countValues,
                        (error, result) => {
                            if (error) {
                                return response.status(400).send({
                                    "status": 400,
                                    "content": error,
                                });
                            }

                            if (result)
                                callback(null, result[0].count);
                            else
                                callback(null, 0);
                        }
                    )
                },
                function (callback) {
                    pool.query(
                        "SELECT s.id, s.title, s.description, username, GROUP_CONCAT(t.name SEPARATOR ',') as tags\n" +
                        "FROM (" + sqlQuery + ") as s LEFT JOIN (sets_and_tags as st JOIN tags as t ON st.tag_id = t.id) ON s.id = st.set_id\n" +
                        "GROUP BY s.id;",
                        sqlValues,
                        (error, result) => {
                            if (error) {
                                return response.status(400).send({
                                    "status": 400,
                                    "content": error,
                                });
                            }
                            callback(null, result);
                        }
                    )
                }
            ],
            function (error, result) {
                if (error) {
                    return response.status(400).send({
                        "status": 400,
                        "content": error,
                    })
                }

                let count = result[0];
                const offset = (page - 1) * limit;
                return response.status(200).send({
                    next: (offset + limit < count && count > 0 ? newUrl + "page=" + (page + 1) + "&limit=" + limit : null),
                    prev: (page > 1 && count > 0 ? newUrl + "page=" + (page - 1) + "&limit=" + limit : null),
                    page: page,
                    limit: limit,
                    count: count,
                    sets: result[1]
                });
            }
        )
    }
    catch (error) {
        console.log(error)
        return response.status(404).send({
            "status": 404,
            "content": error,
        });
    }
}

exports.getAllTags = (_, response) => {
    try {
        pool.query(
            'SELECT * FROM tags;',
            (error, result) => {
                if (error) {
                    return response.status(400).send({
                        'status': 400,
                        'content': error,
                    })
                }
                else {
                    return response.status(200).send({
                        'status': 200,
                        'tags': result,
                    })
                }

            }
        )
    }
    catch (error) {
        return response.status(404).send({
            'status': 404,
            'content': error,
        })
    }
}