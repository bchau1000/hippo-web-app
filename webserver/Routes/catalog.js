const {authUser} = require("./Middlewares/Auth/auth");

const set_controller = require("./Controller/sets")
const folder_controller = require('./Controller/folder')
const user_controller = require('./Controller/user')
const owner_controller = require('./Controller/owner')
const browse_controller = require('./Controller/browse')


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////USER REQUEST FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// // Get all sets belonging to a user
route.get("/api/:username/sets", set_controller.getSetsByUsername);
route.get ("/api/sets/:set_id/cards", set_controller.getCardsOfSet);
route.get('/api/:username/folders', folder_controller.getFoldersByUsername);
route.put("/api/folders/new", authUser, folder_controller.insertNewFolder);
route.put("/api/folders/edit", authUser, folder_controller.editFolder);
route.delete("/api/folders/delete", authUser, folder_controller.deleteFolder);
   
// END USER REQUEST FUNCTIONS

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////SETS FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

route.put("/api/sets/new", authUser, set_controller.insertNewSet);
route.delete("/api/sets/delete", authUser, set_controller.deleteSet);

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////REGISTER/LOGIN FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

route.put("/api/register", user_controller.registerUser)
route.post("/api/login", user_controller.loginUser)
route.post('/api/logout', user_controller.logoutUser)
route.post('/api/auth', authUser, user_controller.userIsLoggedIn)


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////OWNER FUNCTIONS//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// Used to check if the requesting user is the owner of a set
route.post('/api/owner/sets', authUser, owner_controller.setOwner)
route.post('/api/owner/folders', authUser, owner_controller.folderOwner)
route.post('/api/owner/username', authUser, owner_controller.usernameOwner)
route.get("/api/browse", generateBrowseQuery, browse_controller.defaultBrowse)