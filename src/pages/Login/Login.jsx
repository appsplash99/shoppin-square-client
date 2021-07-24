import React, { useState } from 'react';
import axios from 'axios';
import { IoIosCloseCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/apiRoutes';
import { Btn, LoaderDonutSpinner } from 'morphine-ui';
import { useCartState } from '../../context/cart-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setLocalCredentials } from '../../utils/localStorage';
import { loginValidationSchema } from '../../utils/formValidations';

export const Login = (props) => {
  const navigate = useNavigate();
  const {
    state: { errorMessage, showLoader },
    dispatch,
  } = useCartState();
  const loginPageStyle = {
    margin: 'var(--space-md) auto',
    maxWidth: 'calc(4*var(--space-xxl))',
    background: '#fff',
    padding: 'var(--space-xl) var(--space-xxs)',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 10px rgba(0,0,0,0.15)',
  };

  // formik state
  const initialValues = { email: '', password: '' };

  // formik's handle submit
  const onSubmit = async (values) => {
    try {
      dispatch({ type: 'SHOW_LOADER' });
      const response = await axios({
        method: 'post',
        url: LOGIN_ROUTE,
        data: values,
      });
      if ([400, 401, 404].includes(response.status)) {
        toast.error('Bad Response Error');
      }
      if (response.status === 200) {
        const { userId, token, userEmail } = response.data;
        // save token in local storage
        setLocalCredentials(token, userId, userEmail);
        toast.success('Login Successful');
        navigate('/cart');
      }
      dispatch({ type: 'HIDE_LOADER' });
    } catch (error) {
      dispatch({ type: 'HIDE_LOADER' });
      toast.error('Unable to login');
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: error.message });
    }
  };

  return (
    <div className="container ">
      <div
        className="flex flex--column gap--md align-items--c"
        style={loginPageStyle}>
        <h2>Login Page</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}>
          <Form className="mt-1 w--70% flex flex--column align-items--c justify-content--c gap--sm">
            <div
              className={`text--danger p--sm ${
                errorMessage === '' && 'display--none'
              } `}
              style={{ position: 'relative' }}>
              <IoIosCloseCircle
                className={`${
                  errorMessage === '' && 'display--hidden'
                } text--lg text--dark cursor--pointer`}
                style={{
                  position: 'absolute',
                  right: 'var(--space-xxs)',
                  top: 'var(--space-xxs)',
                }}
                onClick={() => {
                  dispatch({ type: 'SET_ERROR_MESSAGE', payload: '' });
                }}
              />
              {errorMessage}
            </div>
            {/* EMAIL */}
            <div className="form-group">
              <Field
                type="text"
                name="email"
                className="form-control border-radius--sm p--xs"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text--danger"
              />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                className="form-control border-radius--sm p--xs"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text--danger p--xxs "
              />
            </div>

            {showLoader ? (
              <LoaderDonutSpinner size="lg" variant="primary" />
            ) : (
              <Btn
                size="sm"
                type="submit"
                variant="primary"
                className="border-radius--sm w--70%">
                Login
              </Btn>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};
