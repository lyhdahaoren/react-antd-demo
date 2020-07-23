import noMatch from "@/views/noMatch";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
//引入路由守卫组件
import Guard from '@/components/public/Guard'

//路由组件
function RouteWithSubRoutes(route) {
  const Com = route.component;
  const c = route.children;
  return (
      <Route
          path={route.path}
          render = {(props)=> <Guard><Com itemList={ c } {...props}/></Guard>}
          exact={ route.exact || false}
      >
      </Route>
  );
}

function Redirecter(route) {
  return (
      <>
        {
          route.Redirect ? (
              <Redirect to={route.Redirect}></Redirect>
          ) : null
        }
      </>
  )
}


export default function (route) {
  const { routesList = [] } = route
  console.log(route)
  return (
      <Switch>
        {routesList.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
        ))}
        {routesList.map((route, i) => (
            <Redirecter key={i} {...route} />
        ))}
        {/*404页面*/}
        <Route component={noMatch}/>
      </Switch>
  )
}
