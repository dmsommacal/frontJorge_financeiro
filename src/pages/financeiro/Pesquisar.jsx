import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Listagem = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [pesquisa, setPesquisa] = useState({
    nome: '',
    cpf: '',
    id: '',
  });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    setCarregando(true);
    try {
      const response = await axios.get('http://localhost:8080/api/funcionarios'); // URL da sua API
      setFuncionarios(response.data.content);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

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
      let response;
      if (pesquisa.id) {
        // Pesquisa por ID
        response = await axios.get(`http://localhost:8080/api/funcionarios/${pesquisa.id}`);
        setFuncionarios([response.data]);
      } else if (pesquisa.nome) {
        // Pesquisa por Nome
        response = await axios.get(`http://localhost:8080/api/funcionarios?filter=${pesquisa.nome}`);
        setFuncionarios(response.data.content);
      } else if (pesquisa.cpf) {
        // Pesquisa por CPF
        response = await axios.get(`http://localhost:8080/api/funcionarios?cpf=${pesquisa.cpf}`);
        setFuncionarios(response.data.content);
      } else {
        // Pesquisa sem filtro
        response = await axios.get('http://localhost:8080/api/funcionarios');
        setFuncionarios(response.data.content);
      }
    } catch (error) {
      console.error('Erro ao pesquisar os dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/funcionarios/${id}`);
      fetchFuncionarios();
    } catch (error) {
      console.error('Erro ao excluir o dado:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between mb-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por ID"
            name="id"
            value={pesquisa.id}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por Nome"
            name="nome"
            value={pesquisa.nome}
            onChange={handlePesquisaChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por CPF"
            name="cpf"
            value={pesquisa.cpf}
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
              <th>Cargo</th>
              <th>Salário Contratual</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.salarioContratual}</td>
                <td>{funcionario.email}</td>
                <td>
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => navigate(`/editar/${funcionario.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className="mr-2"
                    onClick={() => handleExcluir(funcionario.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Listagem;