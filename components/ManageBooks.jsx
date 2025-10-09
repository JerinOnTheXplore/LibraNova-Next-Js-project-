"use client";

import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Loader from "./Loader";

export default function ManageBooks() {
  const [user] = useAuthState(auth);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // form states
  const [form, setForm] = useState({ title: "", author: "", category: "", price: "", image: "" });
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", category: "", price: "", image: "" });

  // modal states
  const [modal, setModal] = useState({ open: false, message: "", type: "success" });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, bookId: null });

  // fetch books
  useEffect(() => {
    if (!user?.email) return;

    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/librarian/books?email=${user.email}`);
        const data = await res.json();
        if (Array.isArray(data)) setBooks(data);
        else setBooks([]);
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  // handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const showModal = (message, type = "success") => setModal({ open: true, message, type });

  // add book
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user?.email) return;

    try {
      const res = await fetch("/api/librarian/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: user.email }),
      });
      const data = await res.json();

      if (data.bookId) {
        setBooks([...books, { ...form, _id: data.bookId }]);
        setForm({ title: "", author: "", category: "", price: "", image: "" });
        showModal("Book added successfully!", "success");
      } else {
        showModal(data.error || "Failed to add book.", "error");
      }
    } catch (err) {
      console.error(err);
      showModal("An unexpected error occurred.", "error");
    }
  };

  // delete book
  const confirmDelete = (id) => setDeleteConfirm({ open: true, bookId: id });
  const handleDelete = async () => {
    const id = deleteConfirm.bookId;
    try {
      const res = await fetch(`/api/librarian/books?bookId=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.deletedCount > 0) {
        setBooks(books.filter((b) => b._id !== id));
        showModal("Book deleted successfully!", "success");
      } else {
        showModal("Failed to delete book.", "error");
      }
    } catch (err) {
      console.error(err);
      showModal("An unexpected error occurred.", "error");
    } finally {
      setDeleteConfirm({ open: false, bookId: null });
    }
  };

  // edit book
  const handleEdit = (book) => {
    setEditingBook(book);
    setEditForm({ title: book.title, author: book.author, category: book.category, price: book.price, image: book.image || "" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingBook) return;

    try {
      const res = await fetch(`/api/librarian/books?bookId=${editingBook._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        setBooks(books.map((b) => (b._id === editingBook._id ? { ...b, ...editForm } : b)));
        setEditingBook(null);
        showModal("Book updated successfully!", "success");
      } else {
        showModal("Failed to update book.", "error");
      }
    } catch (err) {
      console.error(err);
      showModal("An unexpected error occurred.", "error");
    }
  };

  if (loading) return <Loader/>;
  if (!user) return <p>Please login as librarian.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* add book form */}
      <form onSubmit={handleAdd} className="mb-6 space-y-3 bg-base-200 p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-base-content mb-2">Add New Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 w-full text-base-content rounded" required />
          <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} className="border p-2 w-full text-base-content rounded" required />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 w-full text-base-content rounded" required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full text-base-content rounded" required />
          <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border p-2 w-full text-base-content rounded md:col-span-2" />
        </div>
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">Add Book</button>
      </form>

      {/* books table */}
      <div className="overflow-x-auto bg-base-200 rounded shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-base-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Title</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Author</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id}>
                <td className="px-4 py-2 text-base-content">{book.title}</td>
                <td className="px-4 py-2 text-base-content">{book.author}</td>
                <td className="px-4 py-2 text-base-content">{book.category}</td>
                <td className="px-4 py-2 text-base-content">${book.price}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(book)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
                  <button onClick={() => confirmDelete(book._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <Transition appear show={editingBook !== null} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setEditingBook(null)}>
            {/* modal backdrop */}
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-base-100 bg-opacity-50" />
            </Transition.Child>
            {/* modal panel */}
            <div className="fixed inset-0 flex items-center text-base-content justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="bg-base-200 p-6 rounded shadow-md w-full max-w-md">
                  <Dialog.Title className="text-lg font-bold mb-4">Edit Book</Dialog.Title>
                  <form onSubmit={handleEditSubmit} className="space-y-3">
                    <input type="text" name="title" value={editForm.title} onChange={handleEditChange} className="border p-2 w-full rounded text-base-content" required />
                    <input type="text" name="author" value={editForm.author} onChange={handleEditChange} className="border p-2 w-full rounded text-base-content" required />
                    <input type="text" name="category" value={editForm.category} onChange={handleEditChange} className="border p-2 w-full rounded text-base-content" required />
                    <input type="number" name="price" value={editForm.price} onChange={handleEditChange} className="border p-2 w-full rounded text-base-content" required />
                    <input type="text" name="image" value={editForm.image} onChange={handleEditChange} className="border p-2 w-full rounded text-base-content" placeholder="Image URL" />
                    <div className="flex justify-end gap-2 mt-2">
                      <button type="button" onClick={() => setEditingBook(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}

      {/* Delete Confirmation Modal */}
      <Transition appear show={deleteConfirm.open} as={Fragment}>
        <Dialog as="div" className="relative z-50 text-base-content" onClose={() => setDeleteConfirm({ open: false, bookId: null })}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-base-100 bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="bg-base-200 p-6 rounded shadow-md w-full max-w-sm border-l-4 border-red-500">
                <Dialog.Title className="text-lg font-bold mb-4">Confirm Delete</Dialog.Title>
                <p>Are you sure you want to delete this book?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setDeleteConfirm({ open: false, bookId: null })} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">No</button>
                  <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Yes</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Success/Error Modal */}
      <Transition appear show={modal.open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setModal({ ...modal, open: false })}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-base-100 bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className={`bg-base-200 p-6 rounded text-base-content shadow-md w-full max-w-sm ${modal.type === "success" ? "border-l-4 border-green-500" : "border-l-4 border-red-500"}`}>
                <Dialog.Title className="text-lg font-bold mb-2">{modal.type === "success" ? "Success!" : "Error!"}</Dialog.Title>
                <p>{modal.message}</p>
                <div className="flex justify-end mt-4">
                  <button onClick={() => setModal({ ...modal, open: false })} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Close</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
