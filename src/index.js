import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr';
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import ScrollTop from "./app/common/util/ScrollTop";
import { loadEvents } from "./features/events/eventActions";

const rootEL = document.getElementById("root");
// get the store object
const store = configureStore();
store.dispatch(loadEvents());

let render = () => {
  ReactDOM.render(
    // Provider: provides the redux store to the application
    // BrowseRouter: provides the routing functionality to the application
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop>
          <ReduxToastr
            position='bottom-right'
            transitionIn='fadeIn'
            transitionOut='fadeOut' 
          />
          <App />
        </ScrollTop>
      </BrowserRouter>
    </Provider>,

    rootEL
  );
};

if (module.hot) {
  module.hot.accept("./app/layout/App", () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
