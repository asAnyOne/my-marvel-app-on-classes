import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/MarvelService";

import mjolnir from "../../resources/img/mjolnir.png";
import "./randomChar.scss";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  onCharLoaded = (char) =>
    this.setState({ char, loading: false, error: false });

  marvelService = new MarvelService();
  componentDidMount() {
    this.updateCharacter();
  }

  errorMessage = () => {
    this.setState({ loading: false, error: true });
  };

  updateCharacter = () => {
    const id = Math.floor(Math.random() * 400 + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.errorMessage);
  };

  render() {
    const { char, loading, error } = this.state;

    return (
      <div className="randomchar">
        {error ? (
          <ErrorMessage />
        ) : loading ? (
          <Spinner />
        ) : (
          <View char={char} />
        )}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            onClick={this.updateCharacter}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

function View({ char }) {
  const { name, thumbnail, description, homePage, wiki } = char;
  const fill = { objectFit: "fill" };
  return (
    <div className="randomchar__block">
      <img
        style={
          thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? fill
            : {}
        }
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description || "This character has not description"}
        </p>
        <div className="randomchar__btns">
          <a href={homePage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;
