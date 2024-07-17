import React, { useEffect, useState } from 'react';
import { LucideFile, LucideX } from 'lucide-react';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie';

function NewsEditModal({ setOpenUpdateModal, news, setIsSubmitting }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(()=>{
    setId(news._id)
    setTitle(news.title);
    setDescription(news.description);
    setImagePreview(news.image);
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = Cookies.get('accessToken');
      setOpenUpdateModal(false);

      if(image){
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/news/update-image/${id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      console.log(response.data);
      }

      if(news.title!== title || news.description !== description){
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/news/update-content/${id}`,{newTitle:title,newDescription:description},{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      console.log(response.data);
      
      }
      mutate(`${import.meta.env.VITE_BACKEND_URL}/news`);
      setIsSubmitting(false);
      
    } catch (error) {
      console.log('Error:', error);
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-2/6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-8 bg-[#c9c9c94b] rounded-lg"
        >
          <button
            type="button"
            className="absolute top-2 right-2 text-[#017f83]"
            onClick={() => setOpenUpdateModal(false)}
          >
            <LucideX className="h-6 w-6" />
          </button>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-[#017f84]">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="bg-white outline-none p-2 text-[#000000] rounded-lg shadow-md"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-[#017f84]">
              Description:
            </label>
            <textarea
              id="description"
              className="bg-white text-[#000000] p-2 rounded-lg shadow-md"
              value={description}
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image" className="text-[#017f84]">
              Image:
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="flex items-center justify-center bg-white text-[#017f84] w-full p-2 rounded-lg shadow-md cursor-pointer"
              >
                <LucideFile className="mr-2" />
                {!image ? 'Edit Image': image.name}
              </label>
              {imagePreview && (
                <div className="mt-4 mx-[30%]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#017f84] my-2 p-2 text-lg rounded-md text-white"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsEditModal;
