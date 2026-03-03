import type { HastParseResult } from "hast-mds";
import type { JSX } from "solid-js";
import { canonicalComponents } from "~/components/canonical-components";
import type { GlobalScope } from "~/types";
import createReportTemplate from "../report";
import { Population } from "./population";

export default function createTemplate(props: {
  mds: HastParseResult<GlobalScope, {}>;
}): JSX.Element {
  return createReportTemplate(props, {
    ...canonicalComponents,
    population: Population,
  });
}
