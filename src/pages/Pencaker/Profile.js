import React, {useState, useEffect, useContext} from 'react'
import { Row, Col, Form} from 'react-bootstrap';
import '../../Styles/Styles.css'
import { UserContext } from '../../context/userContext';
import { useMutation } from 'react-query';
import Logo from '../../assets/blank-profile.png'
import { API } from '../../config/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [show, setShow] = useState(false)
    const [state, dispatch] = useContext(UserContext);
    const [data, setData] = useState()
    let navigate = useNavigate();
    console.log(data);

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
      }, [data])

      const [form, setForm] = useState({
        image: '',
        name: '',
    }); //Store profile data

    const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]:
              e.target.type === 'file' ? e.target.files : e.target.value,
      });
    }

    const handleSubmit = useMutation(async (e) => {
      try {
          e.preventDefault();

          // Configuration
          const config = {
              headers: {
                  'Content-type': 'multipart/form-data',
              },
          };

          // Store data with FormData as object
          const formData = new FormData();
          if (form.image) {
              formData.set('image', form?.image[0], form?.image[0]?.name);
          }
          formData.set('name', form.name);

          // Insert profile data
          const response = await API.put('/user', formData, config);

          console.log(response.data);
          navigate('/company/profile')
      } catch (error) {
          console.log(error);
      }
  });

  return (
    <div className='ContainerContent mt-5'>
        <Row>
            <Col sm={4}>
            <h4 style={{color: 'white', marginBottom: '10px'}}>Company Profile</h4>
                <div className='container-profil-pitc'>
                <img src={data?.image ? data?.image : Logo} className="profile-pict" alt="..." />
                </div>
            </Col>
            <Col sm={3}>
            <div className="col-lg-4 col-md-6 col-sm-12 pt-5 mb-3">
                <p className="card-title-text">Name</p>
                <p className="profile-card-text m-0">{state?.user?.name}</p>
                <p className="card-title-text mt-4">Email</p>
                <p className="profile-card-text m-0">{state?.user?.email}</p>
                <button className='btnEditProfile' onClick={() => setShow(true)}>Edit</button>
            </div>
            </Col>
            <Col sm={5}>
            <Form className="mt-3 form" onSubmit={(e) => handleSubmit.mutate(e)}> 
             <input
                        type="file"
                        id="upload"
                        name="image"
                        hidden
                        onChange={handleChange}
                />
             { show &&  <label for="upload" className="label-file-add-product">
                Upload File
              </label>}

            { show && <Form.Group>
                <label style={{color: 'white', fontWeight: 'bold'}}>Name</label>
                <Form.Control type="text" onChange={handleChange} value={form?.name} name="name" placeholder="input New Name" className='input-form'></Form.Control>
            </Form.Group>}
            { show && <button style={{backgroundColor: 'yellow', borderRadius: '5px', marginTop: '10px'}} type='submit'>Update</button>}
            </Form>
            </Col>
        </Row>
    </div>
  )
}
