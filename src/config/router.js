import { Route } from "react-router-dom";

import asyncComponent from "../until/AsyncComponent";

const Home = asyncComponent(() =>
  import(/* webpackChunkName: "details" */ "../containers/HomeContainer")
);
// import(/* webpackChunkName: "home" */ "../pages/home")

const Details = asyncComponent(() =>
  import(/* webpackChunkName: "details" */ "../pages/details")
);


const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/details",
    component: Details
  },
  
];

const router = () =>
  routes.map((route, i) => (
    <Route
      key={i}
      exact
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} />
      )}
    />
  ));

export default router;
