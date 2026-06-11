import React, { useState, useEffect } from "react";

import {
  getAllNotes,
  saveNote,
  deleteNote,
  updateNote,
} from "../utils/indexedDB";

const colors = [
  "#FFE66D",
  "#FFB6C1",
  "#A7F3D0",
  "#BFDBFE",
  "#FBCFE8",
  "#FDE68A",
];

export default function NotesBoard() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [images, setImages] = useState([]);

  const [selectedColor, setSelectedColor] =
    useState(colors[0]);

  const [hoveredNote, setHoveredNote] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await getAllNotes();

      data.sort(
        (a, b) =>
          b.createdAt - a.createdAt
      );

      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImages = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prev) => [
          ...prev,
          reader.result,
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const addNote = async () => {
    if (
      !title.trim() &&
      !description.trim() &&
      images.length === 0
    ) {
      return;
    }

    const note = {
      id: Date.now(),

      title,

      description,

      images,

      color: selectedColor,

      createdAt: Date.now(),
    };

    try {
      await saveNote(note);

      setNotes((prev) => [
        note,
        ...prev,
      ]);

      setTitle("");
      setDescription("");
      setImages([]);

      const fileInput =
        document.getElementById(
          "noteImages"
        );

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeImagePreview = (index) => {
    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  const editNote = async (note) => {
    const newTitle = prompt(
      "Edit Title",
      note.title
    );

    if (newTitle === null) return;

    const newDescription = prompt(
      "Edit Description",
      note.description
    );

    if (newDescription === null) return;

    const updatedNote = {
      ...note,
      title: newTitle,
      description: newDescription,
    };

    try {
      await updateNote(updatedNote);

      setNotes((prev) =>
        prev.map((n) =>
          n.id === note.id
            ? updatedNote
            : n
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);

      setNotes((prev) =>
        prev.filter(
          (note) =>
            note.id !== id
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 16,
          marginBottom: 24,
          boxShadow:
            "0 4px 12px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            color: "black",
          }}
        >
          📌 Create New Note
        </h2>

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Title"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
          }}
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Description"
          rows={4}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            resize: "vertical",
          }}
        />

        <input
          id="noteImages"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          {colors.map((color) => (
            <div
              key={color}
              onClick={() =>
                setSelectedColor(
                  color
                )
              }
              style={{
                width: 36,
                height: 36,
                background:
                  color,
                cursor: "pointer",
                border:
                  selectedColor ===
                  color
                    ? "3px solid black"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>

        {images.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(100px,1fr))",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {images.map(
              (
                image,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    position:
                      "relative",
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      width:
                        "100%",
                      height: 100,
                      objectFit:
                        "cover",
                    }}
                  />

                  <button
                    onClick={() =>
                      removeImagePreview(
                        index
                      )
                    }
                    style={{
                      position:
                        "absolute",
                      top: 4,
                      right: 4,
                    }}
                  >
                    ✕
                  </button>
                </div>
              )
            )}
          </div>
        )}

        <button
          onClick={addNote}
        >
          Add Note
        </button>
      </div>
      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            onMouseEnter={() =>
              setHoveredNote(note.id)
            }
            onMouseLeave={() =>
              setHoveredNote(null)
            }
            style={{
              background: note.color,
              width: 280,
              minHeight: 260,
              padding: 16,
              position: "relative",
              boxShadow:
                "0 6px 16px rgba(0,0,0,.15)",
              transform:
  hoveredNote === note.id
    ? "rotate(-1deg) scale(1.04)"
    : "rotate(-1deg)",
              transition: ".2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -18,
                left: "50%",
                transform:
                  "translateX(-50%)",
                fontSize: 34,
              }}
            >
              📌
            </div>

            {hoveredNote === note.id && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  gap: 8,
                  background:
                    "rgba(255,255,255,.9)",
                  padding: 6,
                  borderRadius: 8,
                }}
              >
                <button
                  onClick={() =>
                    editNote(note)
                  }
                >
                  ✏️
                </button>

                <button
                  onClick={() =>
                    removeNote(note.id)
                  }
                >
                  🗑️
                </button>
              </div>
            )}

            <h3
              style={{
                marginTop: 12,
              }}
            >
              {note.title}
            </h3>

            <div
              style={{
                whiteSpace:
                  "pre-wrap",
                marginBottom: 12,
              }}
            >
              {note.description}
            </div>

            {note.images &&
              note.images.length >
                0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(2,1fr)",
                    gap: 8,
                  }}
                >
                  {note.images.map(
                    (
                      img,
                      index
                    ) => (
                      <img
                        key={
                          index
                        }
                        src={img}
                        alt=""
                        onClick={() =>
                          setSelectedImage(
                            img
                          )
                        }
                        style={{
                          width:
                            "100%",
                          height: 120,
                          objectFit:
                            "cover",
                          cursor:
                            "pointer",
                          border:
                            "1px solid #ddd",
                        }}
                      />
                    )
                  )}
                </div>
              )}
            {hoveredNote === note.id && (
            <div
              style={{
                marginTop: 12,
                fontSize: 11,
                opacity: 0.6,
              }}
            >
              {new Date(
                note.createdAt
              ).toLocaleString()}
            </div>)}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          onClick={() =>
            setSelectedImage(
              null
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,.85)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 9999,
          }}
        >
          <img
            src={selectedImage}
            alt=""
            style={{
              maxWidth: "90vw",
              maxHeight:
                "90vh",
            }}
          />
        </div>
      )}
    </div>
  );
}
