import http from "../http-common";

class NoticiaDataService {
  getAll() {
    return http.get("/noticias");
  }

  get(id) {
    return http.get(`/noticias/${id}`);
  }

  create(data) {
    return http.post("/noticias", data);
  }

  update(id, data) {
    return http.put(`/noticias/${id}`, data);
  }

  delete(id) {
    return http.delete(`/noticias/${id}`);
  }

  deleteAll() {
    return http.delete(`/noticias`);
  }

  findByTitle(title) {
    return http.get(`/noticias?title=${title}`);
  }
}

export default new NoticiaDataService();