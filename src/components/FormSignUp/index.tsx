import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { AccountCircle, Email, Lock } from '@styled-icons/material-outlined';

import { FormWrapper, FormLink } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import { MUTATION_REGISTER } from 'graphql/mutations/register';

const FormSignUp = () => {
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  });

  const [createUser] = useMutation(MUTATION_REGISTER);

  const handleInput = useCallback((field: string, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    });
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          onInputChange={(value) => handleInput('username', value)}
          name="username"
          placeholder="Username"
          type="text"
          icon={AccountCircle}
        />
        <TextField
          onInputChange={(value) => handleInput('email', value)}
          name="email"
          placeholder="Email"
          type="email"
          icon={Email}
        />
        <TextField
          onInputChange={(value) => handleInput('password', value)}
          name="password"
          placeholder="Password"
          type="password"
          icon={Lock}
        />

        <TextField
          onInputChange={(value) => handleInput('confirm-password', value)}
          name="confirm-password"
          placeholder="Confirm password"
          type="password"
          icon={Lock}
        />

        <Button type="submit" size="large" fullWidth>
          Sign up now
        </Button>

        <FormLink>
          Already have an account?
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
};

export default FormSignUp;
