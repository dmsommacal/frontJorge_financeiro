import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';

const Pagamento = () => {
  const [folha, setFolha] = useState(null);
  const [funcionarioId, setFuncionarioId] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleInputChange = (e) => {
    setFuncionarioId(e.target.value);
  };

  const handleGenerateFolha = async () => {
    setCarregando(true);
    try {
      const folhaResponse = await axios.post('http://localhost:8080/api/folhas-pagamentos', {
        funcionario: { id: funcionarioId }
      });

      const funcionarioResponse = await axios.get(`http://localhost:8080/api/funcionarios/${funcionarioId}`);

      console.log('Resposta da API de Folha de Pagamento:', folhaResponse.data);
      console.log('Resposta da API de Funcionário:', funcionarioResponse.data);

      setFolha({
        ...folhaResponse.data,
        funcionario: funcionarioResponse.data 
      });
    } catch (error) {
      console.error('Erro ao gerar a folha de pagamento:', error);
      setFolha(null);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="ID do Funcionário"
            value={funcionarioId}
            onChange={handleInputChange}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handleGenerateFolha} variant="primary">
            Gerar Folha
          </Button>
        </Col>
      </Row>
      {carregando ? (
        <div>Carregando...</div>
      ) : folha ? (
        <Row className="justify-content-center">
          <Col md={12}>
            <h2 className="fw-bold mb-2 text-uppercase">Demonstrativo de Pagamento</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="2">Funcionário:</th>
                  <th colSpan="2">Informações:</th>
                  <th colSpan="2">Descontos:</th>
                </tr>
                <tr>
                  <th>Nome:</th>
                  <td>{folha.funcionario?.nome}</td>
                  <th>Salário contratual:</th>
                  <td>{parseFloat(folha.funcionario?.salarioContratual).toFixed(2)}</td>
                  <th>Total de descontos:</th>
                  <td>{(parseFloat(folha.inss) + parseFloat(folha.irrf)).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>CPF:</th>
                  <td>{folha.funcionario?.cpf}</td>
                  <th>INSS:</th>
                  <td>{parseFloat(folha.inss).toFixed(2)}</td>
                  <th>Salário líquido:</th>
                  <td>{parseFloat(folha.salarioLiquido).toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Cargo:</th>
                  <td>{folha.funcionario?.cargo}</td>
                  <th>IRRF:</th>
                  <td>{parseFloat(folha.irrf).toFixed(2)}</td>
                  <th></th>
                  <td></td>
                </tr>
              </thead>
            </Table>
          </Col>
        </Row>
      ) : (
        <div>Insira o ID do funcionário e clique em "Gerar Folha" para ver os detalhes da folha de pagamento.</div>
      )}
    </Container>
  );
};

export default Pagamento;