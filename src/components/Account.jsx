import React from 'react';
import { useState } from 'react';
import GoogleLogin from 'react-google-login';

function Account({ status, isOpen }) {
  const [isSingupPage, setIsSingupPage] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ShowErrMsg, setShowErrMsg] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  // * SignIn Functions
  const onGoogleSingUp = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    let AccountID = profile.getId();
    let AccountName = profile.getName();
    let AccountEmail = profile.getEmail();

    var request = await fetch("http://localhost:3001/SingUpWithGoogle", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        SignType: 'google',
        Name: AccountName,
        Email: AccountEmail,
        GoogleID: AccountID,
      })
    })

    var response = await request.json();

    if (response.status === 'Internal Error') {
      setShowErrMsg(true);
      setErrorMsg(response.Message);
    } else if (response.status === 'success') {
      sessionStorage.setItem("userID", response.userID);
      window.location.reload(false);
    }
  }

  const onSingUp = async () => {
    if (Name === "" || Email === "" || Password === "") {
      setShowErrMsg(true);
      setErrorMsg("Please Complete the form");
    } else {
      var request = await fetch("http://localhost:3001/SingUp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: Name,
          Email: Email,
          Password: Password
        })
      })

      var response = await request.json();

      if (response.status === 'Fail') {
        setShowErrMsg(true);
        setErrorMsg(response.Message);
      } else if (response.status === 'success') {
        sessionStorage.setItem("userID", response.userID);
        window.location.reload(false);
      }
    }
  }

  // * LogIn Functions
  const onGoogleLogIn = async (googleUser) => {
    var profile = googleUser.getBasicProfile();
    var token = googleUser.getAuthResponse().id_token;
    let AccountID = profile.getId();
    let AccountName = profile.getName();
    let AccountEmail = profile.getEmail();

    var request = await fetch("http://localhost:3001/LoginWithGoogle", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        LogType: 'google',
        Name: AccountName,
        Email: AccountEmail,
        Token: token,
        GoogleID: AccountID,
      })
    })

    var response = await request.json();

    if (response.status === 'Internal Error') {
      setShowErrMsg(true);
      setErrorMsg(response.Message);
    } else if (response.status === 'success') {
      sessionStorage.setItem("userID", response.userID);
      window.location.reload(false);
    }
  }

  const onLogIn = async () => {
    if (Email === "" || Password === "") {
      setShowErrMsg(true);
      setErrorMsg("Please Complete the form");
    } else {
      var request = await fetch("http://localhost:3001/LogIn", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          LogType: 'normal',
          Email: Email,
          Password: Password
        })
      })

      var response = await request.json();

      if (response.status === 'Fail') {
        setShowErrMsg(true);
        setErrorMsg(response.Message);
      } else if (response.status === 'Success') {
        sessionStorage.setItem("userID", response.userID);
        document.location.reload();
      }
    }
  }

  const onGoogleError = (Error) => {
    var error = Error.getBasicProfile();
    console.log(error);
  }

  return (
    <div>
      {status &&
        <div className='fixed left-0 top-0 bg-white/50 backdrop-blur-md w-full h-screen flex justify-center items-center z-50'>
          <div className='bg-white h-5/6 md:w-3/6 w-5/6 lg:w-2/6 px-4 rounded-xl'>
            <div className='flex justify-end py-2'>
              <i className='bx bx-exit cursor-pointer text-xl' onClick={() => { isOpen(false) }}></i>
            </div>

            {isSingupPage ?
              <>
                <div className='flex items-center'>
                  <i className='bx bxs-book-add px-2 py-1 rounded-full bg-primaryBg1 text-primary text-xl'></i>
                  <h3 className='px-2 font-semibold text-2xl'>Signup</h3>
                </div>
                <div className='mt-4 mb-2'>
                  <GoogleLogin
                    clientId='979036408383-pirlj9fbitkvki3309mc8fcbnq7bvjfr.apps.googleusercontent.com'
                    render={renderProps => (
                      <button className='w-full bg-primary py-1.5 text-white rounded' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className='bx bxl-google relative top-px px-2' ></i>
                        Signup with google
                      </button>
                    )}
                    onSuccess={onGoogleSingUp}
                    onFailure={onGoogleError}
                  ></GoogleLogin>
                  <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                </div>
                <div className='w-full bg-[#b3b3b3] h-px'></div>
                {ShowErrMsg &&
                  <div className='bg-red-500 my-2 py-1 px-2 text-sm text-white rounded'>
                    {ErrorMsg}
                  </div>}
                <form onSubmit={(e) => { e.preventDefault() }} className='mt-4'>
                  <label htmlFor="name">Name</label>
                  <input value={Name} type="text" id='name' onInput={(e) => { setName(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
                  <label htmlFor="email">Email</label>
                  <input value={Email} type="text" id='email' onInput={(e) => { setEmail(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
                  <label htmlFor="pass">Password</label>
                  <input value={Password} type="password" id='pass' onInput={(e) => { setPassword(e.target.value) }} className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
                  <button className='w-full bg-primary py-1.5 text-white rounded my-2' onClick={() => { onSingUp() }}>Signup</button>
                </form>
                <div className='w-full bg-[#b3b3b3] h-px'></div>
                <div className='py-2 flex items-center justify-center flex-col'>
                  <p className='text-sm text-secondText'>Already have an Account?</p>
                  <a onClick={() => (setIsSingupPage(false))} className='text-primary font-semibold cursor-pointer'>Login</a>
                </div>
              </>
              :
              <>
                <div>
                  <div className='flex items-center'>
                    <i className='bx bxs-user-circle px-2 py-1 rounded-full bg-primaryBg1 text-primary text-xl'></i>
                    <h3 className='px-2 font-semibold text-2xl'>Login</h3>
                  </div>
                  <div className='mt-4 mb-2'>
                    <GoogleLogin
                      clientId='979036408383-pirlj9fbitkvki3309mc8fcbnq7bvjfr.apps.googleusercontent.com'
                      render={renderProps => (
                        <button className='w-full bg-primary py-1.5 text-white rounded' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                          <i className='bx bxl-google relative top-px px-2' ></i>
                          Login with google
                        </button>
                      )}
                      onSuccess={onGoogleLogIn}
                      onFailure={onGoogleError}
                    ></GoogleLogin>
                  </div>
                </div>
                <div className='w-full bg-[#b3b3b3] h-px'></div>
                {ShowErrMsg &&
                  <div className='bg-red-500 my-2 py-1 px-2 text-sm text-white rounded'>
                    {ErrorMsg}
                  </div>}
                <form onSubmit={(e) => { e.preventDefault() }} className='mt-4'>
                  <label htmlFor="email">Email</label>
                  <input value={Email} type="text" onInput={(e) => { setEmail(e.target.value) }} id='email' className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
                  <label htmlFor="pass">Password</label>
                  <input value={Password} type="password" onInput={(e) => { setPassword(e.target.value) }} id='pass' className='w-full rounded my-2 border py-1 px-2 border-[#b3b3b3]' autoComplete='OFF' />
                  <button className='w-full bg-primary py-1.5 text-white rounded my-2' onClick={() => { onLogIn() }}>Login</button>
                </form>
                <div className='w-full bg-[#b3b3b3] h-px'></div>
                <div className='py-2 flex items-center justify-center flex-col'>
                  <p className='text-sm text-secondText'>Create an Account?</p>
                  <a onClick={() => (setIsSingupPage(true))} className='text-primary font-semibold cursor-pointer'>Signup</a>
                </div>
              </>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Account;