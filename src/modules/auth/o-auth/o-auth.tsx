import React from "react";
import GoogleButton from "./google-button";

type Props = {};

export default function OAuth({}: Props) {
  return (
    <div className="pb-4 pt-0 flex items-center ">
      <GoogleButton />
    </div>
  );
}
