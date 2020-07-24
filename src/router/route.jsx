import noMatch from "@/views/noMatch";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import React from "react";
//引入路由守卫组件
import Guard from '@/components/public/Guard'

//路由组件
function RouteWithSubRoutes(route) {
  const Com = route.component;
  const c = route.children;
  const { locaPath } = route;
  return (
      <Route
          path={route.path}
          render = {(props)=> <Guard>
            <Com itemList={ c } {...props}/>
            {
              route.Redirect && locaPath === route.path ? (
                  <Redirect to={route.Redirect}></Redirect>
              ) : null
            }
          </Guard>}
          exact={ route.exact || false}
      >
      </Route>
  );
}


class BrowerRoute extends React.PureComponent{
  constructor(props) {
    super(props);
  }
  render() {
    const { routesList = [],location } = this.props
    return (
        routesList.length ? (
            <Switch>
              {routesList.map((route, i) => (
                  <RouteWithSubRoutes key={i} locaPath={location.pathname} {...route} />
              ))}
              {/*404页面*/}
              <Route component={noMatch}/>
            </Switch>
        ) : null
    )
  }
}

export default withRouter(BrowerRoute)
