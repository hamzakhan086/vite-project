import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteUser } from "../Redux/Initial/Userslice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import { addFavUser, deleteFavUser } from "../Redux/Initial/Favslice";
import { useEffect, useState } from "react";

const AllpostUsers = ({ user }) => {
  const [image, Setimage] = useState("false");
  const [isReadmore, SetisReadmore] = useState(false);

  const { id, firstName, lastName, title, category, created_time, content } =
    user;
  const Favs = useSelector((state) => state.Fav.Favs);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteUser(id));
   
  };

  useEffect(() => {
    Favs.map((favuser) => {
      if (favuser.id === id) {
        Setimage("true");
      }
    });
  });

  const showContent = () => {
    if (isReadmore) {
      SetisReadmore(false);
    } else {
      SetisReadmore(true);
    }
  };

  const addtofavourite = (userss) => {
    if (image === "false") {
      Setimage("true");
      dispatch(addFavUser(userss));
    } else {
      Setimage("false");
      dispatch(deleteFavUser(userss.id));
    }
  };

  return (
    <>
      <div className="single-post-wrapper">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <Link to={`/students/${id}`}>
            <img src="/setting.png"></img>
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography variant="subtitle2" gutterBottom>
            Author- {firstName} {lastName}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <TimeAgo date={created_time} />
          </Typography>
        </Box>

        <p>Category--{category}</p>
        <p>{isReadmore ? content : `${content&&content.slice(0, 100)} ...`}</p>
        <button className="btn-hover1 color-7" onClick={showContent}>
          {isReadmore ? "...Read less" : "Read More"}
        </button>

        <div className="icons-wrapper">
          <div>
            <img
              onClick={() => addtofavourite(user)}
              src={image === "false" ? "/bookmarkgrey.png" : "/bookmarkg.png"}
            />
          </div>
          <div>
            <div>
              <Link to={`/Users/${id}/edit`}>
                <img src="/edit.png"></img>
              </Link>
            </div>
            <div>
              <Link onClick={handleDelete}>
                <img src="/delete.png"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-break"></div>
    </>
  );
};

export default AllpostUsers;
