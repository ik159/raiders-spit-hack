import React from 'react';


function NavBar() {


    const showMenu = (e) => {
        e.preventDefault();
        console.log("hi")
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "0";
    }
    function hideMenu(e) {
        e.preventDefault();
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "-200px";
    }
    return <>
        <nav>
            <a>
                logo here
            </a>
            <div class="nav-links" id="navLinks">
                <i class="fa fa-times" onClick={hideMenu}></i>
                <ul>
                    <li>
                        <a>Home</a>
                    </li>
                    <li>
                        <a>About</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                    <li>
                        <a>Sign in</a>
                    </li>
                </ul>
            </div>

            <i class="fa fa-bars" onClick={showMenu}></i>
        </nav>
    </>;
}

export default NavBar;
