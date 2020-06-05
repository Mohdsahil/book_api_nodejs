import { API } from "../../backend";

export const submitreadhistory = (
  userId,
  readtime,
  rating,
  review,
  bookId,
  token
) => {
  return fetch(`${API}/book/readed/${userId}/${bookId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      timecount: readtime,
      rating: rating,
      review: review,
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
