import React, { useState } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Entrada = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricao: '',
    dataEntrada: '', 
    valor: '',    
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
    const formattedData = {
      descricao: formData.descricao,
      dataHora: new Date(formData.dataEntrada).toISOString(), 
      valor: parseFloat(formData.valor)
    };
    try {
      const response = await axios.post('http://localhost:8080/api/entradas', formattedData);
      console.log('Entrada salva com sucesso:', response.data);
      navigate('/relatorio');   
    } catch (error) {
      console.error('Erro ao salvar a entrada:', error);
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
                <h2 className="fw-bold mb-2 text-uppercase">Cadastrar Entrada</h2>
                <div className="mt-3">
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-2">
                    <Form.Group controlId="descricao" as={Col} className="mb-2">
                      <Form.Label>Descrição</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group controlId="dataEntrada" as={Col} className="mb-2">
                        <Form.Label>Data da Entrada</Form.Label> {}
                        <Form.Control
                          type="datetime-local"
                          name="dataEntrada"
                          value={formData.dataEntrada}
                          onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="valor" as={Col} className="mb-2">
                        <Form.Label>Valor R$</Form.Label>
                        <Form.Control
                          type="number"
                          step="0.01"
                          name="valor"
                          value={formData.valor}
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

export default Entrada;