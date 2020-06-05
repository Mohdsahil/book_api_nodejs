import { API } from "../../backend";

//  GETTING ALL THECATEGORY
export const getcategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// REMOVE THE CATEGORY FORM THE DATABASE
export const removecategory = (userId, categoryId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// CREATE THE CATEGORY
export const createcategory = (name, userId, token) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// CREATE NEW BOOK

export const createnewbook = (book, userId, token) => {
  return fetch(`${API}/book/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: book,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// GET all books
export const getallbook = () => {
  return fetch(`${API}/books`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// GET all books
export const getabook = (bookId) => {
  return fetch(`${API}/book/${bookId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const bookpdf = (bookId) => {
  return fetch(`${API}/book/pdf/${bookId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json)
    .catch((err) => console.log(err));
};
// DELETE books

// REMOVE THE CATEGORY FORM THE DATABASE
export const removebook = (userId, bookId, token) => {
  return fetch(`${API}/book/${bookId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//  GET THE REVIEWS
// getallreviews, removereview
export const getallreviews = (userId, token) => {
  return fetch(`${API}/reviews/book/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
// DELETE REVIEW
export const removereview = (userId, token, reviewId) => {
  return fetch(`${API}/book/bookreview/${userId}/${reviewId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
