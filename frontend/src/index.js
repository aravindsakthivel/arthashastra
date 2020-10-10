import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter} from "react-router-dom";
import App from "./App"
import { store } from "./Redux/store"

const rootElement = document.getElementById("root")
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	rootElement
);