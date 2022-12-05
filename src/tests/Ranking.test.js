import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";


describe('testes da página de ranking', () => {
  test('testa se os componentes estão na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/ranking')
    const rankingTitle = screen.getByTestId('ranking-title');
    const homeButton = screen.getByTestId('btn-go-home');

    expect(rankingTitle).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();

    userEvent.click(homeButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'))

  })
})
