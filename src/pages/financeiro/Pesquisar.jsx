import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Listagem = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [pesquisa, setPesquisa] = useState({
    nome: '',
  });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handlePesquisaChange = (e) => {
    const { name, value } = e.target;
    setPesquisa({
      ...pesquisa,
      [name]: value,
    });
  };

  const handlePesquisar = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('http://localhost:8080/api/funcionarios', {
        params: { nome: pesquisa.nome },
      });
      setFuncionarios(response.data.content || []);
    } catch (error) {
      console.error('Erro ao pesquisar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por Nome"
            name="nome"
            value={pesquisa.nome}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={2}>
          <Button onClick={handlePesquisar} variant="primary">
            Pesquisar
          </Button>
        </Col>
        <Col md={1}>
          <Button variant="success" onClick={() => navigate('/cadastro')}>
            Novo
          </Button>
        </Col>
      </Row>
      {carregando ? (
        <div>Carregando...</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Listagem;