import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import { mount } from '@vue/test-utils'

describe('Pokemon Picture', () => {
  test('should render the header image when showPokemon props is false', () => {
    const showPokemon = false

    const wrapper = mount(PokemonPicture, {
      props: {
        showPokemon: showPokemon,
        pokemonId: 1,
      },
    })

    const image = wrapper.find('img')

    expect(image.attributes('alt')).toBe('Silueta de un Pokémon oculto')
  })

  test('should render the image when showPokemon props is true', () => {
    const showPokemon = true

    const wrapper = mount(PokemonPicture, {
      props: {
        showPokemon: showPokemon,
        pokemonId: 1,
      },
    })

    const image = wrapper.find('img')

    expect(image.attributes()).toEqual(
      expect.objectContaining({
        alt: 'Pokémon revelado',
        class: 'fade-in h-full w-auto max-w-full object-contain',
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      }),
    )
  })
})
