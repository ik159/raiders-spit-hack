import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Tab, Tabs } from "react-bootstrap";
function NavBar() {
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
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <nav>
        <a>logo here</a>
        <div class="nav-links" id="navLinks">
          <i class="fa fa-times" onClick={hideMenu}></i>
          <ul>
            <li >
              <a href="/">Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li onClick={onOpenModal}>
              <a>Sign in</a>
              
                <Modal open={open} onClose={onCloseModal} center >
                  <h2>Welcome!</h2>
                  <TabBar />
                </Modal>
            
            </li>
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

  return (
    <div >
      <Tabs
        defaultActiveKey="register"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="register" title="Register">
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
              type="text"
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
              
            />
            <label>Confirm Password</label>
          </div>
          <button className="deadline">Sign Up!</button>
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
              type="text"
              name=""
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button className="deadline">Log In</button>
        </Tab>
      </Tabs>
    </div>
  );
}

export default NavBar;
