/**
 * Plant capability content shown on every product page: the quality statement,
 * the three inspection gates, the in-process activities (moulding + the three
 * printing routes) and the machine ledger.
 *
 * NOTE — placeholder values. Machine capacities, counts and the three client
 * marks in `public/images/clients/` were supplied as placeholders for this
 * build. Replace them with the plant's actual figures and the clients' real
 * logo files before launch; nothing here is tied to a product record, so edit
 * this file only.
 */

export type InspectionStage = {
  index: string;
  title: string;
  detail: string;
  icon: "inbound" | "impression" | "finished";
};

export const qualityStatement = {
  eyebrow: "Quality",
  quote:
    "All incoming materials which is going into the stroke process will be inspected as per IS Standards",
  note:
    "Every batch is checked at three gates — before it is released to the line, during the run and before it is packed.",
};

export const inspectionStages: InspectionStage[] = [
  {
    index: "01",
    title: "Incoming inspection",
    detail:
      "Resin, masterbatch, ink and closures are checked against the supplied specification on receipt, before anything is released to the floor.",
    icon: "inbound",
  },
  {
    index: "02",
    title: "Impression inspection",
    detail:
      "Wall thickness, print registration and closure fit are checked against the approved sample on every impression and print run.",
    icon: "impression",
  },
  {
    index: "03",
    title: "Finished good inspection",
    detail:
      "Packed containers are checked for count, colour, closure and marking before dispatch, against the code on the order.",
    icon: "finished",
  },
];

export const inProcess = {
  eyebrow: "In-process activities",
  intro:
    "Moulding and printing sit on the same floor, so a container is decorated, checked and packed without leaving the plant.",
  moulding: {
    title: "Injection moulding",
    detail:
      "Body, lid and handle are moulded in the tool the format calls for, in the colours the application allows.",
  },
  printing: {
    title: "Printing",
    detail: "Three decoration routes are run in-house, each with its own tooling and inspection gate.",
    routes: [
      {
        name: "Screen Printing",
        code: "01",
        detail: "Up to six colours, applied direct to the container wall.",
        logo: "/images/clients/nordlac.svg",
        logoAlt: "Placeholder client logo — Nordlac",
      },
      {
        name: "HTL",
        code: "02",
        detail: "Heat-transfer labelling for photographic and fine-detail artwork.",
        logo: "/images/clients/agrovista.svg",
        logoAlt: "Placeholder client logo — Agrovista",
      },
      {
        name: "Inmould labeling (IML)",
        code: "03",
        detail: "Label moulded into the wall, so the print cannot lift or peel.",
        logo: "/images/clients/fernline.svg",
        logoAlt: "Placeholder client logo — Fernline",
      },
    ],
  },
};

export type MachineRow = { name: string; capacity: string; note?: string };

export const machinery = {
  eyebrow: "Machinery",
  intro:
    "Capacities below are the working envelope each route is set up for. Tooling decides the actual format a machine runs.",
  production: {
    title: "Production machineries",
    rows: [
      {
        name: "Direct machineries",
        capacity: "80 – 650 T",
        note: "Injection moulding cells for bodies, lids and handles",
      },
      { name: "Screen printing", capacity: "6 colour", note: "Semi-automatic, rotary index" },
      { name: "HTL", capacity: "4 colour", note: "Heat-transfer labelling line" },
      { name: "Inmould labeling (IML)", capacity: "3 cavity", note: "Robotic label placement" },
    ] as MachineRow[],
  },
  auxiliaries: {
    title: "Auxiliaries",
    rows: [
      { name: "Chilling plant", capacity: "2 units" },
      { name: "Hopper dryers", capacity: "8 units" },
      { name: "Mould temperature controllers", capacity: "6 units" },
      { name: "Granulators", capacity: "4 units" },
      { name: "Air compressors", capacity: "3 units" },
      { name: "Cooling tower", capacity: "1 unit" },
    ] as MachineRow[],
  },
};
