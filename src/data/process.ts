import { clientLogos, inProcess, type ClientLogo } from "./manufacturing";

/**
 * /process — stage order and imagery for the in-process activities section.
 *
 * Copy is lifted verbatim from `manufacturing.ts`; this file only adds the
 * photography and the moulding bullets that used to live inside the old
 * ProcessSection component.
 */

export type ProcessStage = {
  id: string;
  code: string;
  name: string;
  detail: string;
  kind: string;
  image: string;
  imageAlt: string;
  logos: ClientLogo[];
  bullets?: string[];
};

export const mouldingBullets = [
  "Body, lid and handle matched tooling",
  "Zero external transit defect risk",
  "Controlled wall thickness tolerances",
  "Food & industrial-grade resins",
];

export const capacityEnvelope = "80 – 650 Tonne precision clamp systems";

export const processStages: ProcessStage[] = [
  {
    id: "moulding",
    code: "01",
    name: inProcess.moulding.title,
    detail: inProcess.moulding.detail,
    kind: "In-house moulding cell",
    image: "/images/hero/hero-03.jpg",
    imageAlt:
      "Representative photograph — injection moulding machine with the mould closed under heat",
    logos: [],
    bullets: mouldingBullets,
  },
  ...inProcess.printing.routes.map((route) => ({
    id: route.id,
    code: route.code,
    name: route.name,
    detail: route.detail,
    kind: "Printing route",
    image:
      route.id === "screenPrinting"
        ? "/images/facility/labelling.jpg"
        : route.id === "htl"
          ? "/images/detail/stacked-pails.jpg"
          : "/images/facility/machinery-01.jpg",
    imageAlt:
      route.id === "screenPrinting"
        ? "Representative photograph — containers moving through an in-house printing line"
        : route.id === "htl"
          ? "Representative photograph — decorated containers stacked after printing"
          : "Representative photograph — moulding cell with robotic handling",
    logos: route.logos,
  })),
];

export { clientLogos };
