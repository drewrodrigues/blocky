import React from 'react'
import { SidebarContainer } from './sidebarContainer'
import { SidebarSection } from './sidebarSection'
import { SidebarToggle } from './sidebarToggle'

export class Sidebar extends React.Component {
  static Section = SidebarSection
  static Container = SidebarContainer
  static Toggle = SidebarToggle
}
