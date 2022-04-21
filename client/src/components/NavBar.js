import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import logo from '../assets/spit-logo.png'
function NavBar() {
  const auth = useAuth();

  const showMenu = (e) => {
    e.preventDefault();
    console.log("hi");
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
  };
  function hideMenu(e) {
    e.preventDefault();
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
  }
  

  const onOpenModal = () => auth.setOpen(true);
  const onCloseModal = () => auth.setOpen(false);
  

  return (
    <>
      <nav>
        <a><img src={logo}/> Finder-Binder</a>
        <div class="nav-links" id="navLinks">
          <i class="fa fa-times" onClick={hideMenu}></i>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/mysubs">My Subscriptions</a>
            </li>
            <li>
              <a href="/profile">My Profile</a>
            </li>
            {auth.user ? (
              <li onClick={auth.logout}>
                <a>Logout</a>
              </li>
            ) : (
              <li onClick={onOpenModal}>
                <a>Sign in</a>

                <Modal open={auth.open} onClose={onCloseModal} center>
                  <h2>Welcome!</h2>
                  <TabBar />
                </Modal>
              </li>
            )}
          </ul>
        </div>

        <i class="fa fa-bars" onClick={showMenu}></i>
      </nav>
    </>
  );
}

function TabBar() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [rank, setrank] = useState();
  const auth = useAuth();
  const register = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const data = {
        name,
        email,
        password,
        city,
        rank,
      };
      const res = await axios.post("http://localhost:5000/user/register", data);
      if (res.data.success) {
        toast.success(res.data.msg, { id: toastId });
      }
    } catch (error) {
      toast.error(error.response.data.msg, { id: toastId });
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const res = await auth.login(email, password);
      if (res.success) {
        toast.success("Successfully Logged In!", { id: toastId });
        //console.log(res.data.category);
        //navigate(`/admin/sdd`);
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="register" title="Register">
          <div className="user-box black-text">
            <input
              type="text"
              name=""
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="user-box black-text">
            <input
              type="text"
              name=""
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box black-text">
            <input
              type="password"
              name=""
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="user-box black-text">
            <input
              type="text"
              name=""
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
            <label>City</label>
          </div>
          <div className="user-box black-text">
            <input
              type="text"
              name=""
              value={rank}
              onChange={(e) => setrank(e.target.value)}
            />
            <label>Rank</label>
          </div>
          <button className="deadline" onClick={register}>
            Sign Up!
          </button>
        </Tab>
        <Tab eventKey="login" title="Login">
          <div className="user-box black-text">
            <input
              type="text"
              name=""
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="user-box black-text">
            <input
              type="password"
              name=""
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button className="deadline" onClick={loginUser}>
            Log In
          </button>
        </Tab>
      </Tabs>
    </div>
  );
}

export default NavBar;
