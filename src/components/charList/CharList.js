import "./charList.scss";

import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newCharListLoading: false,
    offset: 1540,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onNewCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };
  onNewCharListLoading = () => {
    this.setState({ newCharListLoading: true });
  };
  onCharListLoaded = (newCharList) => {
    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newCharListLoading: false,
      offset: offset + 9,
      charEnded: newCharList.length < 9,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  makeCharCards = (arr) => {
    const chars = arr.map((char) => {
      return (
        <li
          className="char__item"
          key={char.id}
          onClick={() => this.props.getCharId(char.id)}
        >
          <img
            src={char.thumbnail}
            alt={char.name}
            style={
              char.thumbnail ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                ? { objectFit: "fill" }
                : null
            }
          />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{chars}</ul>;
  };

  render() {
    const { charList, loading, error, offset, newCharListLoading, charEnded } =
      this.state;
    const cards = this.makeCharCards(charList);
    return (
      <div className="char__list">
        {error ? <ErrorMessage /> : loading ? <Spinner /> : cards}
        <button
          className="button button__main button__long"
          onClick={() => this.onRequest(offset)}
          disabled={newCharListLoading}
          style={charEnded ? { display: "none" } : {}}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
