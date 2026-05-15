import axios from 'axios';
import { API_URL } from '../constants';

const BASE = `${API_URL}/users`;

const TYPE_TO_ROLE = { admin: 'Admin', editor: 'Editor', viewer: 'User' };
const ROLE_TO_TYPE = { Admin: 'admin', Editor: 'editor', User: 'viewer' };

function fromApi(user) {
  return {
    ...user,
    id: user._id,
    role: TYPE_TO_ROLE[user.type] ?? user.type,
    status: user.isActive ? 'Active' : 'Inactive',
  };
}

function toApi(formData) {
  const { role, status, id, ...rest } = formData;
  return {
    ...rest,
    type: ROLE_TO_TYPE[role] ?? role,
    isActive: status === 'Active',
    age: rest.age ? Number(rest.age) : undefined,
  };
}

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const UserService = {
  getUsers: () =>
    axios.get(BASE, { headers: authHeader() }).then((r) => r.data.map(fromApi)),

  createUser: (data) =>
    axios.post(BASE, data).then((r) => r.data),

  updateUser: (id, data) =>
    axios.put(`${BASE}/${id}`, toApi(data), { headers: authHeader() }).then((r) => r.data),

  deleteUser: (id) =>
    axios.delete(`${BASE}/${id}`, { headers: authHeader() }).then((r) => r.data),

  login: (email, password) =>
    axios.post(`${BASE}/login`, { email, password }).then((r) => r.data),
};

export default UserService;
