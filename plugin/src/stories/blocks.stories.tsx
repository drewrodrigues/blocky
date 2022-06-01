// export default {
//   title: 'Blocks',
//   component: BlockButton,
//   argTypes: {
//     isHighlighted: {
//       control: { type: 'boolean' },
//     },
//   },
// } as ComponentMeta<typeof BlockButton>

// const BlockButtonStory = ({ data, ...args }) => (
//   <BlockButton {...args} title="" />
// )

// export const nonHighlightedBlockButton = BlockButtonStory.bind({})
// nonHighlightedBlockButton.args = {
//   title: 'Something',
// }

// // export const nonHighlightedBlockButton = () => (
// //   <BlockButton title="💻 Microsoft" backgroundColor="rgb(138, 138, 138)" />
// // )

// export const highlightedBlockButton = () => (
//   <BlockButton
//     title="💻 Microsoft"
//     backgroundColor="rgb(138, 138, 138)"
//     isHighlighted={true}
//   />
// )

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BlockButton } from '../components/blocks/BlockButton'

export default {
  title: 'Blocks',
  component: BlockButton,
  argTypes: {
    isHighlighted: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    title: {
      defaultValue: 'ℹ️ Default Title',
    },
    backgroundColor: {
      defaultValue: 'rgb(138, 138, 138)',
    },
  },
} as ComponentMeta<typeof BlockButton>

const Template: ComponentStory<typeof BlockButton> = (args) => (
  <BlockButton {...args} />
)

export const _default = Template.bind({})
_default.args = {}
