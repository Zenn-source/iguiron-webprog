import { useState, useEffect } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArticleService from "../../services/ArticleService";

const emptyForm = {
  title: "",
  slug: "",
  content: "",
  image: "",
  isActive: true,
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function validate(formData) {
  const errors = {};
  if (!formData.title.trim()) errors.title = "Title is required.";
  if (!formData.slug.trim()) {
    errors.slug = "Slug is required.";
  } else if (/\s/.test(formData.slug)) {
    errors.slug = "Slug must not contain spaces.";
  }
  return errors;
}

function formToApi(formData) {
  return {
    title: formData.title.trim(),
    slug: formData.slug.trim(),
    content: formData.content
      ? formData.content.split("\n").filter((line) => line.trim())
      : [],
    image: formData.image.trim() || undefined,
    isActive: formData.isActive,
  };
}

function apiToForm(article) {
  return {
    title: article.title,
    slug: article.slug,
    content: Array.isArray(article.content) ? article.content.join("\n") : "",
    image: article.image || "",
    isActive: article.isActive,
  };
}

function ArticleFormFields({ formData, onChange, errors = {}, isEdit = false }) {
  const handleTitleChange = (value) => {
    onChange("title", value);
    if (!isEdit) onChange("slug", slugify(value));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
      <TextField
        label="Title"
        value={formData.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        required
        fullWidth
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Slug"
        value={formData.slug}
        onChange={(e) => onChange("slug", e.target.value)}
        required
        fullWidth
        error={!!errors.slug}
        helperText={errors.slug || "Used in the article URL (no spaces)"}
      />
      <TextField
        label="Content"
        value={formData.content}
        onChange={(e) => onChange("content", e.target.value)}
        multiline
        rows={6}
        fullWidth
        placeholder="Write your article content here…"
        helperText="Each line becomes a paragraph."
      />
      <TextField
        label="Image URL"
        value={formData.image}
        onChange={(e) => onChange("image", e.target.value)}
        fullWidth
        placeholder="https://example.com/image.jpg"
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.isActive}
            onChange={(e) => onChange("isActive", e.target.checked)}
            color="primary"
          />
        }
        label={`Status: ${formData.isActive ? "Active" : "Inactive"}`}
      />
    </Box>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [addFormData, setAddFormData] = useState(emptyForm);

  const [addErrors, setAddErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await ArticleService.getAllArticles();
      setArticles(data);
    } catch {
      setApiError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.slug.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && article.isActive) ||
      (statusFilter === "Inactive" && !article.isActive);
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      field: "rowNum",
      headerName: "ID",
      width: 60,
      sortable: false,
      renderCell: (params) =>
        filteredArticles.findIndex((a) => a._id === params.id) + 1,
    },
    { field: "title", headerName: "Title", width: 240 },
    { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "isActive",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          size="small"
          variant="outlined"
          color={params.value ? "success" : "error"}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 130,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: "100%" }}>
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
            color={params.row.isActive ? "error" : "success"}
            onClick={() => handleToggleStatus(params.row)}>
            {params.row.isActive ? "Disable" : "Activate"}
          </Button>
        </Box>
      ),
    },
  ];

  async function handleToggleStatus(article) {
    try {
      await ArticleService.updateArticle(article._id, { isActive: !article.isActive });
      await loadArticles();
    } catch {
      setApiError("Failed to update article status.");
    }
  }

  function handleEditOpen(article) {
    setSelectedArticle({ ...article, ...apiToForm(article) });
    setEditErrors({});
    setEditModalOpen(true);
  }

  function handleEditClose() {
    setEditModalOpen(false);
    setSelectedArticle(null);
    setEditErrors({});
  }

  function handleEditChange(field, value) {
    setSelectedArticle((prev) => ({ ...prev, [field]: value }));
    if (editErrors[field]) setEditErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleEditSave() {
    const errors = validate(selectedArticle);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    try {
      await ArticleService.updateArticle(selectedArticle._id, formToApi(selectedArticle));
      await loadArticles();
      handleEditClose();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to update article.");
    }
  }

  function handleAddChange(field, value) {
    setAddFormData((prev) => ({ ...prev, [field]: value }));
    if (addErrors[field]) setAddErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleAddClose() {
    setAddModalOpen(false);
    setAddFormData(emptyForm);
    setAddErrors({});
  }

  async function handleAddSave() {
    const errors = validate(addFormData);
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }
    try {
      await ArticleService.createArticle(formToApi(addFormData));
      await loadArticles();
      handleAddClose();
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to create article.");
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}>
        <Typography variant="h4">Articles</Typography>
        <Button variant="contained" onClick={() => setAddModalOpen(true)}>
          ADD ARTICLE
        </Button>
      </Box>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError("")}>
          {apiError}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <TextField
              placeholder="Search by title or slug…"
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

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: 520, width: "100%" }}>
              <DataGrid
                rows={filteredArticles}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: { paginationModel: { pageSize: 8 } },
                }}
                pageSizeOptions={[8, 15]}
                disableRowSelectionOnClick
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add Article Modal */}
      <Dialog open={addModalOpen} onClose={handleAddClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Article</DialogTitle>
        <DialogContent>
          <ArticleFormFields
            formData={addFormData}
            onChange={handleAddChange}
            errors={addErrors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSave}>
            Save Article
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Article Modal */}
      {selectedArticle && (
        <Dialog open={editModalOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogContent>
            <ArticleFormFields
              formData={selectedArticle}
              onChange={handleEditChange}
              errors={editErrors}
              isEdit
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default DashArticleListPage;
