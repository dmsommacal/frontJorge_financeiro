import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Relatorio = () => {
  const [entradas, setEntradas] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {    
    const fetchDados = async () => {
      setCarregando(true);
      try {
        const responseEntradas = await axios.get('http://localhost:8080/api/entradas');
        const responseSolicitacoes = await axios.get('http://localhost:8080/api/solicitacoes');
        setEntradas(responseEntradas.data && responseEntradas.data.content);
        setSolicitacoes(responseSolicitacoes.data && responseSolicitacoes.data.content);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setEntradas([]);
        setSolicitacoes([]);
      } finally {
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  const formatEntrada = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatSolicitacao = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarDataHora = (dataHoraStr) => {
    // Converter a string para um objeto Date
    const dataHora = new Date(dataHoraStr);
    // Formatar a data e hora para o formato desejado
    return dataHora.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEntradas = entradas.filter(entrada =>
    entrada.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSolicitacoes = solicitacoes.filter(solicitacao =>
    solicitacao.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="fw-bold mb-2 text-uppercase">Relatório de Entrada</h2>
          <Form.Group controlId="search">
            <Form.Label>Pesquisar por Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite uma descrição para pesquisar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Data e Hora</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="3">Carregando...</td>
                </tr>
              ) : (
                filteredEntradas.map((entrada, index) => (
                  <tr key={index}>
                    <td>{formatarDataHora(entrada.dataHora)}</td>
                    <td>{entrada.descricao}</td>
                    <td>{formatEntrada(entrada.valor)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <h2 className="fw-bold mb-2 text-uppercase">Relatório de Solicitações</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Data e Hora</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan="3">Carregando...</td>
                </tr>
              ) : (
                filteredSolicitacoes.map((solicitacao, index) => (
                  <tr key={index}>
                    <td>{formatarDataHora(solicitacao.dataHora)}</td>
                    <td>{solicitacao.descricao}</td>
                    <td>{formatSolicitacao(solicitacao.valorSolicitado)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Relatorio;