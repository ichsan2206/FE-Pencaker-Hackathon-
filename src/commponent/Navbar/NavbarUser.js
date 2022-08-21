import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import UserBlank from '../../assets/blank-profile.png'
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/logout.svg'
import logo from '../../assets/logo.png'

export default function NavbarUser() {
    const [state, dispatch] = useContext(UserContext)

    let navigate = useNavigate()
  
    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }
  return (
    <div>
           <Navbar variant="light" expand="lg" className='navbg'>
            <Container>
            <Navbar.Brand  style={{color: 'white', fontWeight: 'bold'}} as={Link} to="/user"><img src={logo} style={{ maxWidth: '150px' }} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav.Item style={{marginRight: '5px', color: 'white'}}>Welcome, {state.user.name}</Nav.Item>
            <Nav style={{marginRight: '5%'}}>
            <NavDropdown
                            title={<div>
                                <img className="rounded-circle"
                                    src={UserBlank}
                                    alt="User"
                                    style={{ width: '40px', marginTop: '5px'}}
                                />
                            </div>} id="nav-dropdown">
                            <NavDropdown.Item as={Link} to='/user/apply'
                            style={{backgroundColor: 'rgba(0, 22, 46, 1)', color: 'white'}}>
                             My Apply
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                             onClick={logout}
                            style={{backgroundColor: 'rgba(0, 22, 46, 1)', color: 'white'}}>
                                <img
                                    src={LogoutIcon}
                                    alt="icon"
                                    style={{ width: '20px', marginRight: '5px' }}
                                    
                                />Logout
                            </NavDropdown.Item>
                        </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}
