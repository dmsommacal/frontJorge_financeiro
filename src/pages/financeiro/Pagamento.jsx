import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pagamento = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [pesquisa, setPesquisa] = useState({
    descritivo: '',
    referencia: '',
    proventos: '',
    descontos:'',
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
      console.error('Erro ao gerar a folha pagameto:', error);
    } finally {
      setCarregando(false);
    }
  };

  
  
  return (
      <Container className='mt-5'>
        <Row className="justify-content-center">
            <div className="border border-3 border-primary"></div>
            <Col md={10}>
            
            <h2 className="fw-bold mb-2 text-uppercase">Demonstrativo de Pagamento</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Descritivo</th>
                  <th>Referência</th>
                  <th>Proventos</th>
                  <th>Descontos</th>
                </tr>
                <tr>
                  <th>joão da silva</th>
                  <th>220</th>
                  <th>R$5000,00</th>
                  <th>inss</th>
                </tr>
              </thead>
              <tbody>
                
                {/* Linhas em branco */}
                <tr><td colSpan="4">&nbsp;</td></tr>
                <tr><td colSpan="4">&nbsp;</td></tr>
                {/* Total */}
                <tr colSpan="1">Total de desconto</tr>
                <tr colSpan="1">Total de desconto</tr>
                <tr colSpan="1">Salário Líquido</tr>
                  
                  {/*<th>{calcularTotalValor().toFixed(2)}</th>
                  <th>{calcularTotalDesconto().toFixed(2)}</th>*/}
                
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
};

export default Pagamento;