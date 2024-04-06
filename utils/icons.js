import {
  MdOutlineNotificationsActive,
  MdOutlineNotificationImportant,
  MdCancelPresentation,
  MdOutlineWorkOff,
  MdTaskAlt
} from "react-icons/md";
import { TfiShiftLeft, TfiShiftRight } from "react-icons/tfi";
import { FaExchangeAlt, FaRegCommentDots } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineExclamationCircle, AiOutlineNotification } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

export const icons = {
  "vacation": <MdOutlineWorkOff color="white" />,
  "offer-user": <TfiShiftLeft color="white" />,
  "offer-admin": <TfiShiftRight color="white" />,
  "change": <FaExchangeAlt color="white" />,
  "cancel": <MdCancelPresentation color="white" />,
  "important": <AiOutlineExclamationCircle color="white" />,
  "update": <RxUpdate color="white" />,
  "feedback": <VscFeedback color="white" />,
  "reminder": < MdOutlineNotificationsActive color="white" />,
  "general": <AiOutlineNotification color="white" />,
  "other": <FaRegCommentDots color="white" />,
  "operation": <MdTaskAlt color="white" />,
  "delete": <RiDeleteBin6Line />
}
