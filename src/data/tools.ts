export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  type: 'fast' | 'slow';
  thumbnail: string | null;
}

export const tools: Tool[] = [
  {
    id: 1,
    name: 'Facade Panel Optimizer',
    description:
      'Adjust division count, panel depth, and mullion offset to generate a parametric curtain wall system in real time. Outputs fabrication-ready panel geometry with area calculations.',
    category: 'Facade Systems',
    tags: ['Facade', 'Panels', 'Optimization', 'Curtain Wall'],
    type: 'fast',
    thumbnail: null,
  },
  {
    id: 2,
    name: 'Truss Span Generator',
    description:
      'Define span, load, and material to compute an optimised Pratt or Warren truss. Returns a 3dm model with node coordinates and member forces as data outputs.',
    category: 'Structural',
    tags: ['Structure', 'Truss', 'Span', 'Steel'],
    type: 'slow',
    thumbnail: null,
  },
  {
    id: 3,
    name: 'Voronoi Surface Skin',
    description:
      'Map a Voronoi diagram onto any base surface with live density and offset controls. Ideal for cladding studies and acoustic panel layouts.',
    category: 'Surface Geometry',
    tags: ['Voronoi', 'Cladding', 'Pattern', 'Geometry'],
    type: 'fast',
    thumbnail: null,
  },
  {
    id: 4,
    name: 'CNC Flat-Cut Unroller',
    description:
      'Input a freeform surface and receive unrolled flat patterns with cut-file geometry, panel IDs, and material yield statistics in the data output.',
    category: 'Fabrication',
    tags: ['CNC', 'Fabrication', 'Unrolling', 'Sheet Metal'],
    type: 'slow',
    thumbnail: null,
  },
  {
    id: 5,
    name: 'Column Grid Optimizer',
    description:
      'Define floor-plate extents, bay sizes, and load points to automatically generate a structural column grid with alignment to facade module.',
    category: 'Structural',
    tags: ['Columns', 'Grid', 'Structure', 'BIM'],
    type: 'fast',
    thumbnail: null,
  },
  {
    id: 6,
    name: 'Daylight Factor Mapper',
    description:
      'Place a building massing, define glazing ratios per facade, and compute a simplified daylight factor heat-map exported as a coloured mesh 3dm.',
    category: 'Environmental',
    tags: ['Daylight', 'Environmental', 'Facade', 'Analysis'],
    type: 'slow',
    thumbnail: null,
  },
];

export const featuredTool = tools[0];
