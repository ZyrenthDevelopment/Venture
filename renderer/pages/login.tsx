import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { NextRouter, Router, useRouter } from 'next/router';
import apiConfig from '../utilities/config/apiConfig';
import VenturePack from '../utilities/pack/venturePack';

export default function HomePage() {
    const router = useRouter();

    async function login(email: string, password: string) {
        const response = await axios.post(
            `${apiConfig.baseUrl}v${apiConfig.version}/auth/login`,
            {
                login: email,
                password,
                undelete: false,
                login_source: null,
                gift_code_sku_id: null,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    'X-Captcha-Key': document.querySelector('[name=h-captcha-response]')?.value,
                },
                validateStatus: (status) => true,
            },
        );

        if (response.status !== 200 && response.data.captcha_sitekey) {
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
        }

        return;
    }

    useEffect(() => {
        const _vp = new VenturePack(window);

        const token = window.localStorage.getItem('token');

        if (token) {
            //router.push('/app');
            return;
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
                <script src="/hcaptcha.js" async defer></script>
            </Head>
            <div id="app" className="_app App__Authentication">
                <div className="Authentication__TextLogin">
                    <span className="TextLogin__Title">Login</span>
                    <span className="TextLogin__SubTitle">Log in with your Discord account.</span>
                    <div className="TextLogin__TL_Inputs">
                        <input type="email" name="Email" id="email" placeholder="Email" className="TL_Inputs__Input" />
                        <p className="TL_Inputs__Error hidden"></p>
                        <input
                            type="password"
                            name="Password"
                            id="password"
                            placeholder="Password"
                            className="TL_Inputs__Input"
                        />
                        <p className="TL_Inputs__Error hidden"></p>
                        <button
                            className="TL_Inputs__Button"
                            onClick={() => {
                                const email = document.getElementById('email') as HTMLInputElement;
                                const password = document.getElementById('password') as HTMLInputElement;

                                login(email.value, password.value);
                            }}
                        >
                            Login
                        </button>
                    </div>
                    <div className="TextLogin__TL_Footer">
                        <span className="TL_Footer__Text">Don't have an account?</span>
                        <Link
                            href="#"
                            className="TL_Footer__Link"
                            onClick={(e) => (e.target['innerHTML'] = 'skill issue (not finished yet)')}
                        >
                            Register
                        </Link>
                    </div>
                    <div id="captcha"></div>
                </div>

                <div className="Authentication__QRLogin">
                    <img src="/images/qrcode.png" alt="QRCode" className="QRLogin__QRCode" />
                    <span className="QRLogin__Title">QRCode login</span>
                    <span className="QRLogin__SubTitle">QR Login is currently not supported.</span>
                </div>
            </div>
        </React.Fragment>
    );
}
