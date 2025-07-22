import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import useAxios from "../../hooks/useAxios";
import "./LibraryStream.css";

function LibraryStream() {
  const { id } = useParams();
  const { data, loading, error } = useAxios(
    `http://127.0.0.1:8000/api/v1/products/${id}`,
    true
  );
  const navigate = useNavigate();
  const iframeUrl = data.meta_data?.find(
    (meta) => meta.key === "_ebook_stream_url"
  )?.value;

  console.log(data);
  return (
    <main className="LibraryStream">
      <button onClick={() => navigate("/")}>
        <IoCloseSharp size={32} color="white" />
      </button>
      <iframe
        src={iframeUrl}
        title="Streamable Book"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      ></iframe>
    </main>
  );
}

export default LibraryStream;
