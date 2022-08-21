import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Modal, Alert} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import '../../Styles/Styles.css'

export default function Login({ loginShow, setLoginShow, loginHere }) {
    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post('/login', body, config);
      // Checking process
    
      if (response.data.status === 'Success') {
        // Send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.user,
        });

        // Status check
        if (response.data.user.status === 'company') {
          navigate('/company');
        } else if(response.data.user.status === 'member') {
          navigate('/user');
        } else if (response.data.user.status === 'admin') {
          navigate('/admin');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Request failed with status code 400'){
        const alertPassword = (
          <Alert variant="danger" className="py-1" style={{fontSize: '15px', textAlign: 'center'}}>
           Periksa Kembali Email atau Password Anda
          </Alert>
        );     
      setMessage(alertPassword);
       }
    }
  });

    return (
        <Modal size='md'  show={loginShow} onHide={() => setLoginShow(false)} centered>
            <Modal.Body className="bg-Modal">
            <div className="card-auth p-4">
                    <div
                    style={{ fontSize: '30px', fontWeight: '700', color: 'white', marginLeft: '150px', marginRight: '150px'}}
                    className="mb-3"
                    >
                    Login
                    </div>
                    {message && message}
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="mt-3 form">
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        className="px-3 py-2 mt-3"
                        />
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="px-3 py-2 mt-3"
                        
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn">Login</button>
                        <p className='warning'>Don't have an account? <button onClick={loginHere} className="btnHere" >Register</button></p>
                    </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}