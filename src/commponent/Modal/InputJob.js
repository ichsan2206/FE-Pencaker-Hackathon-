import React, {useState} from 'react'
import { Modal,  Row, Col, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../Styles/Styles.css'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';

export default function InputJob({ inputShow, setInputShow }) {
  const [form, setForm] = useState({
    position: '',
    description: '',
    location: '',
    salary_start: '',
    salary_end: '',
    }); //Store product data

    const { position, description, location, salary_start, salary_end} = form;

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Configuration Content-type
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
    
          // Data body
          const body = JSON.stringify(form);
    
          // Insert data user to database
          const response = await API.post('/job', body, config);
          console.log(response);
          setInputShow(false)
          // Notification

        } catch (error) {
          console.log(error);  
        }
      });

  return (
            <Modal size='lg'  show={inputShow} onHide={() => setInputShow(false)} centered>
            <Modal.Body className="bg-Modal">
            <div className="card-auth p-4">
                    <div
                    style={{ fontSize: '30px', fontWeight: '700', color: 'white', marginLeft: '280px', marginRight: '250px'}}
                    className="mb-3"
                    >
                    Post a Job
                    </div>
                   
                    <Form className="mt-3 form" onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Row>
                            <Col>
                        <Form.Group>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Position</label>
                        <Form.Control onChange={handleChange} value={position} type="text" name="position" placeholder="Ex: Frontend Developer" className='input-form'></Form.Control>
                        </Form.Group>
                       
                        <Form.Group>
                        <label className='mt-3' style={{color: 'white', fontWeight: 'bold'}}>Descrption</label>
                          <Form.Control  onChange={handleChange} value={description} as="textarea" name="description" rows={3} placeholder="Desc your Job" className='input-text-area'></Form.Control>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Location</label>
                        <Form.Control onChange={handleChange} value={location} type="text" name="location" placeholder="Ex: Tangerang Selatan" className='input-form'></Form.Control>
                        </Form.Group>

                        <label className='mt-3' style={{color: 'white', fontWeight: 'bold'}}>Salary</label>
                        <Form.Group>
                        <label style={{color: 'white'}}>Min</label>
                        <Form.Control onChange={handleChange} value={salary_start}  type="text" name="salary_start" placeholder="Ex: 6500000" className='input-form'></Form.Control>
                        </Form.Group>

                        <Form.Group>
                        <label style={{color: 'white'}}>Max</label>
                        <Form.Control type="text" onChange={handleChange} value={salary_end}  name="salary_end" placeholder="Ex: 10000000" className='input-form'></Form.Control>
                        </Form.Group>
                        </Col>
                        <button className="btn-submit">Submit</button>
                        <button className="btn-cancel"  onClick={() => setInputShow(false)}>Cancel</button>
                        </Row>
                    </Form>
            
                </div>
            </Modal.Body>
        </Modal>
  )
}
