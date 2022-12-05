import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";

describe('Testes da pagina de Feedback', ()=> {
  test('testa se os componentes estão na tela.', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/feedback')
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackTotalQuestion).toBeInTheDocument();
    expect(feedbackTotalScore).toBeInTheDocument();
  });
  test('ao clicar em play again, retorna para o ínicio.', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/feedback');
    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'))

  })
  test('ao clicar em ranking, redireciona para a página de ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/feedback');
    const rankingButton = screen.getByTestId('btn-ranking');
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    await waitFor(() => expect(history.location.pathname).toBe('/ranking'))

  })
});