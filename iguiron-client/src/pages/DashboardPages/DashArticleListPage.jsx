import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
  content: [""],
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
  if (!formData.slug.trim()) errors.slug = "Slug is required.";
  return errors;
}

function ArticleFormFields({ formData, onChange, errors = {} }) {
  const handleContentChange = (value) => {
    onChange("content", [value]);
  };

  const handleTitleChange = (value) => {
    onChange("title", value);
    if (!formData.slug) {
      onChange("slug", slugify(value));
    }
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
        onChange={(e) => onChange("slug", slugify(e.target.value))}
        required
        fullWidth
        error={!!errors.slug}
        helperText={errors.slug || "URL-friendly identifier (auto-generated from title)"}
      />
      <TextField
        label="Content (first paragraph)"
        value={formData.content[0] || ""}
        onChange={(e) => handleContentChange(e.target.value)}
        multiline
        rows={4}
        fullWidth
        placeholder="Enter the article content…"
      />
      <TextField
        label="Image URL"
        value={formData.image}
        onChange={(e) => onChange("image", e.target.value)}
        fullWidth
        placeholder="/images/article.png"
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

  const filteredArticles = articles.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      field: "rowNum",
      headerName: "ID",
      width: 70,
      sortable: false,
      renderCell: (params) =>
        filteredArticles.findIndex((a) => a._id === params.id) + 1,
    },
    { field: "slug", headerName: "Slug", width: 200 },
    { field: "title", headerName: "Title", width: 220 },
    {
      field: "paragraphs",
      headerName: "Paragraphs",
      width: 110,
      valueGetter: (_value, row) => row.content?.length ?? 0,
    },
    {
      field: "preview",
      headerName: "Preview",
      width: 260,
      sortable: false,
      valueGetter: (_value, row) =>
        row.content?.[0]?.slice(0, 80) ?? "",
    },
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
    setSelectedArticle({ ...article });
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
    if (editErrors[field]) {
      setEditErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleEditSave() {
    const errors = validate(selectedArticle);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    try {
      await ArticleService.updateArticle(selectedArticle._id, selectedArticle);
      await loadArticles();
      handleEditClose();
    } catch {
      setApiError("Failed to update article.");
    }
  }

  function handleAddChange(field, value) {
    setAddFormData((prev) => ({ ...prev, [field]: value }));
    if (addErrors[field]) {
      setAddErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
      await ArticleService.createArticle(addFormData);
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
          <Box sx={{ mb: 2 }}>
            <TextField
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ minWidth: 280 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
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
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
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
