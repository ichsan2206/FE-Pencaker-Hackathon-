import React, {useState, useEffect} from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import '../../Styles/Styles.css'
import { API } from '../../config/api';
import rupiahFormat from 'rupiah-format';

export default function AdminPage() {
  const [data, setData] = useState()
  const [total, setTotal] = useState([])

  const transaction = async () =>{
    try {
        const response = await API.get('/transactions')
        setData(response.data.transactions)
        setTotal(response.data.total)
    } catch (error) {
        console.log(error)
    }
    }

  useEffect(() => {
    transaction()
  }, [data]);

  return (
    <div>
        <div className='ContainerContent mt-5'>
        <h4 style={{color: 'white'}}>Income Transaction</h4>
        <div className='d-flex mt-1'>
        <p style={{color: 'rgba(146, 146, 146, 1)', marginRight: '5px'}}>Total:</p> <h4 style={{color: 'white'}}>{rupiahFormat.convert(total)}</h4>
        </div>
        {data?.map((item, index) => (
        <Card className='mb-2 bg-content' key={index}>
        <Row className='Company-content'>
                        <Row style={{marginLeft: '5px', marginBottom: '2px'}}>
                             <Col sm={8}  style={{marginTop: '10px', marginBottom: '10px'}}>
                                <h4 style={{color: 'white'}}>{item?.position} - {item?.company?.name}</h4>
                              <p className={`tb-status-${item?.transaction.status}`}>{item?.transaction.status}</p>
                                </Col>
                            <Col sm={2}  style={{marginTop: '10px', marginBottom: '10px'}}>
                            </Col>
                            <Col sm={2}  style={{marginTop: '35px'}}>
                            <h4 style={{color: 'white'}}>{rupiahFormat.convert(item?.transaction.amount)}</h4>
                            </Col>
                        </Row>
            </Row>
        </Card>
         ))}
        </div>

    </div>
  )
}
