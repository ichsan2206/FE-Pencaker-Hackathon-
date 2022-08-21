import React, {useState, useEffect} from 'react'
import {Container, Nav, Navbar, Row, Col, Card} from 'react-bootstrap';
import dateFormat from 'dateformat'
import Logo from '../../assets/blank-profile.png'
import '../../Styles/Styles.css'
import Location from '../../assets/location.png'
import Salary from '../../assets/price.png'
import { API } from '../../config/api';
import { useQuery } from 'react-query';
import rupiahFormat from 'rupiah-format';
import { Link } from 'react-router-dom';

export default function MyApply() {
    const [data, setData]= useState()
    console.log(data);

    const handleView = async () =>{
    try {
        const response = await API.get('/job/applied')
        setData(response.data.jobs)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    handleView()
}, [])    
  return (
    <div>
           <div className='ContainerContent'>
            <h4 style={{color: 'rgba(255, 195, 0, 1)'}}>My Apply</h4>
            <Row>
            {data?.map((item, index) => (
                <Col lg={2} className="Content" key={index}>
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={3}>
                                <img src={item.company?.image ? item.company?.image : Logo} alt=''style={{width: '90px', height: '90px'}}/>
                                </Col>
                            <Col sm={6}  as={Link} style={{textDecoration: 'none'}}  to={`/user/job/${item.id}`}>
                                <p className='card-title-text' style={{ marginTop: '5px', color: 'white', fontSize: '15px', fontWeight: 'bold' }}>{item.position}</p>
                                <p className='Company'></p>
                                <div style={{display: 'flex', marginTop: '10px'}}>
                                    <div className='location'>
                                    <img src={Location} alt='' style={{width:'10px'}}/>
                                    <p>{item?.location}</p>
                                </div>
                                <div className='salery'>
                                <img src={Salary} alt='' style={{width:'10px'}}/>
                                <p>{rupiahFormat.convert(item?.salary_start)} - {rupiahFormat.convert(item?.salary_end)}</p>
                                </div>
                                </div>
                            </Col>
                            <Col sm={3} className='rightContent'>
                                <p style={{marginTop: '10px', color: 'rgba(138, 138, 138, 1)', fontSize: '10px'}}>{dateFormat(item?.createdAt, 'dddd, d mmmm yyyy')}</p>
                            </Col>
                        </Row>
                </Col>
                ))}
            </Row>
        </div>
    </div>
  )
}
