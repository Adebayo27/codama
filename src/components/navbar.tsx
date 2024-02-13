import { Button, Dropdown, Navbar } from "flowbite-react";
import AppLogo from "./logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function AppNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      
        setUser(user)
       
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [navigate]);

  const handleLogout = () => {
    if (isLoggedIn) {
      auth.signOut()
    }
    navigate("/login");
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <AppLogo />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/home"
          active={location.pathname == "/home" || location.pathname == "/"}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/profile"
          active={location.pathname == "/profile"}
        >
          Profile
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        {isLoggedIn && (
          <Dropdown label="Actions">
            <Dropdown.Header>
              <span className="block text-sm">{user?.displayName}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Item as={Link} to={'/profile'}>Profile</Dropdown.Item>
            <Dropdown.Item as={Link} to={'/home'}>Home</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            
          </Dropdown>
        )}

        {
            !isLoggedIn &&<Button className="" size={"lg"} onClick={handleLogout}>
            Login
          </Button>
        }
        
      </div>
    </Navbar>
  );
}
