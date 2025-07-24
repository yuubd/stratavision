import type { SummaryDataResponse } from "@/types/api";

export const mockDocumentSummary: SummaryDataResponse = {
  pdfPath: "/assets/EPS5144_W1_Bylaws.pdf",
  strataNumber: "NW2378",
  // Mock metadata extracted from document analysis
  developer: "Polygon Homes",
  city: "Vancouver",
  building: "The Summit Tower",
  unitNumber: "1202",
  streetNumber: "123 Main Street",
  sections: [
    {
      title: "Bylaws",
      subsections: [
        {
          title: "Rental Policies",
          questions: [
            {
              question: "What is min. Lease period for tenants renting a strata property?",
              answer: "The minimum lease period for tenants renting a strata property is 30 days.",
              location: "Page 12",
              highlightData: [
                {
                  pageNumber: 12,
                  textPositions: [
                    {
                      text: "The minimum lease period for tenants renting a strata property is 30 days.",
                      startIndex: 245,
                      endIndex: 295
                    }
                  ]
                }
              ]
            },
            {
              question: "Are short-term rentals allowed via airbnb or VRBO?",
              answer: "Short-term rentals through platforms like Airbnb or VRBO are not permitted in this strata property.",
              location: "Page 12",
              highlightData: [
                {
                  pageNumber: 12,
                  textPositions: [
                    {
                      text: "Short-term rentals through platforms like Airbnb or VRBO are not permitted in this strata property.",
                      startIndex: 312,
                      endIndex: 378
                    }
                  ]
                }
              ]
            },
            {
              question: "Can strata be used as bed and breakfast?",
              answer: "No, using the strata property as a bed and breakfast is not permitted.",
              location: "Page 12",
              highlightData: [
                {
                  pageNumber: 12,
                  textPositions: [
                    {
                      text: "No, using the strata property as a bed and breakfast is not permitted.",
                      startIndex: 395,
                      endIndex: 445
                    }
                  ]
                }
              ]
            },
            {
              question: "If any, what restrictions are imposed on guests in short term rentals?",
              answer: "Short-term rentals are not permitted, therefore guest restrictions for short-term rentals are not applicable.",
              location: "Page 12"
            }
          ]
        },
        {
          title: "BBQ Regulations",
          questions: [
            {
              question: "What type of BBQ is permitted in the strata unit?",
              answer: "Only electric BBQs are permitted on balconies. Gas and charcoal BBQs are strictly prohibited.",
              location: "Page 13"
            },
            {
              question: "Can residents of strata have BBQs?",
              answer: "Yes, residents can have electric BBQs only, subject to specific regulations and safety guidelines.",
              location: "Page 13"
            }
          ]
        },
        {
          title: "Pet Policies",
          questions: [
            {
              question: "Are pets allowed in building?",
              answer: "Yes, pets are allowed in the building with certain restrictions.",
              location: "Page 14"
            },
            {
              question: "How many pets are allowed per unit?",
              answer: "Maximum of 2 pets per unit.",
              location: "Page 14"
            },
            {
              question: "What type of pets are allowed?",
              answer: "Dogs, cats, and small caged animals are permitted.",
              location: "Page 14"
            },
            {
              question: "What are pet restrictions?",
              answer: "Pets must be leashed in common areas, owners must clean up after their pets, and certain breeds are restricted.",
              location: "Page 14"
            },
            {
              question: "Any vicious breed restrictions?",
              answer: "Yes, certain dog breeds classified as aggressive or dangerous are not permitted.",
              location: "Page 14"
            },
            {
              question: "Size restrictions of pets?",
              answer: "Dogs must not exceed 50 pounds in weight.",
              location: "Page 14"
            },
            {
              question: "Are rental pets allowed?",
              answer: "No, temporary or rental pets are not permitted in the building.",
              location: "Page 14"
            }
          ]
        },
        {
          title: "Smoking Regulations",
          questions: [
            {
              question: "If permitted, where is it permitted?",
              answer: "Smoking is not permitted in any indoor common areas or within 6 meters of building entrances.",
              location: "Page 15"
            },
            {
              question: "What are the smoking regulations?",
              answer: "Smoking is only permitted on private balconies and designated outdoor areas.",
              location: "Page 15"
            }
          ]
        },
        {
          title: "Moving Regulations",
          questions: [
            {
              question: "When moving, what is the required notice that must be given?",
              answer: "A minimum of 7 days notice is required for all move-ins and move-outs.",
              location: "Page 16"
            },
            {
              question: "Any fees associated with moving?",
              answer: "A refundable deposit of $200 and a non-refundable fee of $100 are required for moves.",
              location: "Page 16"
            },
            {
              question: "What is the move in/out times?",
              answer: "Moving is permitted Monday through Saturday, 9:00 AM to 5:00 PM. No moving on Sundays or statutory holidays.",
              location: "Page 16"
            },
            {
              question: "Any specific procedures for moving?",
              answer: "Elevator must be booked in advance, moving blankets must be used, and a pre/post-move inspection is required.",
              location: "Page 16"
            }
          ]
        },
        {
          title: "General Rules",
          questions: [
            {
              question: "Any quiet hours?",
              answer: "Quiet hours are from 10:00 PM to 7:00 AM daily.",
              location: "Page 17"
            },
            {
              question: "A/C units allowed? pre-installed?",
              answer: "Portable A/C units are allowed. Installation of permanent units requires strata approval.",
              location: "Page 17"
            },
            {
              question: "Christmas trees, holiday decorations allowed?",
              answer: "Holiday decorations are permitted but must be removed within 2 weeks after the holiday.",
              location: "Page 17"
            },
            {
              question: "Maximum occupancy rules?",
              answer: "Maximum of 2 persons per bedroom as per municipal bylaws.",
              location: "Page 17"
            },
            {
              question: "Restrictions on floor installation?",
              answer: "Hard flooring installations require prior approval and must include proper sound insulation.",
              location: "Page 17"
            }
          ]
        }
      ]
    },
    {
      title: "Strata Management",
      subsections: [
        {
          title: "Insurance",
          questions: [
            {
              question: "What type of insurance policy does strata have?",
              answer: "The strata has a comprehensive commercial property insurance policy covering the building structure, common areas, and liability.",
              location: "Page 18"
            },
            {
              question: "Extend of insurance coverage?",
              answer: "Coverage includes property damage, liability, directors and officers liability, and machinery breakdown.",
              location: "Page 18"
            },
            {
              question: "Policy limits?",
              answer: "The policy has a total coverage limit of $50 million for property damage and $10 million for liability.",
              location: "Page 18"
            },
            {
              question: "Exclusions or limitations in policy?",
              answer: "Notable exclusions include earthquake damage, intentional damage by owners, and wear and tear.",
              location: "Page 18"
            },
            {
              question: "Any special assessments or deductibles?",
              answer: "Water damage deductible is $50,000, general damage deductible is $10,000.",
              location: "Page 18"
            },
            {
              question: "Any recent insurance claims?",
              answer: "One claim in the past year for water damage in unit 205, total claim amount $75,000.",
              location: "Page 18"
            },
            {
              question: "History of insurance premiums?",
              answer: "Premiums have increased 15% annually over the past three years due to market conditions.",
              location: "Page 18"
            },
            {
              question: "Upcoming changes to insurance policy?",
              answer: "Policy renewal due in 6 months, expecting 10-20% premium increase.",
              location: "Page 18"
            },
            {
              question: "What is water damage deductible?",
              answer: "$50,000 for water damage incidents.",
              location: "Page 18"
            },
            {
              question: "When will strata insurance expire?",
              answer: "Current policy expires on December 31, 2024.",
              location: "Page 18"
            }
          ]
        },
        {
          title: "Finances",
          questions: [
            {
              question: "What is the balance of the Contingency Reserve Fund (CRF)?",
              answer: "Current CRF balance is $750,000 as of the last financial statement.",
              location: "Page 32"
            },
            {
              question: "What is the budgeted annual contribution to the Reserve Fund?",
              answer: "Annual contribution to CRF is $150,000, representing 10% of total strata fees collected.",
              location: "Page 33"
            },
            {
              question: "What is the current financial status of the CRF and how is it influenced by the balances and activities of other related funds?",
              answer: "CRF is well-funded with steady growth. Operating fund surplus of $50,000 allows for occasional transfers to strengthen CRF position.",
              location: "Page 34-35"
            },
            {
              question: "Is there an operating surplus or deficit?",
              answer: "Current operating surplus of $50,000 for the fiscal year 2023-2024.",
              location: "Page 36"
            }
          ]
        },
        {
          title: "Budget Allocation",
          questions: [
            {
              question: "What is the budget for landscaping services for the strata?",
              answer: "$36,000 annually ($3,000 monthly) for comprehensive landscaping services.",
              location: "Page 37"
            },
            {
              question: "Total amount allocated for strata budget for each year available?",
              answer: "Total annual budget is $1.5 million for fiscal year 2023-2024.",
              location: "Page 38"
            },
            {
              question: "Annual budget allocated for general repairs and maintenance?",
              answer: "$120,000 allocated for general repairs and maintenance.",
              location: "Page 39"
            },
            {
              question: "Budget allocated for pest control services?",
              answer: "$6,000 annually for regular pest control services.",
              location: "Page 40"
            },
            {
              question: "Amount allocated for insurance coverage?",
              answer: "$250,000 annually for all insurance premiums.",
              location: "Page 41"
            },
            {
              question: "Budget for utilities?",
              answer: "$180,000 annually for common area utilities including water, electricity, and gas.",
              location: "Page 42"
            },
            {
              question: "Budget for dryer duct cleaning?",
              answer: "$15,000 allocated for annual dryer duct cleaning.",
              location: "Page 43"
            },
            {
              question: "Budget for window cleaning services for strata?",
              answer: "$24,000 annually for quarterly window cleaning services.",
              location: "Page 44"
            }
          ]
        }
      ]
    },
    {
      title: "AGM",
      subsections: [
        {
          title: "Recent AGM Details",
          questions: [
            {
              question: "Were there any motions put forward during the AGM that were not passed? If so, what were they?",
              answer: "Two motions failed: installation of electric vehicle charging stations and updating lobby furniture.",
              location: "Page 45"
            },
            {
              question: "Were there any major issues or concerns raised during the most recent AGM?",
              answer: "Main concerns included rising insurance premiums and need for updated security systems.",
              location: "Page 46"
            },
            {
              question: "How does the AGM address issues to CRF, and the building's long term maintenance plan?",
              answer: "Detailed 5-year maintenance plan presented, with CRF contributions increased by 10% to support future projects.",
              location: "Page 47"
            },
            {
              question: "Were there any discussions during the AGM about changes in bylaws or rules of the strata?",
              answer: "Proposed changes to short-term rental restrictions and pet policies were discussed but not voted on.",
              location: "Page 48"
            },
            {
              question: "How were the financial statements received and reviewed during the AGM?",
              answer: "Financial statements were reviewed and approved with no major concerns. Audit report showed clean opinion.",
              location: "Page 49"
            },
            {
              question: "Were there any Special Assessments or Special Levies approved at the AGM?",
              answer: "No special assessments were approved at the most recent AGM.",
              location: "Page 50"
            }
          ]
        }
      ]
    },
    {
      title: "SGM",
      subsections: [
        {
          title: "Recent SGM Details",
          questions: [
            {
              question: "Did the SGM address any immediate or emergency repairs or alterations needed for building or common property?",
              answer: "Emergency repairs to the building's main water supply system were approved, costing $75,000.",
              location: "Page 51"
            },
            {
              question: "What were the specific reasons or circumstances that led to the calling of the most SGM?",
              answer: "SGM was called to address urgent plumbing issues and approve emergency funding.",
              location: "Page 52"
            },
            {
              question: "Were there any special resolutions or urgent decisions made during the SGM?",
              answer: "Special resolution passed to use CRF funds for emergency plumbing repairs.",
              location: "Page 53"
            },
            {
              question: "How did the SGM handle any disputes or conflicts among strata members or with external parties?",
              answer: "Dispute resolution committee formed to address concerns about contractor selection.",
              location: "Page 54"
            },
            {
              question: "Were there any significant changes to the management or operational structure of the strata decided during the SGM?",
              answer: "No structural changes to management were made during the SGM.",
              location: "Page 55"
            },
            {
              question: "What discussions took place during the SGM regarding the allocation or use of contingency or special funds?",
              answer: "Discussed using $75,000 from CRF for repairs, with plan to replenish through increased monthly contributions.",
              location: "Page 56"
            },
            {
              question: "Were there any temporary changes or additions to the strata bylaws or rules proposed or approved during the SGM?",
              answer: "Temporary rule implemented regarding water usage during repairs.",
              location: "Page 57"
            },
            {
              question: "How was the need for the SGM and its outcomes communicated to the strata members who could not attend?",
              answer: "Detailed minutes and video recording provided to all owners within 48 hours.",
              location: "Page 58"
            }
          ]
        }
      ]
    },
    {
      title: "Form B",
      subsections: [
        {
          title: "Parking",
          questions: [
            {
              question: "How many spots, stall numbers?",
              answer: "Two parking spots assigned: #45 and #46.",
              location: "Page 60"
            },
            {
              question: "Spots common property or LCP?",
              answer: "Both spots are Limited Common Property (LCP) assigned to the unit.",
              location: "Page 60"
            },
            {
              question: "Additional costs with parking?",
              answer: "No additional costs; included in strata fees.",
              location: "Page 60"
            },
            {
              question: "Any leases?",
              answer: "No current parking leases associated with this unit.",
              location: "Page 60"
            }
          ]
        },
        {
          title: "General",
          questions: [
            {
              question: "Date of Form B?",
              answer: "Form B issued on March 15, 2024.",
              location: "Page 61"
            },
            {
              question: "Outstanding bylaw infractions on form B?",
              answer: "No outstanding bylaw infractions reported.",
              location: "Page 61"
            }
          ]
        },
        {
          title: "Storage",
          questions: [
            {
              question: "Where is storage located?",
              answer: "Storage locker located on P1 level.",
              location: "Page 62"
            },
            {
              question: "Is there locker allocated to unit?",
              answer: "Yes, Locker #78 assigned to unit.",
              location: "Page 62"
            },
            {
              question: "Restrictions what can be stored?",
              answer: "No flammable materials, perishables, or illegal items. Must maintain 18\" clearance from sprinklers.",
              location: "Page 62"
            },
            {
              question: "Is there bicycle storage?",
              answer: "Yes, secure bicycle storage available in P1, no additional cost.",
              location: "Page 62"
            }
          ]
        },
        {
          title: "Fees",
          questions: [
            {
              question: "Are there fees or special levies not included in monthly strata fees?",
              answer: "No additional fees or special levies currently.",
              location: "Page 63"
            },
            {
              question: "Any overdue fees?",
              answer: "No overdue fees associated with this unit.",
              location: "Page 63"
            },
            {
              question: "Special assessments in future?",
              answer: "No approved special assessments pending.",
              location: "Page 63"
            }
          ]
        },
        {
          title: "Meeting",
          questions: [
            {
              question: "Whens next AGM?",
              answer: "Next AGM scheduled for June 15, 2024.",
              location: "Page 64"
            },
            {
              question: "Major discussions or decisions in last AGM?",
              answer: "Discussed building envelope maintenance and security upgrades.",
              location: "Page 64"
            }
          ]
        },
        {
          title: "Owner responsibilities",
          questions: [
            {
              question: "Any specific responsibilities or actions required from owner as per form B?",
              answer: "Owner must maintain in-suite smoke detectors and HVAC filters.",
              location: "Page 65"
            },
            {
              question: "Any renovations or changes made to unit that have not been approved?",
              answer: "No unapproved renovations or modifications noted.",
              location: "Page 65"
            }
          ]
        }
      ]
    },
    {
      title: "Engineers report",
      subsections: [
        {
          title: "Building Assessment",
          questions: [
            {
              question: "What were the major findings of the most recent engineers report regarding the building structural integrity?",
              answer: "Building structure is in good condition with no major concerns. Minor concrete spalling noted in parking area.",
              location: "Page 70"
            },
            {
              question: "Were there any recommendations for urgent repairs or maintenance in the engineers report?",
              answer: "Recommended repairs to parking area concrete within 12 months and updating seismic brackets for hot water tanks.",
              location: "Page 70"
            },
            {
              question: "How does the engineers report assess the buildings compliance with current build codes and safety standards?",
              answer: "Building meets most current codes with some grandfathered elements. Fire safety systems fully compliant.",
              location: "Page 71"
            },
            {
              question: "What is the projected lifespan of major building components according to the engineers report?",
              answer: "Roof: 15 years remaining, Elevators: 10 years, Building envelope: 20+ years.",
              location: "Page 71"
            },
            {
              question: "How does the engineers report the building's energy efficiency, and environmental impact?",
              answer: "Energy efficiency rated as moderate. Recommended upgrades to lighting and HVAC systems could improve rating.",
              location: "Page 72"
            },
            {
              question: "Were there any discrepancies or issues in previous engineers report that have been resolved or remain outstanding?",
              answer: "Previous report's concerns about drainage system have been resolved. Window gasket replacement still pending.",
              location: "Page 72"
            },
            {
              question: "How often does engineer recommend conducting subsequent inspections or report for the building?",
              answer: "Recommended full inspection every 5 years with annual reviews of specific components.",
              location: "Page 73"
            },
            {
              question: "What systems does the engineer report address?",
              answer: "Report covers structural, mechanical, electrical, plumbing, envelope, and life safety systems.",
              location: "Page 73"
            }
          ]
        }
      ]
    },
    {
      title: "Depreciation report",
      subsections: [
        {
          title: "General Information",
          questions: [
            {
              question: "What is the date of depreciation report and is it recent?",
              answer: "Report dated January 15, 2024, completed by ABC Engineering Ltd.",
              location: "Page 80"
            },
            {
              question: "Who was the report prepared by?",
              answer: "Prepared by ABC Engineering Ltd., certified depreciation analysts.",
              location: "Page 80"
            }
          ]
        },
        {
          title: "Building Condition",
          questions: [
            {
              question: "What is the current condition of the buildings foundation structure?",
              answer: "Foundation in excellent condition with no signs of settlement or structural issues.",
              location: "Page 81"
            },
            {
              question: "Are there any not problems with the building structures?",
              answer: "No significant structural problems identified. Minor maintenance items noted.",
              location: "Page 81"
            },
            {
              question: "How old are the key social components and when are they due for replacement?",
              answer: "Elevators: 10 years old (replace in 15 years), Roof: 5 years old (replace in 20 years), Boilers: 7 years old (replace in 8 years).",
              location: "Page 82"
            }
          ]
        },
        {
          title: "Components and Planning",
          questions: [
            {
              question: "What major components are included in the buildings inventory and what are their age condition and remaining useful life?",
              answer: "Detailed inventory includes HVAC (15 years remaining), plumbing (20 years), electrical (25 years), windows (15 years).",
              location: "Page 83"
            },
            {
              question: "Does the continuous reserve have adequate money for the anticipated repairs or replacements?",
              answer: "Current CRF adequate for next 5 years of planned replacements with current contribution levels.",
              location: "Page 83"
            },
            {
              question: "How often have special assessments been in the past?",
              answer: "Two special assessments in past 10 years: roof replacement (2018) and elevator modernization (2020).",
              location: "Page 84"
            },
            {
              question: "Are there any special assessments or anticipate in the next 5 to 10 years?",
              answer: "Potential special assessment for window replacement in 7-8 years if CRF contributions remain at current levels.",
              location: "Page 84"
            }
          ]
        },
        {
          title: "Common Areas",
          questions: [
            {
              question: "What is the condition of common areas like hallways, lobbies, and recreational facilities and are there any upcoming renovations or repairs planned for these areas?",
              answer: "Common areas in good condition. Lobby renovation planned for 2025, estimated cost $150,000.",
              location: "Page 85"
            },
            {
              question: "How often are the common areas/amenities maintained or upgraded?",
              answer: "Regular maintenance schedule: Daily cleaning, annual carpet cleaning, paint every 5 years, major upgrades every 10 years.",
              location: "Page 85"
            },
            {
              question: "Are there any common amenities in the building such as poor gym or recreational areas and how do their maintenance cost and projected lifespan affect the overall financial picture?",
              answer: "Gym equipment replacement budgeted for 2026 ($75,000). Pool maintenance represents 5% of annual operating budget.",
              location: "Page 86"
            }
          ]
        }
      ]
    },
    {
      title: "Minutes",
      subsections: [
        {
          title: "Financial Updates",
          questions: [
            {
              question: "Are the strata fees going up this year? If so, how much?",
              answer: "Yes, 5% increase effective July 1, 2024.",
              location: "Page 90"
            },
            {
              question: "Are there any proposed specialities that have not yet been voted or approved?",
              answer: "Proposed special levy for security system upgrade ($2,500 per unit) to be voted on at next AGM.",
              location: "Page 90"
            },
            {
              question: "What would be the amount of?",
              answer: "Proposed security system special levy: $2,500 per unit.",
              location: "Page 90"
            }
          ]
        },
        {
          title: "Maintenance Issues",
          questions: [
            {
              question: "Has the elevator malfunctioned or need repair?",
              answer: "Two minor elevator service calls in past 6 months, no major repairs needed.",
              location: "Page 91"
            },
            {
              question: "What is plan scheduled for building exterior?",
              answer: "Exterior painting scheduled for summer 2025.",
              location: "Page 91"
            },
            {
              question: "Are there any reports of water leaks cause of the leak?",
              answer: "One water leak reported in unit 305 due to failed washing machine hose.",
              location: "Page 91"
            },
            {
              question: "This strata claim insurance for the leak?",
              answer: "No insurance claim filed as damage was below deductible.",
              location: "Page 91"
            },
            {
              question: "Any reports of deficiencies in plumbing?",
              answer: "Routine maintenance identified aging hot water recirculation pump, scheduled for replacement.",
              location: "Page 92"
            },
            {
              question: "Did any plumbing get replaced or repaired?",
              answer: "Main stack cleaning completed in January 2024.",
              location: "Page 92"
            },
            {
              question: "Are there any reports of mould in the Strata?",
              answer: "No active mold issues reported.",
              location: "Page 92"
            }
          ]
        },
        {
          title: "Legal and Insurance",
          questions: [
            {
              question: "Strata have any legal lawsuits?",
              answer: "No active lawsuits or legal proceedings.",
              location: "Page 93"
            },
            {
              question: "Does insurance policy need to be renewed?",
              answer: "Insurance renewal due December 31, 2024.",
              location: "Page 93"
            }
          ]
        },
        {
          title: "Building Components",
          questions: [
            {
              question: "What is the age of the roofing material?",
              answer: "Roof is 5 years old, installed in 2019.",
              location: "Page 94"
            },
            {
              question: "Does the roof have regular maintenance?",
              answer: "Yes, semi-annual inspections and maintenance performed.",
              location: "Page 94"
            },
            {
              question: "When was the roof last repaired?",
              answer: "Minor repairs to flashing completed in October 2023.",
              location: "Page 94"
            },
            {
              question: "Is there any window replacement?",
              answer: "Window replacement program planned for 2030-2031.",
              location: "Page 94"
            }
          ]
        },
        {
          title: "Security and Complaints",
          questions: [
            {
              question: "How often are break-ins or burglaries if any?",
              answer: "One attempted break-in to parking area in 2023, no successful entry.",
              location: "Page 95"
            },
            {
              question: "Was anything stolen in the burglaries and which unit affect?",
              answer: "No successful burglaries or theft reported.",
              location: "Page 95"
            },
            {
              question: "Any reports of pets?",
              answer: "Two noise complaints regarding barking dogs, resolved through owner communication.",
              location: "Page 95"
            },
            {
              question: "Has there been any reports of excessive noise caused by complaints from residence?",
              answer: "Three noise complaints in past year, all resolved through strata council mediation.",
              location: "Page 95"
            }
          ]
        },
        {
          title: "Renovations and Claims",
          questions: [
            {
              question: "Any request for renovations to strata property and they get approved?",
              answer: "Four renovation requests approved: two bathroom renovations, one kitchen, one flooring.",
              location: "Page 96"
            },
            {
              question: "Has strata made any insurance claims in the past two years?",
              answer: "One claim for water damage in 2023, $75,000 total claim amount.",
              location: "Page 96"
            },
            {
              question: "Is there any mention of the specific unit in the minutes?",
              answer: "Unit 305 mentioned regarding water leak incident and subsequent repairs.",
              location: "Page 96"
            }
          ]
        }
      ]
    }
  ]
}; 