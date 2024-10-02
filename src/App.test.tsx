// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders welcome message and button, and calls onAuthenticate when button is clicked', () => {
  // Создаем мок-функцию для onAuthenticate
  const mockOnAuthenticate = jest.fn();

  // Рендерим компонент с мок-функцией
  render(<App onAuthenticate={mockOnAuthenticate} />);

  // Проверяем наличие заголовка
  const headingElement = screen.getByText(/welcome to the app/i);
  expect(headingElement).toBeInTheDocument();

  // Проверяем наличие кнопки
  const buttonElement = screen.getByRole('button', { name: /authenticate/i });
  expect(buttonElement).toBeInTheDocument();

  // Симулируем клик по кнопке
  fireEvent.click(buttonElement);

  // Проверяем, что мок-функция была вызвана
  expect(mockOnAuthenticate).toHaveBeenCalledTimes(1);
});