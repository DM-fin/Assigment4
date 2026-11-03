# Todo List Express Router API

A lightweight, in-memory RESTful API for managing tasks (todos) built with **Node.js**, **Express**, and **UUID**.

## Features
* Full CRUD capabilities (Create, Read, Update, Delete).
* Filtering todos by their state via query parameters.
* Input validation for task states.
* Automatic timestamps for creation and modification (`en-FI` locale format).

---

## Technical Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **ID Generation:** uuid (v4)

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### Installation
1. Initialize your project (if not already done):
   ```bash
   npm init -y
   ```
2. Install the required dependencies:
   ```bash
   npm install express uuid
   ```
3. Ensure your `package.json` includes `"type": "module"` to support ES import syntax:
   ```json
   {
     "type": "module"
   }
   ```

---

## Todo Object Structure

Each todo item has the following schema:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String (UUIDv4) | Unique identifier |
| `title` | String | Title of the task |
| `description` | String | Detailed description (Defaults to `"underfined"`) |
| `state` | String | Allowed values: `"todo"`, `"doing"`, `"done"` |
| `dueDate` | String | Due date for the task (Defaults to `"underfined"`) |
| `createdAt` | String | Creation timestamp (`en-FI` format) |
| `modifiedAt` | String | Last modification timestamp (`en-FI` format) |

---

## API Endpoints

### 1. Create a Todo
* **HTTP Method:** `POST`
* **Path:** `/`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "title": "Buy groceries",
    "state": "todo",
    "description": "Milk, bread, and eggs",
    "dueDate": "2026-11-10"
  }
  ```
* **Success Response:** `201 Created` — `"New todo created"`

### 2. Get All Todos (with Filtering)
* **HTTP Method:** `GET`
* **Path:** `/`
* **Query Parameters (Optional):** `?state=todo|doing|done` (e.g., `/` or `/?state=doing`)
* **Success Response:** `200 OK` — Returns an array of todo objects.

### 3. Get a Specific Todo
* **HTTP Method:** `GET`
* **Path:** `/:id`
* **Success Response:** `200 OK` — Returns the requested todo object.

### 4. Update a Todo
* **HTTP Method:** `PUT`
* **Path:** `/:id`
* **Headers:** `Content-Type: application/json`
* **Request Body:** (Send fields you want to update)
  ```json
  {
    "title": "Buy groceries updated",
    "state": "doing"
  }
  ```
* **Success Response:** `200 OK` — Returns the updated todo object.

### 5. Delete a Specific Todo
* **HTTP Method:** `DELETE`
* **Path:** `/:id`
* **Success Response:** `200 OK` — `"1 todo record deleted"`

### 6. Delete All Todos
* **HTTP Method:** `DELETE`
* **Path:** `/`
* **Success Response:** `200 OK` — `"All todo records deleted"`

---

## Error Handling

The API returns standard HTTP status codes for errors:
* `400 Bad Request` — Invalid `state`, missing `id` for updates, or invalid `title` parameter.
* `404 Not Found` — Todo with the specified ID or state does not exist.
