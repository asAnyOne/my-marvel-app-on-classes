import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvilService = new MarvelService();

  updateCharById = (id) => {
    if (!this.props.charId) return;
    this.onCharLoading();
    this.marvilService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.charId !== prevProps.charId) {
      this.updateCharById(this.props.charId);
    }
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
      error: false,
    });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };
  render() {
    const { char, loading, error } = this.state;
    return (
      <div className="char__info">
        {error ? (
          <ErrorMessage />
        ) : loading ? (
          <Spinner />
        ) : char ? (
          <View char={char} />
        ) : (
          <Skeleton />
        )}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, wiki, homePage, items } = char;
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={
            thumbnail ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
              ? { objectFit: "contain" }
              : null
          }
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homePage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {items.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
