import React, { useState } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  DialogTitle,
  makeStyles,
  Slide,
} from "@material-ui/core";
import { isAutheticated } from "../user/helper/apicall";
import { submitreadhistory } from "./helper/userapicall";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogBox = ({ book = book }) => {
  const [open, setOpen] = useState(false);
  const [openreviewdialog, setOpenreviewdialog] = useState(false);
  var [tcount, setTcount] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [reviews, setReviews] = useState({
    rating: "",
    review: "",
  });
  const { rating, review } = reviews;
  var [timecount, setTimecount] = useState(0);
  const { user, token } = isAutheticated();

  const changeHandler = (name) => (event) => {
    if (name === "rating" && event.target.value > 5) {
      return false;
    }
    setReviews({ ...reviews, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setTcount(setInterval(readtimecount, 1000));
    console.log("tcount openHandler: ", tcount);
  };

  const handleClose = (bookId) => {
    setOpenreviewdialog(false);
    setOpen(false);
    console.log("tcount closehandler: ", tcount);
    clearInterval(tcount);
    setTimecount(0);
    submitreadhistory(user._id, timecount, rating, review, bookId, token).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("book readed");
        }
      }
    );
    setReviews({ rating: "", review: "" });
    console.log("api call");
  };
  const readtimecount = () => {
    // c = Number(timecount) + 1;
    setTimecount(timecount++);
    // console.log("c: ", c);
    console.log("time count: ", timecount);
  };

  const openReviewHandler = () => {
    setOpenreviewdialog(true);
  };

  const openReviewDialog = (bookId) => {
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openreviewdialog}
        onClose={() => handleClose(bookId)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please give your review and rating about this book, so we can
            offering you more books relateed to this
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="review"
            name="rating"
            value={rating}
            onChange={changeHandler("rating")}
            label="Rating"
            type="number"
            placeholder="eg: 5"
            min="0"
            max="5"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="review"
            name="review"
            value={review}
            placeholder="eg: very intresting book"
            onChange={changeHandler("review")}
            label="Review"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(bookId)} color="primary">
            Close
          </Button>
          <Button onClick={() => handleClose(bookId)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Read
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={() => openReviewHandler()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => openReviewHandler()}
              aria-label="close"
            >
              {/* <CloseIcon /> */}
              <h3>X</h3>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Now you are reading: {book.name}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => openReviewHandler()}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <h2>Time : {timecount}</h2>
        <iframe
          src={`${book.pdf}#toolbar=0`}
          style={{ width: "100%", height: "510px", position: "relative" }}
          frameBorder="0"
        ></iframe>
      </Dialog>
      {openReviewDialog(book._id)}
    </div>
  );
};

export default DialogBox;
