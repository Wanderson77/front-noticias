import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";

export default class Noticia extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNoticia = this.getNoticia.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateNoticia = this.updateNoticia.bind(this);
    this.deleteNoticia = this.deleteNoticia.bind(this);

    this.state = {
      currentNoticia: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNoticia(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNoticia: {
          ...prevState.currentNoticia,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentNoticia: {
        ...prevState.currentNoticia,
        description: description
      }
    }));
  }

  getNoticia(id) {
    NoticiaDataService.get(id)
      .then(response => {
        this.setState({
          currentNoticia: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentNoticia.id,
      title: this.state.currentNoticia.title,
      description: this.state.currentNoticia.description,
      published: status
    };

    NoticiaDataService.update(this.state.currentNoticia.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentNoticia: {
            ...prevState.currentNoticia,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNoticia() {
    NoticiaDataService.update(
      this.state.currentNoticia.id,
      this.state.currentNoticia
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "A notícia foi atualizada com successo!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNoticia() {    
    NoticiaDataService.delete(this.state.currentNoticia.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/noticias')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNoticia } = this.state;

    return (
      <div>
        {currentNoticia ? (
          <div className="edit-form">
            <h4>Noticia</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNoticia.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentNoticia.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentNoticia.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentNoticia.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNoticia}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNoticia}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Click em uma notícia</p>
          </div>
        )}
      </div>
    );
  }
}