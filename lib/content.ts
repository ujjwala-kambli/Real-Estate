export const brand = {
  name: 'Aurevia Estates',
  tagline: 'From Ground to Greatness.',
  subtagline: 'A vision takes shape, one carefully crafted stage at a time.',
  description:
    'A cinematic, conceptual real-estate development experience exploring thoughtful architecture, considered spaces, and the journey from virgin cliff to residential icon.',
  locationPlaceholder: 'Pacific Bluff Promenade, Section 04 · [Location Placeholder]',
  projectType: 'Ultra-Luxury Coastal Residences',
  status: 'Development Timeline'
};

export interface ConstructionStage {
  number: string;
  title: string;
  subtitle: string;
  short: string;
  description: string;
  image: string;
  label: string;
  telemetry: {
    phase: string;
    elevation: string;
    depth?: string;
    equipment: string;
    milestone: string;
    specs: string;
  };
}

export const stages: ConstructionStage[] = [
  {
    number: '01',
    title: 'The Vision',
    subtitle: 'Site Survey & Boundary Definition',
    short: 'Every monumental architectural statement begins with an unyielding reading of the landscape.',
    description:
      'High-resolution aerial surveying, geological bore testing, and boundary demarcation establish the project baseline. The untouched coastal bluff is captured in morning light, framing natural topography before human intervention.',
    image: '/images/construction/stage-01-vision.jpg',
    label: 'Aerial Survey & Boundary Grid',
    telemetry: {
      phase: '01 · Genesis',
      elevation: '240m Above Sea Level',
      equipment: 'LiDAR Drones & Theodolite Surveyors',
      milestone: 'Site boundaries & geological validation completed',
      specs: 'Plot: 4.8 Acres · Natural Coastal Bluff'
    }
  },
  {
    number: '02',
    title: 'Site Preparation',
    subtitle: 'Grading, Clearing & Earthmoving',
    short: 'Heavy earthmoving machinery arrives to sculpt the topography into structural tiers.',
    description:
      'Bulldozers, JCB excavators, and grading equipment clear overburden and establish arterial perimeter access roads. Protective safety fencing, environmental silt barricades, and site command offices are commissioned.',
    image: '/images/construction/stage-02-site-preparation.jpg',
    label: 'Active Earthmoving & JCB Equipment',
    telemetry: {
      phase: '02 · Mobilization',
      elevation: '238m Working Pad',
      equipment: 'JCB Hydraulic Excavators, Cat D8 Dozers',
      milestone: '18,500 m³ of soil graded & compacted',
      specs: 'Compaction: 98% Proctor Density'
    }
  },
  {
    number: '03',
    title: 'Excavation',
    subtitle: 'Subterranean Pits & Rock Retention',
    short: 'Deep bedrock excavation carves subterranean space for structural anchorage.',
    description:
      'Excavators carve deep retention pits into basalt bedrock. Secant pile walls, shotcrete stabilization, and heavy lateral shoring struts reinforce trenches to withstand oceanic hydrostatic pressure and seismic forces.',
    image: '/images/construction/stage-03-excavation.jpg',
    label: 'Deep Structural Trenches & Retaining Shoring',
    telemetry: {
      phase: '03 · Subterranean',
      depth: '14.5m Sub-Grade',
      elevation: '225m Pit Base',
      equipment: 'Rock Breakers, Haul Trucks, Heavy Shoring',
      milestone: 'Perimeter retention wall locked into bed rock',
      specs: 'Basement Levels: 2 Subterranean Basements'
    }
  },
  {
    number: '04',
    title: 'Foundation',
    subtitle: 'Monolithic Raft & Concrete Pouring',
    short: 'High-tensile reinforcement rebar cages receive continuous volumetric concrete pours.',
    description:
      'Over 1,400 tonnes of earthquake-resistant steel rebar are woven into dense foundation grids. Twin articulated concrete boom pumps cast the monolithic raft foundation, securing the anchor mast for the primary tower crane.',
    image: '/images/construction/stage-04-foundation.jpg',
    label: 'Steel Rebar Grid & Concrete Pump Trucks',
    telemetry: {
      phase: '04 · Substructure',
      elevation: '232m Foundation Slab',
      equipment: 'Putzmeister Boom Pumps, Rebar Tier Cranes',
      milestone: '4,200 m³ continuous monolithic raft pour',
      specs: 'Concrete Grade: C50/60 Low-Carbon Silica-Fume'
    }
  },
  {
    number: '05',
    title: 'Structural Framework',
    subtitle: 'Columns, Shear Walls & Crane Erection',
    short: 'The primary load-bearing skeleton rises above ground with precision geometry.',
    description:
      'Tower cranes hoist steel formwork as reinforced vertical columns and the central shear-wall elevator core climb into the sky. Perimeter safety catch screens and cantilevered shoring platforms support multi-tiered operations.',
    image: '/images/construction/stage-05-structural-framework.jpg',
    label: 'Tower Crane & Concrete Column Grid',
    telemetry: {
      phase: '05 · Superstructure',
      elevation: '252m (Level 4)',
      equipment: '65m Luffing Tower Crane, Hydraulic Climbing Formwork',
      milestone: 'Central elevator shear core reaches mid-elevation',
      specs: 'Structural Frame: Post-Tensioned Concrete'
    }
  },
  {
    number: '06',
    title: 'Floor-by-Floor Construction',
    subtitle: 'Vertical Rise & Structural Topping Out',
    short: 'Disciplined structural cycles bring the residential tiers to their ultimate elevation.',
    description:
      'Floor slabs, cantilevered residential balcony decks, and upper penthouse levels take shape floor by floor. The building structure achieves structural topping out at nine full architectural tiers with rooftop terrace containment.',
    image: '/images/construction/stage-06-floor-by-floor.jpg',
    label: 'Topped-Out Superstructure & Rooftop Pour',
    telemetry: {
      phase: '06 · Topping Out',
      elevation: '272m Pinnacle',
      equipment: 'Rooftop Placement Boom, Dual Material Hoists',
      milestone: 'Structural framework topped out at Level 09',
      specs: 'Tiers: 9 Residential Floors + Sky Terrace'
    }
  },
  {
    number: '07',
    title: 'Facade Development',
    subtitle: 'Glass Curtain Walls & Bronze Louvers',
    short: 'The raw concrete is enveloped in precision engineered architectural glass and bronze fins.',
    description:
      'Double-glazed low-emissivity curtain wall panels are craned into position alongside custom anodized champagne-bronze vertical louvers. Balcony frameless glass balustrades and perimeter thermal breaks transform the building silhouette.',
    image: '/images/construction/stage-07-facade-development.jpg',
    label: 'Floor-to-Ceiling Glazing & Champagne Bronze Fins',
    telemetry: {
      phase: '07 · Enclosure',
      elevation: '272m Weatherproofed',
      equipment: 'Spider Cranes, Vacuum Suction Lifters, Mast Climbers',
      milestone: '100% building envelope acoustic & weather sealed',
      specs: 'Glazing: Low-E Acoustic Double-Glazed Glass'
    }
  },
  {
    number: '08',
    title: 'Landscape & Amenities',
    subtitle: 'Gardens, Infinity Pool & Arrival Court',
    short: 'The coastal terrain is cultivated with native biophilic gardens and resort-tier amenities.',
    description:
      'With the construction crane dismantled, heavy paving begins on the circular travertine motor court. Specimen coastal cypress trees are crane-planted, cliffside lawn esplanades are sculpted, and the rooftop horizon pool is lined.',
    image: '/images/construction/stage-08-landscape-amenities.jpg',
    label: 'Rooftop Infinity Terrace & Arrival Grounds',
    telemetry: {
      phase: '08 · Civil & Greenery',
      elevation: '240m Ground / 272m Pool',
      equipment: 'Landscape Cranes, Paver Compactors, Irrigation Systems',
      milestone: 'Arrival plaza paved, cliffside infinity pool filled',
      specs: 'Flora: 140 Native Coastal Pines & Drought-Tolerant Shrubs'
    }
  },
  {
    number: '09',
    title: 'The Final Reveal',
    subtitle: 'The Architectural Masterpiece Completed',
    short: 'An enduring monument to human craft and oceanic tranquility stands fully realized.',
    description:
      'As dusk falls over the Pacific cliff, Aurevia Estates awakens. Warm ambient illumination floods through floor-to-ceiling glass, water cascades at the arrival fountain, and the rooftop pool reflects the golden horizon.',
    image: '/images/construction/stage-09-final-reveal.jpg',
    label: 'Aurevia Estates at Dusk · Fully Commissioned',
    telemetry: {
      phase: '09 · Commissioned',
      elevation: 'Completed Sanctuary',
      equipment: 'Commissioning Engineers & Architectural Lighting',
      milestone: 'Handover ready & certified for occupancy',
      specs: 'Ultra-Luxury Coastal Residences · Masterwork Architecture'
    }
  }
];

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/development', label: 'Development' },
  { href: '/residences', label: 'Residences' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/contact', label: 'Contact' }
];

