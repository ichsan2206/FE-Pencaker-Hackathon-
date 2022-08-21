import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import UserBlank from '../../assets/blank-profile.png'
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/logout.svg'
import { API } from '../../config/api';
import logo from '../../assets/logo.png'


export default function NavbarCompany() {

    const [state, dispatch] = useContext(UserContext)
    const [data, setData] = useState()

    const profile = async () =>{
        try {
            const response = await API.get('/user')
            setData(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
        }
  
        useEffect(() => {
          profile()
        }, [])

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
            <Navbar.Brand  style={{color: 'white', fontWeight: 'bold'}} as={Link} to="/company"><img src={logo} style={{ maxWidth: '150px' }} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav.Item style={{marginRight: '5px', color: 'white'}}>Welcome, {state.user.name}</Nav.Item>
            <Nav style={{marginRight: '5%'}}>
            <NavDropdown
                            title={<div>
                                <img className="rounded-circle"
                                    src={data?.image ? data?.image : UserBlank}
                                    alt="User"
                                    style={{ width: '40px', marginTop: '5px'}}
                                />
                            </div>} id="nav-dropdown">
                            <NavDropdown.Item as={Link} to='/company/profile'
                            style={{backgroundColor: 'rgba(0, 22, 46, 1)', color: 'white'}}>
                                My Company Profile
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
