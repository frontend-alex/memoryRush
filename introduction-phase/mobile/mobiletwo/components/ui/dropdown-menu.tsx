// design-system/dropdown-menu.tsx
import * as DropdownMenu from 'zeego/dropdown-menu'
import { styled } from 'dripsy'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.Trigger
export const DropdownMenuContent = DropdownMenu.Content

export const DropdownMenuItem = DropdownMenu.create(
  styled(DropdownMenu.Item)({
    height: 34,
  }),
  'Item'
)
