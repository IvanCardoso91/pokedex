import { fetchPokemonCards } from '../pokemonapi';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('fetchPokemonCards', () => {
  it('fetches Pokémon cards successfully', async () => {
    const mockResponse = { data: { data: [{ id: '1', name: 'Pikachu' }] } };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const cards = await fetchPokemonCards();

    expect(cards).toHaveLength(1);
    expect(cards[0].name).toBe('Pikachu');
  });

  it('handles API errors', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(fetchPokemonCards()).rejects.toThrow('API Error');
  });
});