import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Container, Card } from 'react-bootstrap';

const Saldo = () => {
  const [saldo, setSaldo] = useState(null);

  useEffect(() => {
    fetchSaldo();
  }, []);

  const fetchSaldo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/entradas');
      setSaldo(response.data);
    } catch (error) {
      console.error('Erro ao buscar o saldo:', error);
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
      <Col md={10} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
              <h3 className="fw-bold mb-2 text-uppercase">Saldo</h3>
              {/*{saldo.map((saldo) => (saldo.valor))}*/}
                        
           </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Saldo;