export const projectHighlights = [
  {
    metric: '4.8',
    unit: 'Acres',
    title: 'Pristine Coastal Bluff',
    description: 'Elevated 240 meters above sea level with unhindered 180-degree oceanic horizons.'
  },
  {
    metric: '09',
    unit: 'Tiers',
    title: 'Architectural Stories',
    description: 'Sculpted post-tensioned geometry wrapped in champagne bronze and solar acoustic glass.'
  },
  {
    metric: '100%',
    unit: 'Custom',
    title: 'Masterwork Detailing',
    description: 'Handcrafted Navona travertine, smoked European oak, and marine-grade bronze metals.'
  },
  {
    metric: '25m',
    unit: 'Cantilever',
    title: 'Rooftop Infinity Pool',
    description: 'Suspended panoramic pool edge seemingly spilling directly into the Pacific horizon.'
  }
];

export const architecturalPillars = [
  {
    number: '01',
    category: 'LANDSCAPE INTEGRATION',
    title: 'Carved from the Coastal Edge',
    description:
      'Rather than imposing upon nature, the architecture respects the slope of the bluff. Every living space is angled to optimize solar capture while sheltering private terraces from prevailing coastal winds.',
    image: '/images/construction/stage-01-vision.jpg'
  },
  {
    number: '02',
    category: 'MATERIAL INTEGRITY',
    title: 'Authentic Materials Built to Endure',
    description:
      'Honed Navona travertine, marine-grade anodized champagne bronze, and triple-laminated acoustic low-iron glass withstand the salt-air environment while acquiring an exquisite natural patina over decades.',
    image: '/images/facade-detail.jpg'
  },
  {
    number: '03',
    category: 'LIGHT & LIVING',
    title: 'Uninterrupted Horizon Living',
    description:
      'Expansive 3.4-meter ceiling clearances, flush floor-to-ceiling glass curtain walls, and seamless indoor-outdoor transitions evoke a feeling of soaring directly above the Pacific surf.',
    image: '/images/penthouse-interior.jpg'
  }
];

export const amenitiesList = [
  {
    title: 'Cliffside Infinity Pool & Sun Terrace',
    category: 'WELLNESS & RECREATION',
    description: 'A 25-meter heated freshwater infinity pool cantilevered over the Pacific ocean cliff edge.',
    image: '/images/construction/stage-09-final-reveal.jpg'
  },
  {
    title: 'Private Travertine Arrival Motor Court',
    category: 'ARRIVAL & CONCIERGE',
    description: 'Porte-cochère entry framed by native coastal cypress and an architectural cascading water sculpture.',
    image: '/images/construction/stage-08-landscape-amenities.jpg'
  },
  {
    title: 'The Sky Horizon Penthouse Lounge',
    category: 'EXCLUSIVE GATHERING',
    description: 'Double-height observation salon with Italian minimalist furnishings and panoramic sunset views.',
    image: '/images/penthouse-interior.jpg'
  },
  {
    title: 'Thermal Suite & Oceanfront Spa',
    category: 'HEALTH & RESTORATION',
    description: 'Cedar dry sauna, eucalyptus steam room, and vitality cold plunge overlooking the coastal tide.',
    image: '/images/facade-detail.jpg'
  }
];
