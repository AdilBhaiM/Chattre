import { ImagePlus, SendHorizontal, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { chatStore } from "../store/ChatStore";

const InputMessage = () => {
  const sendButton = useRef();
  const { selectedUser, sendMessage } = chatStore();
  const [formData, setFormData] = useState({
    text: "",
    image: null,
  });

  useEffect(() => {
    if (!formData.text && !formData.image) {
      //   sendButton.current.disabled = false;
      sendButton.current.style.color = "gray";
      //   console.log(!formData.text && !formData.image);
    }else{
        sendButton.current.style.color = "blue";
    }
    // if(){
    //     sendButton.current.disabled = true;
    //     sendButton.current.style.color = "gray";
    // }
  }, [formData.text, formData.image, formData]);

  const validateForm = () => {
    if (!formData.text.trim() && !formData.image) return;
    return true;
  };

  const handleSubmit = async (e) => {
    // console.log("hello");
    e.preventDefault();
    const validform = validateForm();
    if (validform === true) {
      e.target.reset();
    //   console.log("Send Chat Functino to call .... ", formData);
      await sendMessage(selectedUser._id, formData);
      setFormData({
        text: "",
        image: null,
      });
    }
  };

  const convertUploadedImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64URL = reader.result;
      setFormData({
        ...formData,
        image: base64URL,
      });
    };
  };

  const onFocusEvent = (e) => {
    e.target.style.minHeight = "100px";
  };

  const outFocusEvent = (e) => {
    e.target.style.minHeight = "0px";
  };

  return (
    <div className="mx-4 mb-4 relative">
      {formData.image ? (
        <div className="absolute flex top-[-12px] items-center w-fit translate-y-[-100%]">
          <X
            color="#fff"
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setFormData({ ...formData, image: null })}
          />
          <img
            src={formData.image}
            alt=""
            className="size-42 ml-3 object-cover rounded-2xl self-center"
          />
        </div>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center py-2 px-3 gap-2">
          <label
            htmlFor="avatar_uploader"
            type="button"
            className="bg-gray-400 border self-start inline-flex border-gray-300 justify-center p-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <ImagePlus color="#fff" />
            <input
              className="w-5 hidden h-5"
              accept="image/*"
              onChange={convertUploadedImage}
              id="avatar_uploader"
              type="file"
            />
          </label>

          <textarea
            value={formData.text}
            onChange={(e) => {
              setFormData({ ...formData, text: e.target.value });
            }}
            id="chat"
            rows="1"
            onBlur={outFocusEvent}
            onFocus={onFocusEvent}
            className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>

          <button
            ref={sendButton}
            disabled={!formData.text && !formData.image}
            type="submit"
            className="inline-flex self-end justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <SendHorizontal />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputMessage;
