import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./Settings.css";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";
import { UserContext } from "../../contexts/UserContext"
import { sleep } from "../../utils/sleep"

const Toggle = React.lazy(() => import("react-toggle"));

export default function Settings() {
  const PF = "http://localhost:5000/images/";
  const { user, setUser, loggedin, setLoggedin } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState(null);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [artificialProfilePic, setArtificialProfilePic] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const nice = JSON.parse(window.localStorage.getItem("user_data"))
    setUser(nice);
    setLoggedin(JSON.parse(window.localStorage.getItem("loggedin")));
    console.log(nice.password);
  }, [])

  const submitForm = async (e) => {
    e.preventDefault();
    const userId = user._id;
    const postdata = { userId, username, email, password };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      postdata.profilePic = filename;
      console.log({ data });
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      }
      catch (err) {
        console.log(err);
      }
    }
    try {
      if (artificialProfilePic) {
        postdata.profilePic = profilePic;
      }
      const res = await axios.put("http://localhost:5000/api/users/" + userId, postdata);
      window.localStorage.setItem("user_data", JSON.stringify(res.data));
      window.localStorage.setItem("loggedin", JSON.stringify(true));
      console.log(res);
      await sleep(10);
      window.location.replace("/home");
    }
    catch (err) {
      console.log(err);
    }
  }

  const deleteUser = async (e) => {
    e.preventDefault();
    setConfirming(true);
  }

  const defaultProfilePic = (e) => {
    if (e.target.checked) {
      setProfilePic("1636014539082told you.jpg")
      setArtificialProfilePic(true);
    }
    else {
      setProfilePic(user.profilePic);
      setArtificialProfilePic(false);
    }
  }

  const randomProfilePic = (e) => {
    if (e.target.checked) {
      const types = [
        "human", "identicon", "bottts", "avataaars", "jdenticon", "gridy", "micah"
      ]
      const seed = Math.floor(Math.random() * 500);
      const url = `https://avatars.dicebear.com/api/${types[Math.floor(Math.random() * types.length)]}/${seed}.svg`;
      console.log(url);
      setProfilePic(url);
      setArtificialProfilePic(true);
    }
    else {
      setProfilePic(user.profilePic)
      setArtificialProfilePic(false);
    }
  }

  const randomUsername = (e) => {
    if (e.target.checked) {
      const length = 10;
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result);
      setUsername(result);
      document.getElementById("username").value = result;
    }
    else {
      setUsername(user.username);
      document.getElementById("username").value = user.username;
    }
  }

  const anonymousBrowsing = (e) => {
    let usernameInput = document.getElementById("username");
    let fileInput = document.getElementById("fileInput");
    let fileInputLabel = document.getElementById("fileInputLabel");
    let defaultProfilePictureToggle = document.getElementById("dpp");
    let randomProfilePictureToggle = document.getElementById("rpp");
    if (e.target.checked) {
      setUsername("Anonymous");
      setProfilePic("https://avatarfiles.alphacoders.com/127/127657.jpg");
      setArtificialProfilePic(true);
      usernameInput.value = "Anonymous " + Math.floor(Math.random() * 100000);
      usernameInput.style.color = "red";
      usernameInput.disabled = true;
      fileInput.disabled = true;
      fileInputLabel.style.backgroundColor = "gray";
      defaultProfilePictureToggle.disabled = true;
      randomProfilePictureToggle.disabled = true;
    }
    else {
      setUsername(user.username);
      setProfilePic(user.profilePic);
      setArtificialProfilePic(false);
      usernameInput.value = user.username;
      usernameInput.style.color = "steelblue";
      usernameInput.disabled = false;
      fileInput.disabled = false;
      fileInputLabel.style.backgroundColor = "tomato";
      defaultProfilePictureToggle.disabled = false;
      randomProfilePictureToggle.disabled = false;
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={profilePic[0] === "h" ? profilePic : PF + profilePic}
              alt="profilePic"
              id="image"
            />
            <label htmlFor="fileInput">
              <i id="fileInputLabel" className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setProfilePic(e.target.files[0].name);
                document.getElementById("image").src = URL.createObjectURL(e.target.files[0]);
              }}
            />
          </div>
          <p className="settingsProp">
            Use Default Profile Picture
            <Toggle
              id="dpp"
              defaultChecked={profilePic === "1636014539082told you.jpg"}
              onChange={(e) => defaultProfilePic(e)}
            />
          </p>
          <p className="settingsProp">
            Random Profile Picture
            <div style={{ position: "absolute", marginTop: "-20px", marginLeft: "13.3vw" }}>
              <Toggle
                id="rpp"
                defaultChecked={profilePic.includes("https://avatars.dicebear.com/api/")}
                onChange={(e) => randomProfilePic(e)}
              />
            </div>
          </p>
          <hr />

          <label className="settingsLabels">Username</label>
          <p className="settingsProp" style={{ position: "absolute", marginTop: "280px" }}>
            Randomize Username
            <Toggle
              defaultChecked={false}
              onChange={(e) => randomUsername(e)}
            />
          </p>
          <p className="settingsProp" style={{ position: "absolute", marginTop: "320px" }}>
            <details>
              <summary>Turn Anonymous</summary>
              <b>WARNING : Will Override Username and Profile Pic.</b>
            </details>
          </p>
          <div style={{ position: "absolute", marginTop: "320px", marginLeft: "11.2vw" }}>
            <Toggle
              defaultChecked={false}
              onChange={(e) => anonymousBrowsing(e)}
            />
          </div>
          <input
            id="username"
            type="text"
            placeholder="something"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={user.username}
            style={{ marginBottom: "60px", marginTop: "40px" }}
          />
          <hr />

          <label className="settingsLabels">Email</label>
          <p className="settingsProp" style={{ position: "absolute", marginTop: "491px" }}>
            Make Publicly Available
            <Toggle
              defaultChecked={false}
            />
          </p>
          <p className="settingsProp" style={{ position: "absolute", marginTop: "531px" }}>
            Encrypt Email in Storage
            <Toggle
              defaultChecked={false}
            />
          </p>
          <input
            type="email"
            placeholder="something@gmail.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={user.email}
            style={{ marginBottom: "50px" }}
          />
          <hr />

          <label className="settingsLabels">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={user.password}
          />
          <hr />

          <label className="settingsLabels">Gender</label>
          <select className="settingsGender">
            <option value="settingsGenderItem">Male</option>
            <option value="settingsGenderItem">Female</option>
            <option value="settingsGenderItem">I'd Rather Not Say</option>
          </select>
          <hr />

          <label className="settingsLabels">Advanced</label>
          <label style={{ fontSize: "20px" }}>Hashing Method</label>
          <select className="settingsGender">
            <option value="settingsGenderItem">AES</option>
            <option value="settingsGenderItem">RC4</option>
            <option value="settingsGenderItem">Salt (20)</option>
            <option value="settingsGenderItem">RSA</option>
            <option value="settingsGenderItem">SDE</option>
            <option value="settingsGenderItem" selected>Fulminata Standard DE (default) </option>
          </select>
          <hr />
          <button className="settingsSubmitButton" type="submit" onClick={submitForm}>
            Update
          </button>
          <button className="settingsDeleteButton" type="submit" onClick={deleteUser}>
            Delete Account
          </button>
        </form>
      </div>
      {confirming && (<DeleteConfirmation />)}
    </div >
  );
}