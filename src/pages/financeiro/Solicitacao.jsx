import React, { useState } from 'react';
import axios from 'axios';
import { InputGroup, Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Solicitação = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    solicitante: '',
    tipoSolicitação: '',
    descrição: '',
    dataSolicitação: '',
    prioridade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/solicitacoes', formData);
      navigate.push('/');
    } catch (error) {
      console.error('Erro ao salvar a solicitação:', error);
    }
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">Cadastrar Solicitação</h2>
                <div className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Form.Group controlId="solicitante" as={Col} className="mb-2">
                            <Form.Label>Solicitante</Form.Label>
                            <Form.Control
                              type="text"
                              name="solicitante"
                              value={formData.solicitante}
                              onChange={handleChange}
                              required
                            />
                        </Form.Group>
                        <Form.Group controlId="tipoSolicitação" as={Col} className="mb-2">
                            <Form.Label>Tipo de Solicitação</Form.Label>
                            <Form.Control
                              type="text"
                              name="tipoSolicitação"
                              value={formData.tipoSolicitação}
                              onChange={handleChange}
                              required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Form.Group controlId="descrição" as={Col} className="mb-2">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="descrição"
                              value={formData.descrição}
                              onChange={handleChange}
                              required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Form.Group controlId="dataSolicitação" as={Col} className="mb-2">
                            <Form.Label>Data da Solicitação</Form.Label>
                            <Form.Control
                              type="date"
                              name="dataSolicitação"
                              value={formData.dataSolicitação}
                              onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="prioridade" as={Col} className="mb-2">
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Control
                              type="text"
                              name="prioridade"
                              value={formData.prioridade}
                              onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Salvar
                        </Button>
                    </div>
                </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Solicitação;