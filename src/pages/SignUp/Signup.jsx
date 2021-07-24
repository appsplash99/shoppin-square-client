import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Btn, LoaderDonutSpinner } from 'morphine-ui';
import { signUpUser } from '../../utils/serverRequests';
import { useCartState } from '../../context/cart-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupValidationSchema } from '../../utils/formValidations';
import { IoIosCloseCircle } from 'react-icons/io';

export const Signup = () => {
  const {
    dispatch,
    state: { showLoader, errorMessage },
  } = useCartState();
  const navigate = useNavigate();
  const signupPageStyle = {
    margin: 'var(--space-md) auto',
    maxWidth: 'calc(4*var(--space-xxl))',
    background: '#fff',
    padding: 'var(--space-xl) var(--space-xxs)',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 10px rgba(0,0,0,0.15)',
  };

  // formik state
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  // formik's handle submit
  const onSubmit = async (values) => {
    signUpUser({ dispatch, navigate, userData: values });
  };

  return (
    <div className="container ">
      <div
        className="login-wrapper flex flex--column gap--md align-items--c"
        style={signupPageStyle}>
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={onSubmit}>
          <Form className="mt-1 w--50% flex flex--column align-items--c justify-content--c gap--sm">
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
            {/* User Name */}
            <div className="form-group">
              <Field
                type="text"
                name="name"
                className="form-control border-radius--sm p--xs"
                placeholder="Name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text--danger"
              />
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
                Sign Up
              </Btn>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};
