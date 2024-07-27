import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { store } from '../../utils/store';
import { Provider } from 'react-redux';
import { describe } from 'vitest';

const mockCardProps = {
  name: 'caterpie',
};

describe('Card component', () => {
  test('should have a close button', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card {...mockCardProps} />
        </BrowserRouter>
      </Provider>
    );
    const heading = await screen.findByText('caterpie');
    expect(heading).toBeInTheDocument();
  });
  // beforeEach(() => {
  //   useGetPokemonByQuery.mockClear();
  // })
  // it('should render data after api request', async () => {
  // useGetPokemonByQuery.mockReturnValueOnce({
  //     data: mockPokemon,
  //     isLoading: false,
  //     isSuccess: true,
  //     isError: false,
  //     error: null,
  //   });
  // })
});

//

// test('should have an image', () => {
//   render(
//     <Provider store={store}>
//     <BrowserRouter>
//       <Card {...mockCard} />
//       </BrowserRouter>
//       </Provider>
//   );
//   const image = screen.getByAltText('pokemon-image');
//   expect(image).toBeInTheDocument();
// });
