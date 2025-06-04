import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
} from "react-icons/ai"
import { FiCode } from "react-icons/fi"

export const headingConfigs = [
  { level: 1, weight: "font-black" },
  { level: 2, weight: "font-extrabold" },
  { level: 3, weight: "font-semibold" },
  { level: 4, weight: "font-medium" },
  { level: 5, weight: "font-normal" },
  { level: 6, weight: "font-normal" },
] as const

export const markCommands = [
  { cmd: "toggleBold", icon: <AiOutlineBold />, check: "bold" },
  { cmd: "toggleItalic", icon: <AiOutlineItalic />, check: "italic" },
  { cmd: "toggleStrike", icon: <AiOutlineStrikethrough />, check: "strike" },
  { cmd: "toggleCode", icon: <FiCode />, check: "code" },
] as const
