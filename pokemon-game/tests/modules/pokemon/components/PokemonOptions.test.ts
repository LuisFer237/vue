import PokemonOptions from '@/modules/pokemon/pages/PokemonOptions.vue'
import { mount } from '@vue/test-utils'

const options = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
]

describe('Pokemon Options', () => {
  test('should render buttos with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: false,
        correctAnswer: 1,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(options.length)

    buttons.forEach((button, index) => {
      expect(button.text()).toBe(options[index]?.name)
    })
  })

  test('should emit selectedOption event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: false,
        correctAnswer: 1,
      },
    })

    const [b1, b2, b3] = wrapper.findAll('button')

    await b1?.trigger('click')
    await b2?.trigger('click')
    await b3?.trigger('click')

    expect(wrapper.emitted().selectedOption).toBeTruthy()
    expect(wrapper.emitted('selectedOption')).toEqual([[1], [2], [3]])
  })

  test('should disabled buttons when blockSelection prop is true', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: true,
        correctAnswer: 1,
      },
    })

    const buttons = wrapper.findAll('button')

    buttons.forEach((button) => {
      console.log(button.attributes())
      const attributes = Object.keys(button.attributes())
      expect(attributes).toContain('disabled')
    })
  })

  test('should apply correct styling to buttons based on correct/incorrect answer', () => {
    const correctAnswer = 2
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: true,
        correctAnswer,
      },
    })

    const buttons = wrapper.findAll('button')

    buttons.forEach((button, index) => {
      if (options[index].id === correctAnswer) {
        console.log(button.classes())
        expect(button.classes()).toContain('correct')
      } else {
        expect(button.classes()).toContain('incorrect')
      }
    })
  })
})
