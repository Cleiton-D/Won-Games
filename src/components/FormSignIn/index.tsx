import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Email, Lock } from '@styled-icons/material-outlined';

import { FormWrapper, FormLink, FormLoading } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';

import * as S from './styles';

const FormSignIn = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const handleInput = useCallback((field: string, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: '/'
    });

    if (result?.url) {
      return push(result.url);
    }

    setLoading(false);

    console.error('email ou senha invalidos');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
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

        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" disabled={loading} fullWidth>
          {loading ? <FormLoading /> : 'Sign in now'}
        </Button>

        <FormLink>
          Don&apos;t have an account?
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
};

export default FormSignIn;
