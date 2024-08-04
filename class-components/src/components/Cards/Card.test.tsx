import Card from './Card';
import { render, screen } from '@testing-library/react';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { describe } from 'vitest';

const mockCardProps = {
  name: 'caterpie',
  openDetail: () => {
    console.log('test');
  },
};

describe('Card component', () => {
  test('should have a close button', async () => {
    render(
      <Provider store={store}>
        <Card {...mockCardProps} />
      </Provider>
    );
    const heading = await screen.findByText('caterpie');
    expect(heading).toBeInTheDocument();
  });
});
