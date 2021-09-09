import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";
import { Link } from "react-router-dom";

export default class NoticiasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveNoticias = this.retrieveNoticias.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNoticia = this.setActiveNoticia.bind(this);
    this.removeAllNoticias = this.removeAllNoticias.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      noticias: [],
      currentNoticia: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveNoticias();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveNoticias() {
    NoticiaDataService.getAll()
      .then(response => {
        this.setState({
          noticias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNoticias();
    this.setState({
      currentNoticia: null,
      currentIndex: -1
    });
  }

  setActiveNoticia(noticia, index) {
    this.setState({
      currentNoticia: noticia,
      currentIndex: index
    });
  }

  removeAllNoticias() {
    NoticiaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    NoticiaDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          noticias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, noticias, currentNoticia, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Listar Noticias</h4>

          <ul className="list-group">
            {noticias &&
              noticias.map((noticia, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNoticia(noticia, index)}
                  key={index}
                >
                  {noticia.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllNoticias}
          >
            Remover Todos
          </button>
        </div>
        <div className="col-md-6">
          {currentNoticia ? (
            <div>
              <h4>Noticia</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentNoticia.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentNoticia.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentNoticia.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/noticias/" + currentNoticia.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click em uma notícia</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}