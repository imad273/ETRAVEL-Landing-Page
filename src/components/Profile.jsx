import React from 'react';
import { useState, useEffect } from 'react';

function Profile() {

  const [Data, setData] = useState("");
  const [EditPage, setEditPage] = useState(false);
  const [EditPassword, setEditPassword] = useState(false);

  const fetchData = async () => {
    const userId = sessionStorage.getItem("userID");
    var request = await fetch(`http://localhost:3001/getProfile?id=${userId}`, {
      method: 'GET',
    });

    var response = await request.json();
    setData(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const Profile = () => {
    return (
      <div>
        {Data === "" ?
          <div className='h-[80vh] flex justify-center items-center'>
            <i className='bx bx-loader bx-spin text-4xl' ></i>
          </div>
          :
          <div className='my-6 md:w-4/6 md:m-auto'>
            <div className='flex flex-col items-center'>
              <img src={Data.Picture === "avatar.png" ? require("../images/avatar.png") : Data.Picture} alt="ProfilePic" className='w-32 h-32 rounded-full object-cover' />
              <h3 className='py-2 text-2xl'>{Data.Name}</h3>
            </div>
            <div className='w-full bg-[#b3b3b3] h-px'></div>
            <div className='py-2'>
              <span className='text-xl'>Email</span>
              <p className='text-gray-600 text-sm'>{Data.Email}</p>
            </div>
            <div className='py-2'>
              <div>
                <span className='text-xl'>Blogs</span>
                <p className='text-gray-600 text-sm'>{Data.Blogs}</p>
              </div>
            </div>
            <div className='py-2'>
              <span className='text-xl'>Description</span>
              <p className='text-gray-600 text-sm'>{Data.Description === "" ? "No Description" : Data.Description}</p>
            </div>
            <div className='py-2 flex flex-col items-end'>
              <button onClick={() => { setEditPage(true) }} className='my-1 bg-primary px-3 py-2 text-sm rounded-lg text-white'>
                <i className='bx bxs-edit-alt pr-2'></i>
                Edit Profile
              </button>
              <button onClick={() => { setEditPassword(true) }} className='my-1 bg-primary px-3 py-2 text-sm rounded-lg text-white'>
                <i className='bx bxs-edit-alt pr-2'></i>
                Edit Password
              </button>
              <button className='my-1 bg-red-600 px-3 py-2 text-sm rounded-lg text-white' onClick={() => { logOut() }}>
                <i className='bx bx-log-out pr-2'></i>
                Logout
              </button>
            </div>
          </div>}
      </div>
    )
  }

  const EditProfile = () => {
    const [Name, setName] = useState(Data.Name);
    const [Description, setDescription] = useState(Data.Description);
    const [PreviewIMG, setPreviewIMG] = useState("");
    const [ShowErrMsg, setShowErrMsg] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [ShowSuccMsg, setShowSuccMsg] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState("");

    async function sendData() {
      if (Name === Data.Name && Description === Data.Description) {
        setShowErrMsg(true);
        setErrorMsg("No changes to save");
      } else {
        var userId = sessionStorage.getItem("userID");
        var request = await fetch(`http://localhost:3001/EditProfile?id=${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Name: Name,
            Description: Description
          })
        });

        var response = await request.json();
        if (response.status === "success") {
          setShowErrMsg(false);
          setShowSuccMsg(true);
          setSuccessMsg("Update Successfully");
        } else {
          setShowSuccMsg(false);
          setShowErrMsg(true);
          setErrorMsg("There's an error");
        }
      }
    }

    const updateImg = async (e) => {
      var file = e.target.files[0];
      let imageURL = URL.createObjectURL(file);
      setPreviewIMG(imageURL);

      let formData = new FormData();
      formData.append('image', file);

      var userId = sessionStorage.getItem("userID");
      var request = await fetch(`http://localhost:3001/EditPicture?id=${userId}`, {
        method: 'POST',
        body: formData
      });

      var response = await request.json();

      if (response.status === "success") {
        setShowErrMsg(false);
        setShowSuccMsg(true);
        setSuccessMsg("Image Update Successfully")
        //setEditPage(false);
      } else {
        setShowSuccMsg(false);
        setShowErrMsg(true);
        setErrorMsg("There's an error");
      }
    }

    return (
      <div className='my-6'>
        <button onClick={() => { setEditPage(false) }} className='flex justify-center items-center my-1 bg-primary px-3 py-2 rounded-lg text-white'>
          <i className='bx bx-left-arrow-alt text-xl pr-2'></i>
          <p>Back</p>
        </button>
        <div className='my-2 md:w-4/6 md:m-auto'>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className='flex flex-col'>
              <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Picture</label>
              {
                PreviewIMG && <img src={PreviewIMG} alt="Preview" className='rounded-full m-auto w-36 h-36 object-cover mb-3' />
              }
              <input name='image' className="rounded text-gray-700 bg-white border border-gray-300 cursor-pointer" type="file"
                onInput={(e) => updateImg(e)}
              />
            </div>
          </form>
          <div className='w-full bg-[#b3b3b3] h-px my-3'></div>
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
            </div>
            <div className='flex flex-col'>
              <label htmlFor="name">Name</label>
              <input value={Name} type="text" id='name' onInput={(e) => { setName(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
            </div>
            <div className='flex flex-col'>
              <span htmlFor='desc'>Description</span>
              <textarea defaultValue={Description} type="text" id='desc' onInput={(e) => { setDescription(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' ></textarea>
            </div>
            <div className='flex justify-end'>
              <button className='my-1 bg-primary px-3 py-2 rounded-lg text-white' onClick={() => sendData()}>Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const EditPass = () => {
    const [Pass, setPass] = useState("");
    const [NewPass, setNewPass] = useState("");
    const [ConfPass, setConfPass] = useState("");
    const [ShowErrMsg, setShowErrMsg] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [ShowSuccMsg, setShowSuccMsg] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState("");

    const sendData = async () => {
      if (Pass === "" || NewPass === "" || ConfPass === "") {
        setShowSuccMsg(false);
        setShowErrMsg(true);
        setErrorMsg("Complete the form");
      } else {
        if (NewPass !== ConfPass) {
          setShowErrMsg(true);
          setErrorMsg("Confirm Password does't match");
        } else {
          var userId = sessionStorage.getItem("userID");
          var request = await fetch(`http://localhost:3001/editPassword?id=${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Password: Pass,
              NewPssword: NewPass
            })
          });

          var response = await request.json();
          if (response.status === "Internal Error") {
            setShowSuccMsg(false);
            setShowErrMsg(true);
            setErrorMsg(response.Message);
          } else if (response.status === "success") {
            setShowErrMsg(false);
            setShowSuccMsg(true);
            setSuccessMsg("Password change successefully");
          }
        }
      }
    }

    return (
      <div className='my-6'>
        <button onClick={() => { setEditPassword(false) }} className='flex justify-center items-center my-1 bg-primary px-3 py-2 rounded-lg text-white'>
          <i className='bx bx-left-arrow-alt text-xl pr-2'></i>
          <p>Back</p>
        </button>
        <div className='my-2 md:w-4/6 md:m-auto'>
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
            </div>
            <div className='flex flex-col'>
              <label htmlFor="pass">Your Password</label>
              <input value={Pass} type="password" id='pass' onInput={(e) => { setPass(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
            </div>
            <div className='flex flex-col'>
              <span htmlFor='new'>New Password</span>
              <input value={NewPass} type="password" id='new' onInput={(e) => { setNewPass(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
            </div>
            <div className='flex flex-col'>
              <span htmlFor='conf'>Confirm</span>
              <input value={ConfPass} type="password" id='conf' onInput={(e) => { setConfPass(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
            </div>
            <div className='flex justify-end'>
              <button className='my-1 bg-primary px-3 py-2 rounded-lg text-white' onClick={() => sendData()}>Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const logOut = () => {
    sessionStorage.removeItem("userID");
    window.location = "/"
  }

  if (EditPage) { return (<EditProfile />) }

  else if (EditPassword) { return (<EditPass />) }

  else { return (<Profile />) }

}

export default Profile