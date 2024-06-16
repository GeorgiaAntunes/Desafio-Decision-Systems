import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModalDeleteUsuario from '../Modal/index';

import userService from '../../service/userService';
import { UserProps } from '../../types/user';

const ListUsersCard: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setSelectedUserId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    const usersData = userService.getUsers();
    setUsers(usersData);
  }, []);

  const handleDelete = () => {
    if (selectedUserId !== null) {
      userService.deleteUser(selectedUserId);
      setUsers(users.filter(user => user.id !== selectedUserId));
      handleCloseModal();
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
      >
        <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'sans-serif' }}>
            Lista de Usuários
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: '0px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Data de Nascimento</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{new Date(user.dateOfBirth).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton aria-label="Editar" onClick={() => navigate(`/usuario/${user.id}`)}>
                          <EditNoteOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Excluir" onClick={() => handleOpenModal(user.id)}>
                          <DeleteRoundedIcon fontSize="large" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#84cda0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#5b8c6d',
                },
              }}
              onClick={() => navigate('/usuario/criar')}
            >
              Criar Novo Usuário
            </Button>
          </Box>
        </Paper>
      </Box>

      <ModalDeleteUsuario
        open={openModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default ListUsersCard;
