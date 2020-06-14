import React, {Suspense, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MessagesContainer from "./components/Messages/MessagesContainer";
import Preloader from "./components/common/preloader/preloader";
import FriendsContainer from "./components/Friends/FriendsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/AppReducer";
import store from "./redux/reduxStore";
import './App.css';
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import ("./components/Settings/Settings"));
const News = React.lazy(() => import ("./components/News/News"));




const { Header, Content, Footer, Sider } = Layout;


const App2 = ({initializeApp, initialized}) => {

    useEffect(() => {
        initializeApp()
    }, [initializeApp])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo"><h2>#Stay at Home</h2></div>
                <SidebarContainer/>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{padding: 0}}>
                    <HeaderContainer/>
                </Header>
                <Content style={{margin: '24px 16px 0'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: "100vh"}}>
                        <Switch>
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

                            <Redirect exact from="/" to="/profile"/>

                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>

                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Created by Ivan Sidarau ©2020</Footer>
            </Layout>
        </Layout>

    )
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App2);

const MainApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default MainApp;
