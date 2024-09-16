import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCommentAlt, FaTrash } from "react-icons/fa";

// A utility function to format the date

const Card = ({
  id,
  comments,
  createdAt,
  image,
  likes,
  categorie,
  text,
  user,
  lang,
  title,
  formatDate,
  handleDelete,
  isSuperAdmin,
}) => {
  const navigate = useNavigate();
  console.log(image);
  return (
    <button
      onClick={() => {
        navigate(`/blogs/${id}`);
      }}
      className="card-container h-fit flex flex-col md:flex-row p-4 border border-gray-200 rounded-lg shadow-md bg-white"
    >
      {/* Left Side: Image */}
      <div className="card-image w-full md:w-1/2 h-[300px] relative">
        {isSuperAdmin && (
          <button
            className="text-xl p-2 rounded-md duration-300 left-3 top-4  bg-red-500  absolute"
            onClick={(e) => {
              e.stopPropagation();
              // console.log("working fine");
              handleDelete(id);
            }}
          >
            <FaTrash className="" />
          </button>
        )}
        <img
          src={image}
          alt="Blog"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Right Side: Details */}
      <div className="card-details w-full md:w-1/2 pl-4 flex flex-col justify-between">
        {/* Top Content: Category, User, and Created At */}
        <div>
          <div className="card-header mb-2 mt-5 md:mt-0 flex flex-col space-y-1">
            {/* <h3 className="text-sm font-bold text-gray-700 rounded-md bg-custom-yellow w-fit px-4 py-1">
              {categorie?.title[lang]}
            </h3> */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{user?.name}</p>
              <p className="text-xs text-gray-400">{formatDate(createdAt)}</p>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-2xl font-bold text-gray-800 mb-2">{title}</h4>

          {/* Render HTML Content - limited to 3 lines */}
          <div
            className="card-text mb-2 line-clamp-5"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>

        {/* Footer: Likes and Comments */}
        <div className="card-footer flex justify-between items-center text-sm text-gray-600 mt-auto">
          {/*<span>{likes} Likes</span>*/}
          <span className="mr-4 flex justify-center items-center">
            <FaCommentAlt className="  text-xl" /> &nbsp;&nbsp;&nbsp;
            <p>{comments.length} Comments</p>
          </span>
        </div>
      </div>
    </button>
  );
};

export default Card;
