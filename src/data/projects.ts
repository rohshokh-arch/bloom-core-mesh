export interface ProjectMedia {
  type: "image" | "video" | "youtube";
  url: string;
  caption?: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  role: string[];
  thumbnail: string;
  media: ProjectMedia[];
  year: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "skeletal-frameworks",
    code: "ARCH-01",
    name: "Skeletal Frameworks",
    description:
      "A parametric pavilion structure generated using voronoi noise mapping applied to structural steel constraints. The system analyzes site conditions and programmatic requirements to produce a continuous structural topology that self-optimizes for material efficiency and visual permeability.",
    role: [
      "Grasshopper parametric modelling and script development",
      "Structural topology optimization via Galapagos solver",
      "Fabrication drawing automation in Tekla Structures",
      "CNC toolpath generation and DXF export pipeline",
    ],
    thumbnail: "/assets/project-1.png",
    media: [
      { type: "image", url: "/assets/project-1.png", caption: "Rendered elevation — north facade" },
      { type: "image", url: "/assets/project-3.png", caption: "Structural node detail" },
    ],
    year: "2024",
    tags: ["Parametric", "Steel", "Fabrication", "Grasshopper"],
  },
  {
    id: "algorithmic-print",
    code: "FAB-02",
    name: "Algorithmic Print",
    description:
      "A 3D-printed fluid structure combining organic geometries with rigid geometric support lattices. The design uses reaction-diffusion algorithms to generate surface patterning, then applies topological pruning to reduce material while maintaining structural integrity.",
    role: [
      "Reaction-diffusion algorithm implementation in Python",
      "Mesh generation and clean-up pipeline",
      "Slicing and print-path optimisation for multi-material FDM",
      "Structural validation and support removal strategy",
    ],
    thumbnail: "/assets/project-3.png",
    media: [
      { type: "image", url: "/assets/project-3.png", caption: "Front view — final print" },
      { type: "image", url: "/assets/project-4.png", caption: "Internal lattice detail" },
    ],
    year: "2024",
    tags: ["3D Print", "Python", "Generative", "Fabrication"],
  },
  {
    id: "blueprint-to-reality",
    code: "SYS-03",
    name: "Blueprint to Reality",
    description:
      "A study in dimensional translation — digital wireframes transitioning to solid matte metal. The project explores the full pipeline from BIM model to automated assembly instruction set, demonstrating a zero-manual-intervention workflow from design intent to shop floor.",
    role: [
      "BIM model authoring and coordination in Revit",
      "Automated panel scheduling via Grasshopper + Excel export",
      "Assembly instruction generation scripted in Python",
      "Direct-to-CNC DXF output with cut-list validation",
    ],
    thumbnail: "/assets/project-4.png",
    media: [
      { type: "image", url: "/assets/project-4.png", caption: "Full elevation — completed system" },
      { type: "image", url: "/assets/project-1.png", caption: "Panel schedule excerpt" },
    ],
    year: "2023",
    tags: ["BIM", "Revit", "Automation", "Curtain Wall"],
  },
  {
    id: "curtain-wall-system",
    code: "FAC-04",
    name: "Curtain Wall System",
    description:
      "A fully automated curtain wall engineering workflow developed for a high-rise residential tower. Grasshopper scripts drive the full parametric model, automatically generating panel schedules, mullion profiles, and DXF cut files ready for CNC fabrication — eliminating manual draughting entirely.",
    role: [
      "Full parametric facade model in Grasshopper",
      "Automated panel scheduling and area takeoff",
      "Mullion profile generation per structural grid",
      "DXF export pipeline direct to CNC router",
    ],
    thumbnail: "/assets/project-1.png",
    media: [
      { type: "image", url: "/assets/project-1.png", caption: "Facade overview" },
      { type: "image", url: "/assets/project-3.png", caption: "Panel schedule output" },
    ],
    year: "2023",
    tags: ["Curtain Wall", "Automation", "Grasshopper", "CNC"],
  },
  {
    id: "steel-truss-optimisation",
    code: "STR-05",
    name: "Steel Truss Optimisation",
    description:
      "Structural optimisation of a long-span steel truss using evolutionary solvers within Grasshopper. A 30% reduction in material was achieved by parametrically varying member cross-sections against live load combinations, with the final geometry synced directly to Tekla for detailing.",
    role: [
      "Parametric structural model linked to load analysis",
      "Evolutionary optimisation via Galapagos and Octopus",
      "Automated Bill of Materials generation",
      "Direct Tekla Structures synchronisation via API",
    ],
    thumbnail: "/assets/project-3.png",
    media: [
      { type: "image", url: "/assets/project-3.png", caption: "Optimised truss geometry" },
      { type: "image", url: "/assets/project-4.png", caption: "Load path analysis diagram" },
    ],
    year: "2023",
    tags: ["Structural", "Tekla", "Optimisation", "Steel"],
  },
  {
    id: "panel-nesting",
    code: "FAB-06",
    name: "Panel Nesting System",
    description:
      "A bespoke panel nesting and sheet-cutting optimisation tool built in Python, reducing material waste on aluminium cladding projects by algorithmically arranging irregular panel shapes within standard sheet sizes before generating G-code output.",
    role: [
      "Polygon nesting algorithm development in Python",
      "Sheet utilisation analysis and waste reporting",
      "G-code post-processing for CNC plasma cutter",
      "Integration with existing Grasshopper fabrication pipeline",
    ],
    thumbnail: "/assets/project-4.png",
    media: [
      { type: "image", url: "/assets/project-4.png", caption: "Nested panel layout on 3000×1500 sheet" },
      { type: "image", url: "/assets/project-1.png", caption: "Waste reduction comparison chart" },
    ],
    year: "2023",
    tags: ["Python", "CNC", "Fabrication", "Nesting"],
  },
];
