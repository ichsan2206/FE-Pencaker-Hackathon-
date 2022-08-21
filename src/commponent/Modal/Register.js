
import React, { useContext, useState }  from 'react';
import { Modal, Alert } from 'react-bootstrap'
import { UserContext } from '../../context/userContext';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';


export default function Register({ registerShow, setRegisterShow, registerHere }) {
  let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      status: '',
    });


    const { name, email, password} = form;

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
          const response = await API.post('/register', body, config);
    
          // Notification
          if (response.data.status === 'Success') {
            const alert = (
              <Alert variant="success" className="py-1">
                Success
              </Alert>
            );

            console.log(response);
            setMessage(alert);
            setForm({
              name: '',
              email: '',
              password: '',
              status: '',
            });

            if (response.data.status === 'Success') {
              // Send data to useContext
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.user,
              });
            }      

            if (response.data.status === 'company') {
              navigate('/company');
            } else if (response.data.status === 'member'){
              navigate('/user');
            } else{
                navigate('/admin')
            }
            
          } else {
            const alert = (
              <Alert variant="danger" className="py-1">
                Failed
              </Alert>
            );
            setMessage(alert);
          }
        } catch (error) {
          console.log(error);
          if (error.message == 'Request failed with status code 400'){
            const alertPassword = (
              <Alert variant="danger" className="py-1">
               Periksa kembali username, email, dan password
              </Alert>
            );     
            setMessage(alertPassword);
           }
        
        }
      });


    return (
        <Modal size='md' show={registerShow} onHide={() => setRegisterShow(false)} centered>
            <Modal.Body className="bg-Modal">
            <div className="card-auth p-4">
                    <div
                    style={{ fontSize: '30px', fontWeight: '700', color: 'white', marginLeft: '150px', marginRight: '150px'}}
                    className="mb-3"
                    >
                    Register
                    </div>
                    {message && message}
                    <form  onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="mt-3 form">
                        <input
                         type="text"
                         placeholder="Name"
                         onChange={handleChange}
                         name="name"
                         value={name}
                        className="px-3 py-2 mt-3"
                        />
                        <input
                         type="email"
                         placeholder="Email"
                         onChange={handleChange}
                         name="email"
                         value={email}
                        className="px-3 py-2 mt-3"
                        />
                        <input
                         type="password" 
                         placeholder="Password"
                         onChange={handleChange}
                         name="password"
                         value={password}
                        className="px-3 py-2 mt-3"
                        
                        />
                       
                    </div>
                    <div className='CbRegister'>
                        <p>i Want</p>
                        <input onChange={handleChange} type="radio" name='status' value='member'id="cb"/> <label for="cb">Find job</label><br />
                        <input onChange={handleChange} type="radio" name='status' value='company' id="cbu"/> <label for="cbu">Hire people</label>
                        </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn">Register</button>
                        <p className='warning'>Already have an account? <button onClick={registerHere} className="btnHere" >Login</button></p>
                    </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}