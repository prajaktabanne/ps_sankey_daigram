import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { withTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { store } from "./configure-store";
import { Container } from "./Components/SankeyDaigram/container";

function App(props) {
  const { t } = props;
  const onLanguageChanged = (event) => {
    let language = event.currentTarget.value;
    props.i18n.changeLanguage(language);
    store.dispatch({ type: "handleChange", language });
  };
  return (
    <div className="App">
      <Provider store={store}>
        <button value="en" onClick={(value) => onLanguageChanged(value)}>
          English
        </button>
        <button Value="sv" onClick={(value) => onLanguageChanged(value)}>
          Swedish
        </button>
        <Container />
      </Provider>
    </div>
  );
}

export default withTranslation()(App);
