const pool = require("../Config/config");
const async = require('async');

exports.getSetsByUsername = (request, response) => {
    const username = request.params.username;

    try {
        pool.query(
            "SELECT s.id, s.title, s.description, u.username, GROUP_CONCAT(t.name SEPARATOR ',') as tags\n" +
            "FROM users as u JOIN (sets as s LEFT JOIN sets_and_tags as st ON s.id = st.set_id) LEFT JOIN tags as t ON t.id = st.tag_id\n" +
            "WHERE u.username = ? AND u.id = s.user_id\n" +
            "GROUP BY s.id;\n",
            username,
            (error, result) => {
                if (error) return response.status(400).send(error);

                if (result) {
                    return response.status(201).send(result);
                } else return response.status(404).send("404 Not Found");
            }
        );
    } catch (err) {
        return response.status(404).send(err);
    }
};

exports.editSets = (request, response) => { };

// Get all cards belonging to a set
exports.getCardsOfSet = (request, response) => {
    const set_id = request.params.set_id;
    try {
        pool.query(
            "SELECT s.title as 'title', s.description as 'description',\n" +
            "f.id as 'id', f.term as 'term', f.definition as 'definition'\n" +
            "FROM sets as s JOIN flash_cards as f\n" +
            "WHERE s.id = f.set_id AND s.id = ?",
            set_id,
            (error, result) => {
                if (error) return response.status(400).send(error);
                else {
                    const length = result.length;
                    if (length) {
                        let send = {
                            title: "",
                            description: "",
                            flash_cards: [],
                        };
                        send.title = result[0].title;
                        send.description = result[0].description;
                        send.flash_cards = [];

                        for (let i = 0; i < length; i++) {
                            send.flash_cards.push({
                                id: result[i].id,
                                term: result[i].term.toString("utf-8"),
                                definition: result[i].definition.toString("utf-8"),
                            });
                        }
                        return response.status(201).send(send);
                    } else {
                        return response.status(404).send("404 Not Found");
                    }
                }
            }
        );
    } catch (err) {
        return response.status(404).send(err);
    }
};

exports.insertNewSet = (request, response) => {
    const { id } = request.user;
    const studySet = request.body;

    try {
        pool.query(
            "INSERT INTO sets(title, description, user_id) VALUES(?, ?, ?)",
            [studySet.title, studySet.description, id],
            (error, result) => {
                if (error) {
                    return response.status(400).send(error);
                } else {
                    const flashCards = studySet.flash_cards;
                    const numCards = flashCards.length;
                    let values = [];

                    for (let i = 0; i < numCards; i++) {
                        values.push(
                            new Array(
                                flashCards[i].term,
                                flashCards[i].definition,
                                1,
                                result.insertId
                            )
                        );
                    }

                    pool.query(
                        "INSERT INTO flash_cards(term, definition, q_type, set_id) VALUES ?",
                        [values],
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                return response.status(400).send(error);
                            } else {
                                return response.status(201).send({
                                    status: 201,
                                    user: request.user.username,
                                    content: result,
                                });
                            }
                        }
                    );
                }
            }
        );
    } catch (err) {
        console.log(err);
        response.status(404).send(err);
    }
};

exports.deleteSet = (request, response) => {
    const set_id = request.body.set_id;
    const user_id = request.user.id;

    try {
        async.series(
            [
                // Confirm this user owns this study set
                // Delete this set from any folders
                // Delete all flash_cards in this set
                // Delete all subjects in this set
                // Delete the study set

                function (callback) {
                    pool.query(
                        "SELECT count(*) as 'count'\n" +
                        "FROM sets\n" +
                        "WHERE id = ? AND user_id = ?;",
                        [set_id, user_id],
                        (error, result) => {
                            if (error) {
                                return response.status(400).send({
                                    status: 400,
                                    message: error,
                                });
                            }

                            if (result[0].count < 1) {
                                return response.status(401).send({
                                    status: 401,
                                    message: "Must be the owner of a set to edit/delete it",
                                });
                            } else callback(null, result); // continue
                        }
                    );
                },
                function (callback) {

                    // Delete a set and its relational data
                    // May not need extra deletes due to cascade
                    pool.query(
                        "DELETE FROM sets WHERE id = ?;",
                        [set_id],
                        (error, result) => {
                            if (error) {
                                return response.status(400).send({
                                    status: 400,
                                    message: error,
                                });
                            } else {
                                callback(null, result);
                            }
                        }
                    );
                },
            ],
            function (error, result) {
                if (error) {
                    return response.status(400).send({
                        status: 400,
                        message: error,
                    });
                } else {
                    return response.status(201).send({
                        status: 201,
                        message: "Deleted study set: " + set_id,
                        content: result,
                    });
                }
            }
        );
    } catch (err) {
        console.log(err);
        return response.status(404).send({
            status: 404,
            message: err,
        });
    }
};
