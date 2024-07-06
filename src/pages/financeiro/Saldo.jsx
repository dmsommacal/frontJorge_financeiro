import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Container, Card } from 'react-bootstrap';

const Saldo = () => {
  const [saldo, setSaldo] = useState([]);
  const [error, setError] = useState("");
  console.log(saldo)

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contas');
        setSaldo(response.data.content[0].saldo);
      }catch (error) {
        setError("Erro ao buscar saldo" + error.message)
      }
    };

    fetchSaldo();
  }, []);

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
      <Col md={10} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
              <h3 className="fw-bold mb-2 text-uppercase">Saldo</h3>
              <h1>{error ? (
                <p>Erro: {error}</p>
              ) : ( 
                saldo !== null ? (
                  <div>
                    <h2>{saldo}</h2>
                  </div>
                ) : (
                  <p>Carregando...</p>
                )
              )}
              </h1>                                
           </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Saldo;

