import React, {Suspense, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import MessagesContainer from "./components/Messages/MessagesContainer";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/AppReducer";
import Preloader from "./components/common/preloader/preloader";
import store from "./redux/reduxStore";

const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import ("./components/Settings/Settings"));
const News = React.lazy(() => import ("./components/News/News"));

const App = ({initializeApp, initialized}) => {

    useEffect(() => {
        initializeApp()
    }, [initializeApp])

    if (!initialized) {
        return <Preloader/>
    }

    return (

        <div className="app-wrapper">
            <HeaderContainer/>
            <SidebarContainer/>
            <div className="app-wrapper-content">
                <Route path='/profile/:userId?'
                       render={() => <ProfileContainer/>}/>

                <Route path='/messages'
                       render={() => <MessagesContainer/>}/>

                <Route path='/news'
                       render={() => <Suspense fallback={<Preloader/>}>
                           <News/>
                       </Suspense>}/>

                <Route path='/music'
                       render={() => <Suspense fallback={<Preloader/>}>
                           <Music/>
                       </Suspense>}/>

                <Route path='/settings'
                       render={() => <Suspense fallback={<Preloader/>}>
                           <Settings/>
                       </Suspense>}/>

                <Route path='/friends'
                       render={() => <FriendsContainer/>}/>

                <Route path='/users'
                       render={() => <UsersContainer/>}/>

                <Route path='/login'
                       render={() => <LoginPage/>}/>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;