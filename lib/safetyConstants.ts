export const SUBSTATIONS = [
  "FREDERICK", "WESEL", "BULLDOG", "MITCHELL",
  "FAIR GROUNDS", "ZARYE", "PLANT",
];

export const SAFETY_FEEDERS = ["F1", "F2", "F3", "F4"];

export const DELIVERY_POINTS = [
  "#1 HAGERSTOWN", "#2 FOUNTAINHEAD", "#3 MAPLE",
  "#4 VA AVE", "#5 ANTIETAM",
];

export const CREW = [
  "PETE TALBERT", "JEREMY DEVORE", "DOUG TAPLEY", "JEFF KRINER",
  "CHASE FRANK", "JOE LUCAS", "BRADY ROHRER", "PRESTON LOVE",
  "TIMOTHY CAMPBELL",
];

export const VEHICLES = [
  { code: "101", label: "101 - PICK UP" },
  { code: "120", label: "120 - DIGGER DERRICK" },
  { code: "129", label: "129 - BIG BUCKET" },
  { code: "108", label: "108 - PICK UP" },
  { code: "121", label: "121 - BIG BUCKET" },
  { code: "125", label: "125 - SMALL BUCKET" },
  { code: "123", label: "123 - PICK UP" },
  { code: "127", label: "127 - DIGGER DERRICK" },
  { code: "132", label: "132 - SMALL BUCKET" },
  { code: "126", label: "126 - PICK UP" },
  { code: "128", label: "128 - BIG BUCKET" },
  { code: "135", label: "135 - SMALL BUCKET" },
];

export const LINEUPS: Record<string, { crew: string[]; trucks: string[] }> = {
  "PETE TALBERT":  { crew: ["JEREMY DEVORE", "DOUG TAPLEY"], trucks: ["101", "120", "125"] },
  "DOUG TAPLEY":   { crew: ["JEFF KRINER", "CHASE FRANK", "JOE LUCAS"], trucks: ["108", "121", "132"] },
  "JEFF KRINER":   { crew: ["BRADY ROHRER", "PRESTON LOVE", "TIMOTHY CAMPBELL"], trucks: ["123", "127", "135"] },
  "JEREMY DEVORE": { crew: [], trucks: ["126", "128"] },
};

export const HAZARDS = [
  "PERMITS/PROCEDURE", "CONFINED SPACE", "OVERHEAD LOADS",
  "CHEMICAL USE/STORAGE", "ENERGY CONTROL", "PINCH POINTS",
  "BENDING/LIFTING", "SLIPS/TRIPS/FALLS", "LINE OF FIRE",
  "SHARP/HOT/WET SURFACES", "DOG/BEE/TICK BITES", "HEAT/COLD STRESS",
  "HOUSEKEEPING", "LIGHTING/VENTILATION", "WEATHER", "TRAFFIC", "ELECTRICAL",
];

export const PPE = [
  "FR CLOTHING", "HARD HATS", "SAFETY GLASSES", "SAFETY FOOTWEAR",
  "LV RUBBER GLOVES", "HV RUBBER GLOVES", "HEARING PROTECTION",
  "FACE SHIELD", "LEATHER PROTECTORS", "FALL PROTECTION", "RUBBER SLEEVES",
  "CHAPS (CHAIN SAW)", "ICE CLEATS", "SPECIAL ARC FLASH PROTECTION",
  "HIGH VISIBILITY TRAFFIC VEST", "CHEMICAL RESISTANT CLOTHING",
  "DIELECTRIC OVERSHOES/BOOTS", "RESPIRATORY PROTECTION",
];

export const GLOVES = ["LEATHER", "CUT RESISTANT", "CLOTH", "CHEMICAL RESISTANT"];

export const ERROR_TOOLS = [
  "Job Briefing/Reverse Job Briefing", "Questioning Attitude", "2-Minute Drill",
  "Self-Check/Peer Check (Star Technique)", "Procedure Use and Adherence",
  "Place keeping", "Flagging and Robust Barriers", "Training",
];

export const ERROR_SITUATIONS = [
  "Time Pressure", "Distractions/Interruptions", "Stress",
  "Vague or Incomplete Guidelines", "Multiple Tasks", "Overconfidence in Abilities",
  "Change in Work", "First Time on Task", "Poor Communications", "Fatigued", "Inexperienced",
];

export const VEH_LEFT = [
  { title: "Daily Visual Inspection", items: ["Boom condition – welds, rust, damage","Boom; boom rest/cradle; pins, rings, bolts","Bucket – mounting, door latch, safety","Cylinders & hoses","Hydraulic leaks – under truck & boom","Loose/missing bolts, nuts, snap rings, cotter pins","Outriggers","Pedestal mounting bolts","Safety decals","Snow or ice buildup","Tire condition & inflation","Turntable","Welds; look under the vehicle"] },
  { title: "Body Integrity", items: ["Sharp/Rusted","Door Latches","Windows Roll Up & Dn","Glass Mirrors (Cracked/Missing)","Gas Cap"] },
  { title: "Pedestal Mounting Bolts", items: ["Mounting bolts connecting pedestal to bed/frame","Colored dye/paint mark on bolt and lock nut"] },
  { title: "Fluids", items: ["Brake Fluid","Engine Coolant","Hydraulic Oil"] },
];

