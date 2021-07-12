import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/apiRoutes';
import { Btn, LoaderDonutSpinner } from 'morphine-ui';
import { useCartState } from '../../context/cart-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { setLocalCredentials } from '../../utils/localStorage';
import { loginValidationSchema } from '../../utils/formValidations';

export const Login = (props) => {
  const {
    state: { errorMessage },
    dispatch,
  } = useCartState();
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
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
    console.log('Form data', values);

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: LOGIN_ROUTE,
        data: values,
      });
      console.log(response);
      if ([400, 401, 404].includes(response.status)) {
        console.log('from bad response');
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: response.data,
        });
        // setLoginError(response.data);
      }
      if (response.status === 200) {
        console.log(response);
        const { userId, token, userEmail } = response.data;
        // save token in local storage
        setLocalCredentials(token, userId, userEmail);
        // alert(response.data.)
        navigate('/cart');
      }
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container ">
        <div
          className="flex align-items--c justify-content--c"
          style={{
            height: 'calc(100vh - 8vh)',
            display: isLoading ? 'flex' : 'none',
          }}>
          <LoaderDonutSpinner size="xxl" variant="primary" />
        </div>
        <div
          className={`${
            isLoading ? 'display--none' : 'flex'
          } flex--column gap--md align-items--c`}
          style={loginPageStyle}>
          <h2>Login Page</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={onSubmit}>
            <Form className="mt-1 w--70% flex flex--column align-items--c justify-content--c gap--sm">
              <div
                className={`text--danger p--xs ${
                  !errorMessage && 'display--none'
                } `}>
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
              <Btn
                type="submit"
                variant="primary"
                className="border-radius--sm w--100%">
                Login
              </Btn>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
