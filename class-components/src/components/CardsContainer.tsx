import React from "react";
import Card, { CardProps } from "./Card";

export default class CardsContainer extends React.Component {
  apiData: {
    results: CardProps[];
  };
  constructor(props: { results: CardProps[] }) {
    super(props);
    this.apiData = props;
  }
  render() {
    return (
      <div className="cards-container">
        {this.apiData.results.map((el) => {
          return <Card key={el.name} {...el} />;
        })}
      </div>
    );
  }
}
