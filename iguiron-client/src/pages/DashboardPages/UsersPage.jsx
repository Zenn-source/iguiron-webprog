  import { useState } from "react";
  import { DataGrid } from "@mui/x-data-grid";
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import Card from "@mui/material/Card";
  import CardContent from "@mui/material/CardContent";
  import Button from "@mui/material/Button";
  import TextField from "@mui/material/TextField";
  import Select from "@mui/material/Select";
  import MenuItem from "@mui/material/MenuItem";
  import FormControl from "@mui/material/FormControl";
  import InputLabel from "@mui/material/InputLabel";
  import Dialog from "@mui/material/Dialog";
  import DialogTitle from "@mui/material/DialogTitle";
  import DialogContent from "@mui/material/DialogContent";
  import DialogActions from "@mui/material/DialogActions";
  import Chip from "@mui/material/Chip";
  import InputAdornment from "@mui/material/InputAdornment";
  import SearchIcon from "@mui/icons-material/Search";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  import IconButton from "@mui/material/IconButton";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import Switch from "@mui/material/Switch";
  import initialUsersData from "../../data/users.json";

  const emptyForm = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "Male",
    contactNumber: "",
    email: "",
    role: "User",
    username: "",
    password: "",
    address: "",
    status: "Active",
  };

  function validate(formData, isEdit = false) {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required.";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required.";

    if (
      formData.age !== "" &&
      (isNaN(Number(formData.age)) || Number(formData.age) <= 0)
    ) {
      errors.age = "Age must be a positive number.";
    }

    if (formData.contactNumber && !/^\d{1,11}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Must be up to 11 digits.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.username.trim()) errors.username = "Username is required.";

    if (!isEdit) {
      if (!formData.password.trim()) {
        errors.password = "Password is required.";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      }
    } else if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  }

  function UserFormFields({ formData, onChange, errors = {}, isEdit = false }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, pt: 1 }}>
        {/* Row 1: First Name | Last Name */}
        <TextField
          label="First Name"
          value={formData.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />

        {/* Row 2: Age | Gender */}
        <TextField
          label="Age"
          value={formData.age}
          onChange={(e) => onChange("age", e.target.value)}
          inputProps={{ inputMode: "numeric" }}
          error={!!errors.age}
          helperText={errors.age}
        />
        <FormControl>
          <InputLabel id="form-gender-label">Gender</InputLabel>
          <Select
            labelId="form-gender-label"
            label="Gender"
            value={formData.gender}
            onChange={(e) => onChange("gender", e.target.value)}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Row 3: Contact Number | Email Address */}
        <TextField
          label="Contact Number"
          value={formData.contactNumber}
          onChange={(e) => onChange("contactNumber", e.target.value)}
          inputProps={{ maxLength: 11 }}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
        />
        <TextField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        {/* Row 4: Role | Username */}
        <FormControl>
          <InputLabel id="form-role-label">Role</InputLabel>
          <Select
            labelId="form-role-label"
            label="Role"
            value={formData.role}
            onChange={(e) => onChange("role", e.target.value)}>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Username"
          value={formData.username}
          onChange={(e) => onChange("username", e.target.value)}
          required
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          required={!isEdit}
          error={!!errors.password}
          helperText={
            errors.password ||
            (isEdit ? "Leave blank to keep the current password." : "")
          }
          sx={{ gridColumn: "span 2" }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label="toggle password visibility">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Row 6: Address (full-width) */}
        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          sx={{ gridColumn: "span 2" }}
          error={!!errors.address}
          helperText={errors.address}
        />

        {/* Status toggle — matches image ("User status: Active") */}
        <Box sx={{ gridColumn: "span 2" }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.status === "Active"}
                onChange={(e) =>
                  onChange("status", e.target.checked ? "Active" : "Inactive")
                }
                color="primary"
              />
            }
            label={`User status: ${formData.status}`}
          />
        </Box>
      </Box>
    );
  }

  // ─── Main page ───────────────────────────────────────────────────────────────
  function UsersPage() {
    const [users, setUsers] = useState(initialUsersData);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [genderFilter, setGenderFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addFormData, setAddFormData] = useState(emptyForm);

    // Track highest id to avoid collisions after deletions
    const [nextId, setNextId] = useState(
      () => Math.max(0, ...initialUsersData.map((u) => u.id)) + 1,
    );

    // Per-form error states
    const [addErrors, setAddErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});

    // ── Filtering ──────────────────────────────────────────────────────────────
    const filteredUsers = users.filter((user) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesGender =
        genderFilter === "All" || user.gender === genderFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });

    // ── Columns ────────────────────────────────────────────────────────────────
    const columns = [
      {
        field: "rowNum",
        headerName: "ID",
        width: 60,
        sortable: false,
        renderCell: (params) =>
          filteredUsers.findIndex((u) => u.id === params.id) + 1,
      },
      {
        field: "fullName",
        headerName: "Full Name",
        width: 160,
        valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`,
      },
      { field: "username", headerName: "Username", width: 130 },
      { field: "age", headerName: "Age", width: 70 },
      { field: "gender", headerName: "Gender", width: 90 },
      { field: "contactNumber", headerName: "Phone", width: 130 },
      { field: "email", headerName: "Email", width: 190 },
      { field: "role", headerName: "Role", width: 90 },
      {
        field: "status",
        headerName: "Status",
        width: 110,
        renderCell: (params) => (
          <Chip
            label={params.value}
            size="small"
            variant="outlined"
            color={params.value === "Active" ? "success" : "error"}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        sortable: false,
        renderCell: (params) => {
          const isActive = params.row.status === "Active";
          return (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "100%",
              }}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleEditOpen(params.row)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                color={isActive ? "error" : "success"}
                onClick={() => handleToggleStatus(params.row.id)}>
                {isActive ? "Disable" : "Activate"}
              </Button>
            </Box>
          );
        },
      },
    ];

    // ── Handlers ───────────────────────────────────────────────────────────────
    function handleToggleStatus(id) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
            : u,
        ),
      );
    }

    function handleEditOpen(user) {
      // Don't expose stored password hash/value in the edit form
      setSelectedUser({ ...user, password: "" });
      setEditErrors({});
      setEditModalOpen(true);
    }

    function handleEditClose() {
      setEditModalOpen(false);
      setSelectedUser(null);
      setEditErrors({});
    }

    function handleEditChange(field, value) {
      setSelectedUser((prev) => ({ ...prev, [field]: value }));
      // Clear the error for the field being edited
      if (editErrors[field]) {
        setEditErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }

    function handleEditSave() {
      const errors = validate(selectedUser, true);
      if (Object.keys(errors).length > 0) {
        setEditErrors(errors);
        return;
      }
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...selectedUser, age: Number(selectedUser.age) }
            : u,
        ),
      );
      handleEditClose();
    }

    function handleAddChange(field, value) {
      setAddFormData((prev) => ({ ...prev, [field]: value }));
      // Clear the error for the field being edited
      if (addErrors[field]) {
        setAddErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }

    function handleAddClose() {
      setAddModalOpen(false);
      setAddFormData(emptyForm);
      setAddErrors({});
    }

    function handleAddSave() {
      const errors = validate(addFormData, false);
      if (Object.keys(errors).length > 0) {
        setAddErrors(errors);
        return;
      }
      setUsers((prev) => [
        ...prev,
        { ...addFormData, id: nextId, age: Number(addFormData.age) },
      ]);
      setNextId((prev) => prev + 1);
      handleAddClose();
    }

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}>
          <Typography variant="h4">Users</Typography>
          <Button variant="contained" onClick={() => setAddModalOpen(true)}>
            ADD USER
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
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
                  onChange={(e) => setRoleFilter(e.target.value)}>
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
                  onChange={(e) => setGenderFilter(e.target.value)}>
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
                  onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ height: 520, width: "100%" }}>
              <DataGrid
                rows={filteredUsers}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 8 } },
                }}
                pageSizeOptions={[8, 15]}
                // checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        {/* Add User Modal */}
        <Dialog
          open={addModalOpen}
          onClose={handleAddClose}
          maxWidth="md"
          fullWidth>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <UserFormFields
              formData={addFormData}
              onChange={handleAddChange}
              errors={addErrors}
              isEdit={false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddSave}>
              Save User
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Modal */}
        {selectedUser && (
          <Dialog
            open={editModalOpen}
            onClose={handleEditClose}
            maxWidth="md"
            fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              <UserFormFields
                formData={selectedUser}
                onChange={handleEditChange}
                errors={editErrors}
                isEdit={true}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button variant="contained" onClick={handleEditSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog> 
        )}
      </>
    );
  }

  export default UsersPage;
