import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Container, Card } from 'react-bootstrap';

const Saldo = () => {
  const [saldo, setSaldo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/contas');
        if (response.data && response.data.content && response.data.content[0]) {
          setSaldo(response.data.content[0].saldo);
        } else {
          setError("Formato de resposta inesperado");
        }
      } catch (error) {
        setError("Erro ao buscar saldo: " + error.message);
      }
    };

    fetchSaldo();
  }, []);

  const formatSaldo = (saldo) => {
    return saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={100} lg={100} xs={12}>
          <Card className="shadow p-4">
            <Card.Body>
              <h3 className="fw-bold mb-2 text-uppercase text-center">Saldo</h3>
              
              <div className="text-center">
                {error ? (
                  <p className="text-danger">Erro: {error}</p>
                ) : saldo !== null ? (
                  <h2 className="display-4 text-success d-inline-flex align-items-baseline">
                    {formatSaldo(saldo)}
                  </h2>
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
            </Card.Body>
          </Card>

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
