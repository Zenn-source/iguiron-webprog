import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import initialUsersData from '../../data/users.json';

const emptyForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  role: 'User',
  gender: 'Male',
  age: '',
  contactNumber: '',
  status: 'Active',
};

function UserFormFields({ formData, onChange }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, pt: 1 }}>
      <TextField
        label="First Name"
        value={formData.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        size="small"
        required
      />
      <TextField
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        size="small"
        required
      />
      <TextField
        label="Username"
        value={formData.username}
        onChange={(e) => onChange('username', e.target.value)}
        size="small"
        required
      />
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
        size="small"
        required
      />
      <FormControl size="small">
        <InputLabel id="form-role-label">Role</InputLabel>
        <Select
          labelId="form-role-label"
          label="Role"
          value={formData.role}
          onChange={(e) => onChange('role', e.target.value)}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Editor">Editor</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="form-gender-label">Gender</InputLabel>
        <Select
          labelId="form-gender-label"
          label="Gender"
          value={formData.gender}
          onChange={(e) => onChange('gender', e.target.value)}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Age"
        value={formData.age}
        onChange={(e) => onChange('age', e.target.value)}
        size="small"
        inputProps={{ inputMode: 'numeric' }}
      />
      <TextField
        label="Contact Number"
        value={formData.contactNumber}
        onChange={(e) => onChange('contactNumber', e.target.value)}
        size="small"
        inputProps={{ maxLength: 11 }}
      />
      <FormControl size="small" sx={{ gridColumn: 'span 2' }}>
        <InputLabel id="form-status-label">Status</InputLabel>
        <Select
          labelId="form-status-label"
          label="Status"
          value={formData.status}
          onChange={(e) => onChange('status', e.target.value)}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function UsersPage() {
  const [users, setUsers] = useState(initialUsersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addFormData, setAddFormData] = useState(emptyForm);
  const [nextId, setNextId] = useState(initialUsersData.length + 1);

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      user.firstName.toLowerCase().includes(q) ||
      user.lastName.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q);
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const columns = [
    {
      field: 'rowNum',
      headerName: '#',
      width: 60,
      sortable: false,
      renderCell: (params) => filteredUsers.findIndex((u) => u.id === params.id) + 1,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 180,
      valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 210 },
    {
      field: 'role',
      headerName: 'Role',
      width: 110,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'Active' ? 'success' : 'error'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleEditOpen(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  }

  function handleEditOpen(user) {
    setSelectedUser({ ...user });
    setEditModalOpen(true);
  }

  function handleEditChange(field, value) {
    setSelectedUser((prev) => ({ ...prev, [field]: value }));
  }

  function handleEditSave() {
    setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    setEditModalOpen(false);
    setSelectedUser(null);
  }

  function handleAddChange(field, value) {
    setAddFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddSave() {
    setUsers((prev) => [...prev, { ...addFormData, id: nextId, age: Number(addFormData.age) }]);
    setNextId((prev) => prev + 1);
    setAddFormData(emptyForm);
    setAddModalOpen(false);
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={() => setAddModalOpen(true)}>
          ADD USER
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <TextField
              placeholder="Search by name, email, or username…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ flexGrow: 1, minWidth: 220 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="role-filter-label">Role</InputLabel>
              <Select
                labelId="role-filter-label"
                label="Role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="gender-filter-label">Gender</InputLabel>
              <Select
                labelId="gender-filter-label"
                label="Gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
              pageSizeOptions={[8, 15]}
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <UserFormFields formData={addFormData} onChange={handleAddChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setAddModalOpen(false); setAddFormData(emptyForm); }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      {selectedUser && (
        <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <UserFormFields formData={selectedUser} onChange={handleEditChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default UsersPage;
