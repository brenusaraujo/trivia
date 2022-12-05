import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";

describe('Testes do game',  () => {
  test('testa se os itens estão na tela' +
  'e se o timer volta o countdown no 30', async () => {

   renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(nameInput, 'name');
    userEvent.click(playButton);

    await waitForElementToBeRemoved(nameInput);

    const loading = screen.getByTestId('loading');
    
    await waitForElementToBeRemoved(loading);

    const correct_answer = screen.getByTestId('correct-answer');
    const questionCategory = screen.getByTestId('question-category');
    const questionText = screen.getByTestId('question-text');
    const timer = screen.getByTestId('timer');
    expect(correct_answer).toBeInTheDocument();
    expect(questionCategory).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(timer).toBeInTheDocument();


    userEvent.click(correct_answer);
    const next = screen.getByTestId('btn-next');
    expect(next).toBeInTheDocument();
    expect(correct_answer).toHaveProperty('className', 'correct');
    userEvent.click(next);
    expect(timer.innerHTML).toBe('30');


    
});
test('', async ()=>{
    jest.useFakeTimers();

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(nameInput, 'name');
    userEvent.click(playButton);

    await waitForElementToBeRemoved(nameInput);

    const loading = screen.getByTestId('loading');
    
    await waitForElementToBeRemoved(loading);
    const correct_answer = screen.getByTestId('correct-answer');

    await waitFor(()=>{
      jest.advanceTimersByTime(31000);
      expect(correct_answer).toBeDisabled();
    })


})
});