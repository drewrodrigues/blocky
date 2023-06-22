import React from 'react'
import { SidebarSection } from './sidebarSection'

export function SidebarSectionDocumentation() {
  return (
    <>
      <SidebarSection title="About" grow={false}>
        <p className="text-xs leading-[1.5]">
          I time block in Google Calendar every day. But, I found it a bit
          manual, needing multiple steps to duplicate an event. I went searching
          for a chrome plugin that helps create predefined time blocks and
          couldn't find one. So, I built it. I hope you find it as useful as I
          do!
        </p>
      </SidebarSection>

      <SidebarSection title="Generated Blocks" grow={false}>
        <p className="text-xs leading-[1.5]">
          Blocks are generated from the events in your current view. To generate
          more, flip through previous weeks.
        </p>
      </SidebarSection>

      <SidebarSection title="Saved Blocks" grow={false}>
        <p className="text-xs leading-[1.5]">
          To save blocks, there must first be a generated block. Once a block is
          in the generated section, right click on it to save it. Right click on
          the saved block again to remove it.
        </p>
      </SidebarSection>

      <SidebarSection title="Create Events from Blocks" grow={false}>
        <p className="text-xs leading-[1.5]">
          Blocks can easily be created by left-clicking on either a Generated or
          Saved block and then left clicking on a Google Calendar time span on
          the day view.
        </p>
      </SidebarSection>

      <SidebarSection title="Where did my saved blocks go?" grow={false}>
        <p className="text-xs leading-[1.5]">
          Saved blocks are not stored in the cloud. They only live in your
          current browser. So, if you go to a different browser or clear your
          history (local storage), they will be deleted.
        </p>
      </SidebarSection>

      <SidebarSection title="Contact Me" grow={false}>
        <p className="text-xs leading-[1.5]">
          Feel free to shoot me a message if you're running into issues, have
          ideas of how to extend blocky, love it or just want to say hi.
          Messages are more than welcome!
        </p>
        <a className="text-xs leading-[1.5] underline">me@drewrodrigues.com</a>
      </SidebarSection>
    </>
  )
}
