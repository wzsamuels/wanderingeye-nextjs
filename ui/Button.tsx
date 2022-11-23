import {ComponentPropsWithoutRef, ReactNode} from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode
}

export default function Button({children, className, ...rest} : Props) {
  return (
    <button {...rest} className={`bg-primary text-light tracking-widest uppercase px-4 py-2 ${className}`}>
      {children}
    </button>
  )
}