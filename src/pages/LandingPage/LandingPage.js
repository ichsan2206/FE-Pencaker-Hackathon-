import React, { useState, useEffect } from 'react'
import {Container, Nav, Navbar, Row, Col, Card} from 'react-bootstrap';
import Header from '../../assets/header.png'
import Footer from '../../assets/footer.png'
import Logo from '../../assets/blank-profile.png'
import '../../Styles/Styles.css'
import Location from '../../assets/location.png'
import Salary from '../../assets/price.png'
import Login from '../../commponent/Modal/Login'
import Register from '../../commponent/Modal/Register'
import { API } from '../../config/api';
import { useQuery } from 'react-query';
import rupiahFormat from 'rupiah-format';
import logo from '../../assets/logo.png'

export default function LandingPage() {
    const [loginShow, setLoginShow] = useState(false);
    const [data, setData] = useState()
    const [registerShow, setRegisterShow] = useState(false);
    const [search, setSearch] = useState("");

    const registerHere = (e) => {
        e.preventDefault();
        setRegisterShow(false);
        setLoginShow(true);
    }

    const loginHere = (e) => {
        e.preventDefault();
        setLoginShow(false);
        setRegisterShow(true);
    }



    const handleSearch = async () =>{
        try {
            const response = await API.get(`/jobs?position=${search}`)
            setData(response.data.jobs)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        }
        


useEffect(() => {
    if (search == ""){
        const handleView = async () =>{
            try {
                const response = await API.get('/jobs')
                setData(response.data.jobs)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    handleView()
    }else{
    handleSearch()
    }
  }, [search])

  return (
    <div>

        <Navbar variant="light" expand="lg" className='navbg'>
        <Container>
            <Navbar.Brand style={{color: 'white', fontWeight: 'bold'}}><img src={logo} style={{ maxWidth: '150px' }} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className='groupnavmenu'>
                <Nav.Link style={{ color:'white'}}><button onClick={() => setLoginShow(true)}>Login</button></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        <div className='Headers'>
            <img src={Header} alt='' />
            <h1 >FIND AND BECOME A</h1> 
            <h1 style={{marginTop: '40px', color: 'rgba(255, 195, 0, 1)'}}>PROFESSIONAL</h1>
            <h1 style={{marginTop: '80px'}}> WITH PASSION</h1>
            <input className='inputSeacrh' type="text" placeholder='Find Your Dream Job' onChange={(e) => setSearch(e.target.value)} style={{borderRadius: '5px', width: '500px', height: '40px'}}></input>
        </div>

        <div className='ContainerContent'>
            <Row>
            {data?.map((item, index) => (
                <Col lg={2} md={2} sm={2} className="Content" key={index} onClick={() => setLoginShow(true)}>
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={3}>
                                <img src={item.company?.image ? item.company?.image : Logo} style={{width: '90px', height: '90px'}} alt=''/>
                                </Col>
                            <Col sm={6}>
                                <p className='card-title-text' style={{ marginTop: '5px', color: 'white', fontSize: '15px', fontWeight: 'bold' }}>{item.position}</p>
                                <p className='Company'>{item.company.name}</p>
                                <div style={{display: 'flex', marginTop: '10px'}}>
                                    <div className='location'>
                                    <img src={Location} alt='' style={{width:'10px'}}/>
                                    <p>{item.location}</p>
                                     </div>
                                <div className='salery'>
                                <img src={Salary} alt='' style={{width:'10px'}}/>
                                <p>{rupiahFormat.convert(item.salary_end)}</p>
                                </div>
                                </div>
                            </Col>
                            <Col sm={3} className='rightContent'>
                                <p style={{marginTop: '10px', color: 'rgba(138, 138, 138, 1)', fontSize: '10px'}}>{item.post_at}</p>
                                <button>Apply</button>
                            </Col>
                           
                        </Row>
                </Col>
                 ))}
            </Row>
        </div>

        <div className='Footer'>
            <div className='footerKontent'>
            <h4 className='title'>Looking for employees?</h4>
            <button onClick={() => setLoginShow(true)}>Post a Job</button>
            </div>
        </div>

        <Login loginHere={loginHere} loginShow={loginShow} setLoginShow={setLoginShow} />
        <Register registerHere={registerHere} registerShow={registerShow} setRegisterShow={setRegisterShow} />
    </div>
  )
}
