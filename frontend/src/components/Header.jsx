import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/user/userSlice";

function Header() {

  const dispatch = useDispatch(); // dispatch function to dispatch actions
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation(); // logout api call

  const logoutHandler = async() => {
    try {
      await logoutApiCall(); // logout from backend
      dispatch(logout()); // logout from frontend
      navigate("/"); // redirect to home page
    } catch (error) {
      console.log(error);
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="/redux-icon.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Redux POC
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  style={{ color: "white" }}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                <LinkContainer to="/login">
                <Nav.Link style={{ color: "white" }}>
                  <FaSignInAlt />
                  {"  "}
                  Sign In
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link style={{ color: "white" }}>
                  <FaSignOutAlt />
                  {"  "}
                  Sign Up
                </Nav.Link>
              </LinkContainer>
                </>
              ) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
