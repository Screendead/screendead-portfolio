import { info } from "console";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type PlaygroundInfo = {
  title: string;
  description: string;
  link: string;
  sketch: ReactElement;
};

/**
 * `Playground` is a component that renders a p5.js sketch based on the
 * provided `link`. The `link` is expected to be a relative path to the sketch
 * folder.
 */
function Playground(props: {
  info: PlaygroundInfo | null;
}) {
  let { info } = props;
  let location = useParams();

  if (!info) {
    console.log(`No playground found for ${location.playground}`);
    return <div>Not found: {location.playground}</div>;
  }

  return (
    <section className="playground">
      <h2 className="playground-title">{info.title}</h2>
      <div className="playground-content">
        <p className="playground-description">{info.description}</p>
        {info.sketch}
      </div>
    </section>
  );
}

export default Playground;
