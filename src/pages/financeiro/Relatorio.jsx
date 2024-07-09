import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Relatorio = () => {
  
  const [funcionarios, setFuncionarios] = useState([]);
  const [pesquisa, setPesquisa] = useState({
      descritivo: '',
      valor: '',
    });
  
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      fetchFuncionarios();
  }, []);


  const fetchFuncionarios = async () => {
        setCarregando(true);
        try {
          const response = await axios.get('/api/pagamento'); // URL da sua API
          setFuncionarios(response.data);
        } catch (error) {
          console.error('Erro ao enviar os dado:', error);
        } finally {
          setCarregando(false);
        }
  };
    
  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <div className="border border-3 border-primary"></div>
        <Col md={12}>
          <h2 className="fw-bold mb-2 text-uppercase">Relatório Financeiro</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Descritivo</th>
                <th>Referência</th>
                <th>Valor</th>
              </tr>
              <tr>
                <th>Recebido de Bruno </th>
                <th>Serviço prestado</th>
                <th>R$50.000,00</th>
              </tr>
            </thead>
          </Table>
        </Col>
      </Row>
    </Container>
    );
  };

export default Relatorio;