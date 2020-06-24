import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
//引入路由守卫组件
import Guard from '@/components/public/Guard'
//引入路由list
import routesList from '@/router'
//mobx
import {Provider} from 'mobx-react'
import basicStore from './store/basic';


//路由组件
function RouteWithSubRoutes(route) {
  const Com = route.component;
  const c = route.children;
  return (
    <Route
      path={route.path}
      render = {(route)=> <Guard><Com itemList={ c } {...route}/></Guard>}
      // exact={true}
    >
    </Route>
  );
}


//注入store
const store = new basicStore();


ReactDOM.render(
	//是否开启严格模式
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' exact={true}>
          <Redirect to='/app'></Redirect>
        </Route>
        {routesList.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        {/*/重定向*/}
        {/*<Route exact={true} path="/" component={Welcome}/>*/}
        {/*404页面*/}
        {/*<Route component={404}/>*/}
      </Switch>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
