import { combineReducers } from "redux";
// import * as homeReducers from "./Home.js";
import landingPageReducers from "./LandingPage";
// import * as messagesReducers from "./Messages.js";
// import * as registerReducers from "./Register.js";
// import * as userReducers from "./User.js";
// import * as NavbarReducers from "./Navbar.js"
// import * as consts from "../consts.js"
// import * as Reducers from "./.js";

const rootReducer = combineReducers({ user: landingPageReducers });
// ...homeReducers,
// ...landingPageReducers,
// ...messagesReducers,
// ...registerReducers,
// ...userReducers,
// ...NavbarReducers,

export default rootReducer;