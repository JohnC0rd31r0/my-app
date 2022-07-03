import { render, screen, fireEvent } from '@testing-library/react';
import { Quotes } from './Quotes';

const quote = 'teste quote';
const speaker = 'random speaker';

test('renders received quote, speaker and a button', () => {
  render(<Quotes speaker={speaker} />);

  const speakerEl = screen.getByText(`${speaker}`);
  const buttonEl = screen.getByRole('button');

  expect(speakerEl).toBeInTheDocument();
  expect(buttonEl).toBeInTheDocument();
});

test('calls a callback when a button is pressed', () => {
  const callback = jest.fn();
  render(<Quotes quote={quote} speaker={speaker} onUpdate={callback} />);

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl);

  expect(callback).toHaveBeenCalledTimes(1);
});
