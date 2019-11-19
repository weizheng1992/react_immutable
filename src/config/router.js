import { Route } from "react-router-dom";
// import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import MyLoadable from "../until/MyLoadable";

// import asyncComponent from "../until/AsyncComponent";


const Home = MyLoadable({
  loader: () => import(/* webpackChunkName: "details" */ "../containers/HomeContainer")
});


const Details = MyLoadable({
  loader: () => import(/* webpackChunkName: "details" */ "../pages/details")
});


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
