exports.generateBrowseQuery = (request, _, next) => {
    let sqlQuery =
        "FROM (sets as s LEFT JOIN sets_and_tags as st ON s.id = st.set_id) LEFT JOIN tags as t ON  t.id = tag_id, users as u\n" +
        "WHERE u.id = s.user_id";

    let sqlValues = new Array();
    let tagsLength = 0;
    let url = request.path + "?";

    const query = request.query;
    const page = Number.parseInt(query.page && query.page > 0 ? query.page : 1);
    const limit = Number.parseInt(query.limit && query.limit > 0 ? query.limit : 30);
    const offset = (page - 1) * limit;

    if (query.username) {
        sqlQuery += " AND u.username LIKE ?";
        sqlValues.push("%" + query.username + "%");
        url += "username=" + query.username + "&";
    }

    if (query.title) {
        sqlQuery += " AND s.title LIKE ?";
        sqlValues.push("%" + query.title + "%");
        url += "title=" + query.title + "&";
    }

    if (query.tags) {
        tagsLength = 1;
        sqlQuery += " AND t.name IN(?";

        if (Array.isArray(query.tags)) {
            tagsLength = query.tags.length;
            sqlValues.push(query.tags[0]);

            for (let i = 1; i < tagsLength; i++) {
                sqlQuery += ", ?";
                sqlValues.push(query.tags[i]);
                url += "tags=" + query.tags[i] + "&";
            }
        }
        else {
            sqlValues.push(query.tags);
            url += "tags=" + query.tags + "&";
        }


        sqlQuery += ")";
        sqlValues.push(tagsLength);
    }
    sqlQuery += "\nGROUP BY s.id";

    if (tagsLength)
        sqlQuery += "\nHAVING COUNT(*) >= ?";

    request.countQuery = "SELECT COUNT(*) as 'count'\nFROM (SELECT s.id\n" + sqlQuery + ") as s;";
    request.countValues = sqlValues.slice();

    sqlQuery += "\nLIMIT ?, ?";
    sqlValues.push(offset);
    sqlValues.push(limit);

    request.page = page;
    request.limit = limit;
    request.newUrl = url;

    request.sqlQuery = "SELECT DISTINCT s.id, s.title, s.description, u.username\n" + sqlQuery;
    request.sqlValues = sqlValues;
    next();
}