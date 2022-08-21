import React, { useState, useEffect } from 'react'
import { UserContext } from '../../context/userContext';
import { Modal, Alert, Col, Row} from 'react-bootstrap'
import { API } from '../../config/api';
import '../../Styles/Styles.css'

export default function Apply({applyShow, setApply, id}) {
    const [data, setData] = useState()
    console.log(data);
    console.log(id);
  

    useEffect(() => { 
        detailApply(id)
    }, [data])

     const detailApply = async (id) =>{
        try {
            const response = await API.get(`/myjob/${id}`)
            setData(response.data.applyers)
        } catch (error) {
            console.log(error)
        }
        }
    
  return (
    <Modal size='md'  show={applyShow} onHide={() => setApply(false)} centered>
    <Modal.Body className="bg-Modal">
    <div className="card-auth p-4">
    <h4 style={{color: 'white', textAlign: 'center', marginBottom: '10px'}}>Applied</h4>
    {data?.map((item, index) => (
    <Row key={index} className='Company-content' style={{ marginBottom: '10px'}}>
        <Col>
            <p style={{color: 'yellow', marginRight: '5px'}}>Name: </p>
            <p style={{color: 'white', marginRight: '5px'}}>{item?.name}</p>
            <p style={{color: 'yellow', marginRight: '5px'}}>email: </p>
            <p style={{color: 'white'}}>{item?.email}</p>
        </Col>
    </Row>
        ))}
    </div>
    </Modal.Body>
</Modal>
  )
}
