import axios from 'axios';
import { API_URL } from '../constants';

const BASE = `${API_URL}/articles`;

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const ArticleService = {
  getArticles: () =>
    axios.get(BASE).then((r) => r.data),

  getAllArticles: () =>
    axios.get(`${BASE}?all=true`, { headers: authHeader() }).then((r) => r.data),

  getArticleBySlug: (slug) =>
    axios.get(BASE).then((r) => r.data.find((a) => a.slug === slug) ?? null),

  createArticle: (data) =>
    axios.post(BASE, data, { headers: authHeader() }).then((r) => r.data),

  updateArticle: (id, data) =>
    axios.put(`${BASE}/${id}`, data, { headers: authHeader() }).then((r) => r.data),

  deleteArticle: (id) =>
    axios.delete(`${BASE}/${id}`, { headers: authHeader() }).then((r) => r.data),
};

export default ArticleService;
