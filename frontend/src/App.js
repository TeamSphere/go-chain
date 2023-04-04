import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background-color: #0077cc;
  color: #fff;
  cursor: pointer;
`;

function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    axios.get('/blocks')
      .then(res => setBlocks(res.data))
      .catch(err => console.log(err));
  }, []);

  const addBlock = (data) => {
    axios.post('/addBlock', { data })
      .then(res => {
        const newBlock = {
          timestamp: Date.now(),
          data,
          hash: '',
          prevBlockHash: blocks[blocks.length - 1].hash
        };
        setBlocks([...blocks, newBlock]);
      })
      .catch(err => console.log(err));
  };

  return (
    <Router>
      <GlobalStyles />
      <PageWrapper>
        <Title>The Sphere</Title>
        <Subtitle>Blockchain Explorer</Subtitle>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Data</th>
                <th>Hash</th>
                <th>Prev. Block Hash</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block, index) => (
                <tr key={index}>
                  <td>{block.timestamp}</td>
                  <td>{block.data}</td>
                  <td>{block.hash}</td>
                  <td>{block.prevBlockHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
        <Form onSubmit={(e) => {
          e.preventDefault();
          addBlock(e.target.data.value);
          e.target.data.value = '';
        }}>
        <Label htmlFor="data">Add Block:</Label>
      <Input type="text" name="data" id="data" />
      <Button type="submit">Submit</Button>
    </Form>
  </PageWrapper>
</Router>
);
}

export default App;