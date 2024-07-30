// src/pages/Login.js
import React from "react";
import Animation from "../../../components/helpers/Animation"; // Atualize o caminho conforme necessário
import { FaSignInAlt } from "react-icons/fa";

const Login = ({
  logoLinkUrl = "#",
  illustrationImageSrc = "/images/login-illustration.svg",
  headingText = "Entrar no Treact",
  socialButtons = [
    {
      iconImageSrc: "/images/google-icon.png",
      text: "Entrar com Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: "/images/twitter-icon.png",
      text: "Entrar com Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Entrar",
  SubmitButtonIcon = FaSignInAlt, // Usando o ícone importado
  forgotPasswordUrl = "#",
  signupUrl = "#",
  disabled = false // Adicionando a propriedade disabled
}) => (
  <div className="min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8">
    <div className="max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <a href={logoLinkUrl}>
          <img src="/images/logos/logo_epc.png" className="h-12 mx-auto" alt="Logo" />
        </a>
        <div className="mt-12 flex flex-col items-center">
          <Animation>
            <h1 className="text-2xl xl:text-3xl font-extrabold">{headingText}</h1>
          </Animation>
          <Animation>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                {socialButtons.map((socialButton, index) => (
                  <a
                    key={index}
                    href={socialButton.url}
                    className="w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hover:bg-gray-200 hover:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0"
                  >
                    <span className="bg-white p-2 rounded-full">
                      <img src={socialButton.iconImageSrc} className="w-4" alt="" />
                    </span>
                    <span className="ml-4">{socialButton.text}</span>
                  </a>
                ))}
              </div>
              <div className="my-12 border-b text-center relative">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent">
                  Ou entre com seu e-mail
                </div>
              </div>
              <form className="mx-auto max-w-xs">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0"
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <SubmitButtonIcon className="w-6 h-6 -ml-2" />
                  <span className="ml-3">{submitButtonText}</span>
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                <a href={forgotPasswordUrl} className="border-b border-gray-500 border-dotted">
                  Esqueceu a Senha?
                </a>
              </p>
              <p className="mt-8 text-sm text-gray-600 text-center">
                Não tem uma conta?{" "}
                <a href={signupUrl} className="border-b border-gray-500 border-dotted">
                  Cadastre-se
                </a>
              </p>
            </div>
          </Animation>
        </div>
      </div>
      <div className="sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center">
        <div
          style={{ backgroundImage: `url(${illustrationImageSrc})` }}
          className="m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat"
        />
      </div>
    </div>
  </div>
);

export default Login;
