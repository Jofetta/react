import React from "react";
import Card, { CardProps } from "./Card";
import { ApiData } from "./Page";
import { defaultURL } from "../utils";
import Loader from "./Loader";

type CardContainerProps = {
  query: string;
  apiData: ApiData;
  isLoading: boolean;
};
export default class CardsContainer extends React.Component<CardContainerProps> {
  apiData: {
    results?: CardProps[];
  };
  query: string;
  isLoading: boolean;
  constructor(props: CardContainerProps) {
    super(props);
    this.apiData = this.props.apiData;
    this.query = this.props.query;
    this.isLoading = this.props.isLoading;
  }

  render() {
    if (this.isLoading) {
      return <Loader />;
    }

    if (this.query === undefined || this.query === "") {
      return (
        <div className="cards-container">
          {this.apiData.results?.map((el) => {
            return <Card key={el.name} {...el} />;
          })}
        </div>
      );
    } else {
      return <Card name={this.query} url={defaultURL + this.query} />;
    }
  }
}
