import React from 'react';
import { useState, useEffect } from 'react';

function Blog() {

  const [Data, setData] = useState([]);
  const [AddBlogPage, setAddBlogPage] = useState(false);
  const [IsLogin, setIsLogin] = useState("");

  const FindAllBlogs = async () => {
    var request = await fetch(`http://localhost:3001/getBlogs`, {
      method: 'GET'
    });

    const response = await request.json();
    setData(response);
  }

  useEffect(() => {
    FindAllBlogs();
    const userID = sessionStorage.getItem("userID");
    setIsLogin(userID);
  }, [])

  const AddBlog = () => {
    const [ShowErrMsg, setShowErrMsg] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [ShowSuccMsg, setShowSuccMsg] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState(false);
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Picture, setPicture] = useState("");
    const [PreviewIMG, setPreviewIMG] = useState("");

    const sendData = async () => {
      if (Title === "" || Description === "" || Picture === "") {
        setShowErrMsg(true);
        setErrorMsg("Complete the form");
      } else {
        let formData = new FormData();
        formData.append('image', Picture);
        formData.append('Title', Title);
        formData.append('Description', Description);
        var userId = sessionStorage.getItem("userID");
        var request = await fetch(`http://localhost:3001/addBlog?userId=${userId}`, {
          method: 'POST',
          body: formData
        });

        var response = await request.json();

        if (response.status === "success") {
          setShowErrMsg(false);
          setShowSuccMsg(true);
          setSuccessMsg("Update Successfully")
        } else {
          setShowSuccMsg(false);
          setShowErrMsg(true);
          setErrorMsg("There's an error");
        }
      }
    }

    return (
      <div>
        {IsLogin ?
          <div className='my-6'>
            <button onClick={() => { setAddBlogPage(false) }} className='flex justify-center items-center my-1 bg-primary px-3 py-2 rounded-lg text-white'>
              <i className='bx bx-left-arrow-alt text-xl pr-2'></i>
              <p>Back</p>
            </button>
            <div className='md:w-4/6 md:m-auto'>
              <h3 className='text-2xl font-semibold my-2'>Add Blog</h3>
              <form onSubmit={(e) => { e.preventDefault() }}>
                <div className='flex flex-col'>
                  {ShowErrMsg &&
                    <div className='bg-red-500 my-2 py-1 px-2 text-sm text-white rounded'>
                      {ErrorMsg}
                    </div>}
                  {ShowSuccMsg &&
                    <div className='bg-green-500 my-2 py-1 px-2 text-sm text-white rounded'>
                      {SuccessMsg}
                    </div>}
                  <div className='flex flex-col'>
                    <label htmlFor="pass">Title</label>
                    <input value={Title} type="text" id='pass' onInput={(e) => { setTitle(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
                  </div>
                  <div className='flex flex-col'>
                    <span htmlFor='new'>Description</span>
                    <textarea defaultValue={Description} type="password" id='new' onInput={(e) => { setDescription(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' ></textarea>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Picture</label>
                    {
                      PreviewIMG && <img src={PreviewIMG} alt="Preview" className='rounded m-auto w-36 h-36 object-cover mb-3' />
                    }
                    <input name='image' className="rounded text-gray-700 bg-white border border-gray-300 cursor-pointer" type="file" id="formFile"
                      onInput={(e) => {
                        let imageURL = URL.createObjectURL(e.target.files[0]);
                        var file = e.target.files[0];
                        setPreviewIMG(imageURL);
                        setPicture(file);
                      }} />
                  </div>
                  <div className='flex justify-end'>
                    <button className='my-1 bg-primary px-3 py-2 rounded-lg text-white' onClick={() => sendData()}>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          :
          <div className='my-6'>
            <p className='text-center'>
              You are not connect to any account, connect to your account then try again
            </p>
          </div>
        }
      </div>
    )
  }

  const ShowBlog = () => {
    return (
      <div className='my-6'>
        {Data.length === 0 ?
          <div className='h-[80vh] flex justify-center items-center'>
            <i className='bx bx-loader bx-spin text-4xl' ></i>
          </div>
          :
          <div>
            <div className='flex justify-end m-2'>
              <button onClick={() => { setAddBlogPage(true) }} className='my-1 bg-primary px-3 py-2 text-sm rounded-lg text-white'>Add Blog</button>
            </div>
            <div className='flex flex-wrap'>
              {Data.map((item, index) => {
                return (
                  <div className='md:w-4/12 w-full my-2' key={index}>
                    <div className='h-full relative rounded-xl overflow-hidden mx-2 '>
                      <div className='absolute h-full w-full bg-black/30 z-10'></div>
                      <div className='text-white absolute h-full w-full flex justify-center items-center z-20'>
                        <h3 className='text-xl font-bold text-center w-8/12'>{item.Title}</h3>
                      </div>
                      <img src={item.Picture} alt={`blog${index}`} className='object-cover h-full w-full' />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
    )
  }

  if (AddBlogPage) {
    return (
      <AddBlog />
    )
  } else {
    return (
      <ShowBlog />
    )
  }
}

export default Blog