import React from "react";
import fetchData from "../utils";

export type CardProps = {
  name: string;
  url: string;
};

export default class Card extends React.Component<CardProps> {
  name: string;
  url: string;

  state: {
    image: string;
  };
  constructor(props: CardProps) {
    super(props);
    this.name = props.name;
    this.url = props.url;
    this.state = {
      image: "",
    };
  }

  async componentDidMount() {
    const data = await fetchData(this.props.url);
    console.log(data);
    this.setState({ image: data.sprites.front_default });
  }
  render() {
    return (
      <div className="card">
        <h1>{this.name}</h1>
        <img src={this.state.image} alt="pokemon-image" />
      </div>
    );
  }
}