export const VEH_RIGHT = [
  { title: "Pre-Operation Inspection/Test Daily", items: ["Lower & upper controls","Test all switches/controls","Test hydraulic and 12 volt electrical","\"Safe operating condition\"","Emergency stop button works","Defroster","Wipers","Horn","Emergency Brakes","Service Brakes","Seatbelts"] },
  { title: "Lights", items: ["Brights","Dims","Brake","Tail","Back Up","Turning Signals-Left","Turning Signals-Right","Warning lights/Flashers"] },
  { title: "Safety & Emergency Equipment", items: ["Wheel chocks – minimum of 2","Outrigger pads/mats","First aid kit","Portable fire extinguisher – DOT 5 B:C","Reflective triangles","Petroleum Oil Spill Kit","Warnings Signs","Traffic Cones","Fall Protection Inspected","Electrical PPE Inspected"] },
];

export const CREW_SECTIONS = [
  { key: "apparel",     title: "Apparel / Clothing",                          items: ["100% Natural Fiber Clothing","Flame Resistant / Retardant Clothing"] },
  { key: "protective",  title: "Protective Equipment",                         items: ["Barricades Installed","Flame Resistant / Retardant Clothing","Hotsticks Inspected and Clean","Hotstick Used","Diving Board Required","Grounds Installed","Cover-Up Installed","Truck / Equipment Grounds Installed"] },
  { key: "equipment",   title: "Equipment / Tools",                            items: ["Climbing Tools - Condition and Use","Jackhammer / Tamper - Condition and Use","Meter Puller / Tester Available","Hand Tools - Condition and Use","Ladders / Scaffolds / Work Platform - Condition and Use"] },
  { key: "ppe",         title: "Personal Protective Equipment Required for Job", items: ["Fall Protection","Face / Eye Protection","Hand Protection","Foot Protection","Hearing Protection","Head Protection","Respiratory Protection","High Voltage Rubber Gloves","High Voltage Rubber Sleeves"] },
  { key: "housekeeping", title: "Housekeeping - Condition",                   items: ["Materials Stored Properly","Slippery Surfaces Controlled","Spills / Leaks Properly Contained","Tripping Hazards Eliminated"] },
  { key: "material",    title: "Material Handling and Equipment Practices",    items: ["OH Cranes / Lifting Devices","Slings Properly Used and In Good Condition","Proper Hand Signals Used","Proper Rigging Techniques Followed"] },
  { key: "ergonomics",  title: "Ergonomics",                                   items: ["Proper Body Mechanics","Proper Lifting / Pulling / Pushing","Stretching / Warm-Up","Work Position in Bucket or on Pole / Ladder"] },
  { key: "vehicle",     title: "Vehicle",                                      items: ["Outriggers Down on Firm Footing","Aerial Unit Inspected","2 Wheel Chocks Properly Placed","Housekeeping of Vehicle","Cargo Secured Properly","First Aid Kit Stocked and Available","Emergency Lighting Needed","Fuel Container Approved, Labeled, & Secured","Fire Extinguisher Full and Available","Spotter Used For Backing","Bags / Tools Properly Stored in Transit","Seat Belts Worn"] },
  { key: "workarea",    title: "Work Area",                                    items: ["Adequate Lighting","Cones / Barricades or Caution Tape in Place","Excavation Shoring / Sloping in Place","Traffic Control Plan Followed","Reflective Vests Worn","Safe Vehicle Positioning","Spoil / Tool Placement","Work Zone Traffic Control Signs"] },
  { key: "practices",   title: "Work Practices and Procedures",                items: ["Tailgate Meeting Held / Form Completed","Appropriate Communication Occurred","Safety Tagging Procedures Followed","Confined Space Procedures Followed"] },
];

export const VA_ILLUMINATION = ["Daylight","Dawn","Dusk","Dark (Street Lts on)","Dark (Street Lts off)","Dark (No Lts)","Unknown"];
export const VA_WEATHER = ["Clear","Cloudy","Foggy","Raining","Snowing","Severe Wind","Other","Unknown"];
export const VA_TYPE = ["Collision with Moving Vehicle","Collision with Stopped Vehicle","Collision with Bike Rider","Collision with Pedestrian","Collision with a Fixed Object","Upset or Jackknife","Struck by Another Vehicle","Miscellaneous"];
export const VA_ROAD_SURFACE = ["Wet","Dry","Snow","Ice","Mud","Other","Unknown"];
export const VA_ROAD_CONDITION = ["No Defects","Shoulder Defect","Holes, Ruts, Etc.","Foreign Material","Loose Surface Material","Obstruction not Lighted","Obstruction not Signaled","View Obstructed","Construction/Maintenance"];
export const VA_SPEED_LIMIT = ["Unknown","25 MPH or less","30 MPH","35 MPH","40 MPH","45 MPH","50 MPH","55 MPH"];
export const VA_CAUSES = ["Following too closely","Driving too fast for conditions","Exceeding speed limit","Failure to observe stop sign or signal","Failure to observe warning sign","Failure to yield","Failure to observe clearance","Improper passing","Improper turning","Improper backing","Inattention","Defective equipment"];

export const EA_INJURY_TYPES = ["Cut/Laceration","Sprain/Strain","Fracture","Burn","Bruise/Contusion","Puncture","Amputation","Electric Shock","Other"];
export const EA_BODY_PARTS = ["Head","Eye","Neck","Back","Shoulder","Arm","Hand/Finger","Hip","Leg","Knee","Foot/Toe","Other"];
export const EA_PPE = ["Hard Hat","Safety Glasses","Hearing Protection","Gloves","Safety Footwear","High Visibility Vest","Fall Protection","Respiratory Protection","HV Rubber Gloves","None"];
export const EA_CAUSES = ["Unsafe Act","Unsafe Condition","Lack of Training","Equipment Failure","Procedure Not Followed","Other"];

export const FAULT_OPTIONS = ["Yes", "No", "Undetermined"];
export const PREVENTABLE_OPTIONS = ["Yes", "No", "Undetermined"];
export const YES_NO = ["Yes", "No"];
