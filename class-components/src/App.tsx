import React from "react";
import "./App.css";
import Page, { ApiData } from "./components/Page";
import fetchData from "./utils";
import ErrorBoundary from "./components/ErrorBoundary";

class App extends React.Component<ApiData> {
  state: {
    query: string;
    results: [];
  };
  constructor(props: ApiData) {
    super(props);
    this.state = { query: "", results: [] };
  }
  async componentDidMount() {
    const data = await fetchData();
    this.setState({ query: "", results: data.results });
  }

  render() {
    return (
      <ErrorBoundary
        fallback={<div className="fallback">Ooops, the App crashed</div>}
      >
        <Page query={this.state.query} results={this.state.results} />;
      </ErrorBoundary>
    );
  }
}

export default App;
