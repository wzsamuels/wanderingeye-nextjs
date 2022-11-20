/* From https://loading.io/css/ */

import styles from "./LoadingSpinner.module.css"
import {HTMLAttributes} from "react";

export default function LoadingSpinner({className, ...rest} : HTMLAttributes<HTMLElement>) {
  return (
    <div {...rest} className={`text-primary ${styles.lds} ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}