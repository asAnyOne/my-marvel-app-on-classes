class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=35ce66c9948b2d1e6ca91816bfbd7d29";
  _baseOffset = 150;

  getResource = async (url) => {
    let respons = await fetch(url);
    if (!respons.ok) {
      throw new Error(`Could not fetch: ${url} , status: ${respons.status}`);
    }
    return await respons.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset= ${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacterData);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      ` ${this._apiBase}characters/${id}?${this._apiKey}`
    );

    return this._transformCharacterData(res.data.results[0]);
  };

  _transformCharacterData = ({
    id,
    name,
    thumbnail: { path, extension },
    description,
    urls,
    comics: { items },
  }) => {
    return {
      id,
      name,
      thumbnail: path + "." + extension,
      description,
      homePage: urls[0].url,
      wiki: urls[1].url,
      items,
    };
  };
}

export default MarvelService;
