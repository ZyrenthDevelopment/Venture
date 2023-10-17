import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { NextRouter, Router, useRouter } from 'next/router';
import apiConfig from '../utilities/config/apiConfig';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (token) {
      router.push('/app');
      return;
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Venture</title>
        <script src="/hcaptcha.js" async defer></script>
      </Head>
      <div className='container login'>
        <div className='plain-login'>
          <h1>Login</h1>
          <i>Log in with your Discord account.</i>
          <input type="email" name="Email" id="email" placeholder='Email' className='text-input' />
          <p className="error hidden"></p>
          <input type="password" name="Password" id="password" placeholder='Password' className='text-input' />
          <p className="error hidden"></p>
          <button className='button-primary' onClick={() => {
            const email = document.getElementById('email') as HTMLInputElement;
            const password = document.getElementById('password') as HTMLInputElement;

            login(email.value, password.value, router);
          }}>login</button>
          <div id="captcha"></div>
        </div>

        <div className='qr-login'>
          <h1>QRCode login</h1>
          QR Login is currently not supported.
        </div>
      </div>
    </React.Fragment>
  )
}

async function login(email: string, password: string, router: NextRouter) {
  const response = await axios.post(`${apiConfig.baseUrl}v${apiConfig.version}/auth/login`, {
    login: email,
    password,
    undelete: false,
    login_source: null,
    gift_code_sku_id: null
  },
  {
    headers: {
      'Content-Type': 'application/json',
      // @ts-ignore
      'X-Captcha-Key': document.querySelector('[name=h-captcha-response]')?.value
    },
    validateStatus: (status) => true
  });

  console.log(response.data);
  
  if (response.status !== 200 && response.data.captcha_sitekey) {
    // <div className="h-captcha" data-sitekey="f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34" data-theme="dark"></div>
    const element = document.createElement('div');
    element.classList.add('h-captcha');
    element.setAttribute('data-sitekey', response.data.captcha_sitekey);
    element.setAttribute('data-theme', 'dark');
    document.getElementById('captcha')?.appendChild(element);

    // @ts-ignore
    hcaptcha.render(document.getElementsByClassName('h-captcha')[0], {
      sitekey: response.data.captcha_sitekey,
      theme: 'dark',
      'error-callback': 'onError',
    });
  }

  if (response.data.token) {
    localStorage.setItem('token', response.data.token);

    return router.push('/app');
  };

  return;
}