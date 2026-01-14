"use client";

import { useEffect, useState } from "react";

export default function AdminBlogPage() {
  /* ========== STATE ========== */
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  /* ========== API ENDPOINTS (FUTURE) ========== */
  const API = {
    LIST: "/api/blog",
    CREATE: "/api/blog",
    UPDATE: (id) => `/api/blog/${id}`,
    DELETE: (id) => `/api/blog/${id}`,
  };

  /* ========== FETCH BLOGS (TEMP DATA) ========== */
  const fetchBlogs = async () => {
    // 🔌 BACKEND LATER
    // const res = await fetch(API.LIST);
    // const data = await res.json();
    // setBlogs(data);

    // TEMP MOCK DATA
    setBlogs([
      {
        _id: "1",
        title: "Sample Blog (API Ready)",
        content: "This blog content will come from API.",
        createdAt: new Date(),
      },
    ]);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ========== SAVE / UPDATE ========== */
  const handleSave = async () => {
    if (!title || !content) {
      alert("Title & Content required");
      return;
    }

    const payload = { title, content };

    // 🔌 API READY
    // await fetch(
    //   editingId ? API.UPDATE(editingId) : API.CREATE,
    //   {
    //     method: editingId ? "PUT" : "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   }
    // );

    setTitle("");
    setContent("");
    setEditingId(null);
    fetchBlogs();
  };

  /* ========== EDIT ========== */
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setEditingId(blog._id);
  };

  /* ========== DELETE ========== */
  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;

    // 🔌 API READY
    // await fetch(API.DELETE(id), { method: "DELETE" });

    fetchBlogs();
  };

  return (
    <div className="container-fluid p-4">
      <h4 className="fw-semibold mb-4">Blog Management</h4>

      <div className="row g-4">
        {/* ===== BLOG FORM ===== */}
        <div className="col-md-7">
          <div className="card p-3">
            <h6 className="fw-bold mb-3">
              {editingId ? "Edit Blog" : "Create Blog"}
            </h6>

            <input
              className="form-control mb-3"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="form-control"
              rows={10}
              placeholder="Write blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              onClick={handleSave}
              className="btn btn-primary mt-3"
            >
              {editingId ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </div>

        {/* ===== BLOG LIST ===== */}
        <div className="col-md-5">
          <div className="card p-3">
            <h6 className="fw-bold mb-3">Blogs</h6>

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border-bottom pb-2 mb-2"
              >
                <strong>{blog.title}</strong>
                <div className="small text-muted">
                  {new Date(blog.createdAt).toDateString()}
                </div>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
