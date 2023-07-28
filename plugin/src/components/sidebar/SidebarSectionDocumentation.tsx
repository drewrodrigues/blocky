import React from 'react'
import { SidebarSection } from './sidebarSection'

export function SidebarSectionDocumentation() {
  return (
    <>
      <SidebarSection title="About" grow={false}>
        <p className="text-xs leading-[1.5] text-grey-medium">
          Time blocking in Google Calendar can be a bit manual, needing multiple
          steps to duplicate an event. I went searching for a chrome plugin that
          helps create predefined time blocks and couldn't find one. So, I built
          it. I hope you find it as useful as I do!
        </p>
      </SidebarSection>

      <SidebarSection title="Generated Blocks" grow={false}>
        <p className="text-xs leading-[1.5] text-grey-medium">
          Blocks are generated from the events in your current view. To generate
          more, flip through previous weeks or create a new event in your
          calendar. Blocky is always scanning your view for new blocks.
        </p>
      </SidebarSection>

      <SidebarSection title="Saved Blocks" grow={false}>
        <p className="text-xs leading-[1.5] text-grey-medium">
          To save blocks, there must first be a generated block. Once a block is
          in the generated section, right click on it to save it. Right click on
          the saved block again to remove it.
        </p>
      </SidebarSection>

      <SidebarSection title="Create Events from Blocks" grow={false}>
        <p className="text-xs leading-[1.5] text-grey-medium">
          Blocks can easily be created by left-clicking on either a generated or
          saved block and then left clicking on a Google Calendar time span on
          the day view.
        </p>
      </SidebarSection>

      <SidebarSection title="Where did my saved blocks go?" grow={false}>
        <p className="text-xs leading-[1.5] text-grey-medium">
          Saved blocks are not stored in the cloud. They only live in your
          current browser. So, if you go to a different browser or clear your
          history (local storage), they will be deleted.
        </p>
      </SidebarSection>

      <SidebarSection title="Contact Me" grow={false}>
        <p className="text-xs leading-[1.5] text-grey-medium">
          Feel free to shoot me a message if you're running into issues, have
          ideas of how to extend blocky, want to work on it, love it or just
          want to say hi. Messages are more than welcome!
        </p>
        <a className="text-xs leading-[1.5] underline">me@drewrodrigues.com</a>
      </SidebarSection>
    </>
  )
}
