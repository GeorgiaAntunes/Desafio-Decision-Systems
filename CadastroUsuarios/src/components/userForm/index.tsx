import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { validate } from '../../validation/userSchema';
import {
  TextField,
  Button,
  Container,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import userService from '../../service/userService';
import { UserProps } from '../../types/user';
import  ModalDeleteUsuario from '../Modal/index'

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        try {
          const userData = await userService.getUserById(parseInt(id, 10));
          setUser(userData || null);
        } catch (error) {
          console.error('Failed to fetch user', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    };

      fetchUser();

  }, [id]);
  

  const onSubmit = async (values: UserProps) => {
    try {
      if (id) {
        await userService.updateUser(parseInt(id, 10), values);
      } else {
        await userService.createUser(values);
      }
      setOpenSnackbar(true);
      navigate('/usuarios'); 
    } catch (error) {
      console.error('Failed to submit user data', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        handleCloseModal(); 
        await userService.deleteUser(parseInt(id, 10));
        navigate('/usuarios');
      }
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormComplete = (values: UserProps) => {
    return values.name && values.password && values.dateOfBirth && values.motherName;
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} style={{ padding: '20px', width: '100%', marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            {id ? 'Editar Usuário' : 'Criar Usuário'}
          </Typography>
          {loading ? (
            <Typography variant="body1" align="center">
              Carregando...
            </Typography>
          ) : (
            <Form
              onSubmit={onSubmit}
              initialValues={user}
              validate={validate}
              render={({ handleSubmit, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="name">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Nome"
                        fullWidth
                        margin="normal"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error ? meta.error : ''}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        type={showPassword ? 'text' : 'password'}
                        label="Senha"
                        fullWidth
                        margin="normal"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error ? meta.error : ''}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Field>
                  <Field name="dateOfBirth">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        type="date"
                        label="Data de Nascimento"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        margin="normal"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error ? meta.error : ''}
                      />
                    )}
                  </Field>
                  <Field name="motherName">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        label="Nome da Mãe"
                        fullWidth
                        margin="normal"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error ? meta.error : ''}
                      />
                    )}
                  </Field>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Box display="flex">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#ee2a2a',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#c01818',
                          },
                          marginRight: '8px',
                        }}
                        onClick={handleOpenModal}
                        disabled={!id}
                      >
                         <DeleteRoundedIcon fontSize="small"/>
                      </Button>
                      <ModalDeleteUsuario
                        open={openModal}
                        handleClose={handleCloseModal}
                        handleDelete={handleDelete}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#84cda0',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#5b8c6d',
                          },
                          marginRight: '8px',
                        }}
                        onClick={() => navigate('/usuarios')}
                      >
                        Voltar
                      </Button>
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#84cda0',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#5b8c6d',
                        },
                      }}
                      disabled={submitting || !isFormComplete(values)}
                    >
                      {id ? 'Salvar' : 'Cadastrar'}
                    </Button>
                  </Box>
                </form>
              )}
            />
          )}
        </Paper>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Usuário {id ? 'editado' : 'criado'} com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserForm;
