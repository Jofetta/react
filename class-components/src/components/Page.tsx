import React, { ChangeEvent } from "react";
import Input, { InputProps } from "./Input";
import SearchButton, { ButtonProps } from "./SearchButton";
import fetchData from "./../utils";
import CardsContainer from "./CardsContainer";
import ErrorBoundary from "./ErrorBoundary";

export type ApiData = {
  query?: string;
  results?: [];
};
export default class Page extends React.Component<ApiData> {
  state: {
    query?: string;
    results?: [];
    apiData?: [];
  };

  constructor(props: ApiData) {
    super(props);
    this.state = props;
  }

  updateState(searchString?: string) {
    this.setState({ searchString: searchString });
  }
  async handleClick() {
    const data = await fetchData();
    this.setState({
      apiData: data,
    });
  }

  componentDidMount() {
    this.handleClick();
  }

  render() {
    const props: ButtonProps = {
      callback: () => this.handleClick(),
    };
    const inputProps: InputProps = {
      initialState: "",
      callback: (e: ChangeEvent) => {
        if (e?.target instanceof HTMLInputElement)
          this.updateState(e.target.value);
      },
    };

    return (
      <main>
        <section>
          <Input {...inputProps} />
          <SearchButton {...props} />
        </section>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <section>
            {this.state.apiData && <CardsContainer {...this.state.apiData} />}
          </section>
        </ErrorBoundary>
      </main>
    );
  }
}
