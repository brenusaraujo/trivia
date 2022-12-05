import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";

describe('Conjunto de teste requisito 4', () => {
test('Testa se estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-settings');
    const playButton = screen.getByTestId('btn-play');

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();    
})

test('Testa se ao clicar no botão ele redirecioana para rota configuração', () => {
    const { history } = renderWithRouterAndRedux(< App />);
   
    const button = screen.getByTestId('btn-settings');
    userEvent.click(button);
    expect(button).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/configuracao');
})

test('Testa se o botão està desabilitado è habilitado', () => {
    renderWithRouterAndRedux(< App />);
   
    const playButton = screen.getByTestId('btn-play');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');

    userEvent.type(emailInput, '');
    expect(playButton).toHaveProperty('disabled', true );

    userEvent.type(nameInput, '');
    expect(playButton).toHaveProperty('disabled', true );

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(nameInput, 'name');
    expect(playButton).toHaveProperty('disabled', false );
})

    test('Testa se ao clicar no botão ele redirecioana para rota game', async () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const playButton = screen.getByTestId('btn-play');
      const emailInput = screen.getByTestId('input-gravatar-email');
      const nameInput = screen.getByTestId('input-player-name');

      userEvent.type(emailInput, 'email@gmail.com');
      userEvent.type(nameInput, 'name');
      userEvent.click(playButton);
      await waitFor(() => expect(history.location.pathname).toBe('/'))

    })
});