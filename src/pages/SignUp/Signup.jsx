import React from 'react';
import { Btn } from 'morphine-ui';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupValidationSchema } from '../../utils/formValidations';
import axios from 'axios';
import { REGISTER_ROUTE } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';

export const Signup = (props) => {
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
    console.log('Form data', values);

    // Signup New User
    try {
      const { name, email, password } = values;
      await axios({
        method: 'post',
        url: `${REGISTER_ROUTE}`,
        data: { name, email, password },
      });
      alert('Signin Successful - Please Login');
      navigate('/login');
      /** Navigate to User Cart after successfull signup */
      // console.log(REGISTER_ROUTE);
      // console.log({ response }, null, 2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              <Btn
                type="submit"
                size="xs"
                variant="primary"
                className="border-radius--sm  w--100% p--0 p--xxs--xs">
                signup
              </Btn>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
