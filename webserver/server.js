require('dotenv').config();
const path = require('path');
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser")

const {generateBrowseQuery} = require('./Helpers/helper')
const {authUser} = require("./Middlewares/Auth/auth");

const set_controller = require("./Controller/sets")
const folder_controller = require('./Controller/folder')
const user_controller = require('./Controller/user')
const owner_controller = require('./Controller/owner')
const browse_controller = require('./Controller/browse')

const app = express();
const port = process.env.PORT || 9000;


app.use(express.static(path.join(__dirname, '../app/build')));

app.use(
    express.urlencoded({
        origin: 'http://localhost:3000',
        extended: true,
    })
);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.set("json spaces", 2);

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////USER REQUEST FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

app.get("/api/:username/sets", set_controller.getSetsByUsername);
app.get ("/api/sets/:set_id/cards", set_controller.getCardsOfSet);
app.get('/api/:username/folders', folder_controller.getFoldersByUsername);
app.put("/api/folders/new", authUser, folder_controller.insertNewFolder);
app.put("/api/folders/edit", authUser, folder_controller.editFolder);
app.delete("/api/folders/delete", authUser, folder_controller.deleteFolder);

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////SETS FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

app.put("/api/sets/new", authUser, set_controller.insertNewSet);
app.delete("/api/sets/delete", authUser, set_controller.deleteSet);

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////REGISTER/LOGIN FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

app.put("/api/register", user_controller.registerUser)
app.post("/api/login", user_controller.loginUser)
app.post('/api/logout', user_controller.logoutUser)
app.post('/api/auth', authUser, user_controller.userIsLoggedIn)


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////OWNER FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// Used to check if the requesting user is the owner of a set
app.post('/api/owner/sets', authUser, owner_controller.setOwner)
app.post('/api/owner/folders', authUser, owner_controller.folderOwner)
app.post('/api/owner/username', authUser, owner_controller.usernameOwner)
app.get("/api/browse", generateBrowseQuery, browse_controller.defaultBrowse)
app.get('/api/tags', browse_controller.getAllTags)

app.get("*", (request, response) => {
    return response.sendFile(path.join(__dirname + '/../app/build/index.html'));
});

//Default error for any path that is explicitly implemented
app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: 'Not found'
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
