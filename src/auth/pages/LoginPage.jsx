import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
  email: 'alex@fam.com',
  password: '555555'
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);
  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication());
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  const onEmailPasswordLogin = () => {
    dispatch(startLoginWithEmailPassword({email, password}));
  }


  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electrónico"
              type="email"
              placeholder="correo@mail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid 
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{mt: 1}}
            >
              <Grid 
                item 
                xs={12}
                >
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Button 
                disabled={isAuthenticating}
                type="submit" 
                variant="contained" 
                fullWidth
                onClick={onEmailPasswordLogin}
                >
                  Login
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button 
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
          <Typography sx={{mr:1}}>¿No tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
