import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

interface ModalDeleteUsuarioProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
  maxWidth: '400px',
  width: '90%',
  textAlign: 'center',
  outline: 'none',
  '& h2': {
    color: '#000',
    marginBottom: '15px',
  },
  '& p': {
    color: '#000',
    marginBottom: '20px',
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
});

const DeleteButton = styled(Button)({
  backgroundColor: '#ee2a2a',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c01818',
  },
});

const CancelButton = styled(Button)({
  backgroundColor: '#84cda0',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5b8c6d',
  },
});

const ModalDeleteUsuario: React.FC<ModalDeleteUsuarioProps> = ({ open, handleClose, handleDelete }) => {
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <h2 id="modal-title">Confirmação de Exclusão</h2>
        <p id="modal-description">Tem certeza que deseja excluir este usuário?</p>
        <ButtonContainer>
          <CancelButton onClick={handleClose} variant="contained">
            Cancelar
          </CancelButton>
          <DeleteButton onClick={handleDelete} variant="contained">
            Confirmar
          </DeleteButton>
        </ButtonContainer>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalDeleteUsuario;
