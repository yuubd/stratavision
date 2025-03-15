import type { DocumentSummaryData } from "./types";

export const mockDocumentSummary: DocumentSummaryData = {
  strataNumber: "NW2378",
  sections: [
    {
      title: "Bylaws",
      subsections: [
        {
          title: "Rental Policies",
          questions: [
            {
              question: "What is min. Lease period for tenants renting a strata property?",
              answer: "The minimum lease period for tenants renting a strata property is 30 days."
            },
            {
              question: "Are short-term rentals allowed via airbnb or VRBO?",
              answer: "Short-term rentals through platforms like Airbnb or VRBO are not permitted in this strata property."
            },
            {
              question: "Can strata be used as bed and breakfast?",
              answer: "No, using the strata property as a bed and breakfast is not permitted."
            },
            {
              question: "If any, what restrictions are imposed on guests in short term rentals?",
              answer: "Short-term rentals are not permitted, therefore guest restrictions for short-term rentals are not applicable."
            }
          ]
        },
        {
          title: "BBQ Regulations",
          questions: [
            {
              question: "What type of BBQ is permitted in the strata unit?",
              answer: "Only electric BBQs are permitted on balconies. Gas and charcoal BBQs are strictly prohibited."
            },
            {
              question: "Can residents of strata have BBQs?",
              answer: "Yes, residents can have electric BBQs only, subject to specific regulations and safety guidelines."
            }
          ]
        },
        {
          title: "Pet Guidelines",
          questions: [
            {
              question: "Are pets allowed in building?",
              answer: "Yes, pets are allowed in the building with certain restrictions."
            },
            {
              question: "How many pets are allowed per unit?",
              answer: "Maximum of 2 pets per unit."
            },
            {
              question: "What type of pets are allowed?",
              answer: "Dogs, cats, and small caged animals are permitted."
            },
            {
              question: "What are pet restrictions?",
              answer: "Pets must be leashed in common areas, owners must clean up after their pets, and certain breeds are restricted."
            },
            {
              question: "Any vicious breed restrictions?",
              answer: "Yes, certain dog breeds classified as aggressive or dangerous are not permitted."
            },
            {
              question: "Size restrictions of pets?",
              answer: "Dogs must not exceed 50 pounds in weight."
            },
            {
              question: "Are rental pets allowed?",
              answer: "No, temporary or rental pets are not permitted in the building."
            }
          ]
        },
        {
          title: "Smoking Policy",
          questions: [
            {
              question: "If permitted, where is it permitted?",
              answer: "Smoking is not permitted in any indoor common areas or within 6 meters of building entrances."
            },
            {
              question: "What are the smoking regulations?",
              answer: "Smoking is only permitted on private balconies and designated outdoor areas."
            }
          ]
        },
        {
          title: "Move in/out fees",
          questions: [
            {
              question: "When moving, what is the required notice that must be given?",
              answer: "A minimum of 7 days notice is required for all move-ins and move-outs."
            },
            {
              question: "Any fees associated with moving?",
              answer: "A refundable deposit of $200 and a non-refundable fee of $100 are required for moves."
            },
            {
              question: "What is the move in/out times?",
              answer: "Moving is permitted Monday through Saturday, 9:00 AM to 5:00 PM. No moving on Sundays or statutory holidays."
            },
            {
              question: "Any specific procedures for moving?",
              answer: "Elevator must be booked in advance, moving blankets must be used, and a pre/post-move inspection is required."
            }
          ]
        },
        {
          title: "Miscellaneous",
          questions: [
            {
              question: "Any quiet hours?",
              answer: "Quiet hours are from 10:00 PM to 7:00 AM daily."
            },
            {
              question: "A/C units allowed? pre-installed?",
              answer: "Portable A/C units are allowed. Installation of permanent units requires strata approval."
            },
            {
              question: "Christmas trees, holiday decorations allowed?",
              answer: "Holiday decorations are permitted but must be removed within 2 weeks after the holiday."
            },
            {
              question: "Maximum occupancy rules?",
              answer: "Maximum of 2 persons per bedroom as per municipal bylaws."
            },
            {
              question: "Restrictions on floor installation?",
              answer: "Hard flooring installations require prior approval and must include proper sound insulation."
            }
          ]
        }
      ]
    },
    {
      title: "Insurance",
      subsections: [
        {
          title: "Coverage Details",
          questions: [
            {
              question: "What type of insurance policy does strata have?",
              answer: "The strata has a comprehensive commercial property insurance policy covering the building structure, common areas, and liability."
            },
            {
              question: "Extend of insurance coverage?",
              answer: "Coverage includes property damage, liability, directors and officers liability, and machinery breakdown."
            },
            {
              question: "Policy limits?",
              answer: "The policy has a total coverage limit of $50 million for property damage and $10 million for liability."
            },
            {
              question: "Exclusions or limitations in policy?",
              answer: "Notable exclusions include earthquake damage, intentional damage by owners, and wear and tear."
            },
            {
              question: "Any special assessments or deductibles?",
              answer: "Water damage deductible is $50,000, general damage deductible is $10,000."
            },
            {
              question: "Any recent insurance claims?",
              answer: "One claim in the past year for water damage in unit 205, total claim amount $75,000."
            },
            {
              question: "History of insurance premiums?",
              answer: "Premiums have increased 15% annually over the past three years due to market conditions."
            },
            {
              question: "Upcoming changes to insurance policy?",
              answer: "Policy renewal due in 6 months, expecting 10-20% premium increase."
            },
            {
              question: "What is water damage deductible?",
              answer: "$50,000 for water damage incidents."
            },
            {
              question: "When will strata insurance expire?",
              answer: "Current policy expires on December 31, 2024."
            }
          ]
        }
      ]
    },
    {
      title: "Finances",
      subsections: [
        {
          title: "Balance",
          questions: [
            {
              question: "What is the balance of the Contingency Reserve Fund (CRF)?",
              answer: "Current CRF balance is $750,000 as of the last financial statement."
            },
            {
              question: "What is the budgeted annual contribution to the Reserve Fund?",
              answer: "Annual contribution to CRF is $150,000, representing 10% of total strata fees collected."
            },
            {
              question: "What is the current financial status of the CRF and how is it influenced by the balances and activities of other related funds?",
              answer: "CRF is well-funded with steady growth. Operating fund surplus of $50,000 allows for occasional transfers to strengthen CRF position."
            },
            {
              question: "Is there an operating surplus or deficit?",
              answer: "Current operating surplus of $50,000 for the fiscal year 2023-2024."
            }
          ]
        },
        {
          title: "Budget",
          questions: [
            {
              question: "What is the budget for landscaping services for the strata?",
              answer: "$36,000 annually ($3,000 monthly) for comprehensive landscaping services."
            },
            {
              question: "Total amount allocated for strata budget for each year available?",
              answer: "Total annual budget is $1.5 million for fiscal year 2023-2024."
            },
            {
              question: "Annual budget allocated for general repairs and maintenance?",
              answer: "$120,000 allocated for general repairs and maintenance."
            },
            {
              question: "Budget allocated for pest control services?",
              answer: "$6,000 annually for regular pest control services."
            },
            {
              question: "Amount allocated for insurance coverage?",
              answer: "$250,000 annually for all insurance premiums."
            },
            {
              question: "Budget for utilities?",
              answer: "$180,000 annually for common area utilities including water, electricity, and gas."
            },
            {
              question: "Budget for dryer duct cleaning?",
              answer: "$15,000 allocated for annual dryer duct cleaning."
            },
            {
              question: "Budget for window cleaning services for strata?",
              answer: "$24,000 annually for quarterly window cleaning services."
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
              answer: "Two motions failed: installation of electric vehicle charging stations and updating lobby furniture."
            },
            {
              question: "Were there any major issues or concerns raised during the most recent AGM?",
              answer: "Main concerns included rising insurance premiums and need for updated security systems."
            },
            {
              question: "How does the AGM address issues to CRF, and the building's long term maintenance plan?",
              answer: "Detailed 5-year maintenance plan presented, with CRF contributions increased by 10% to support future projects."
            },
            {
              question: "Were there any discussions during the AGM about changes in bylaws or rules of the strata?",
              answer: "Proposed changes to short-term rental restrictions and pet policies were discussed but not voted on."
            },
            {
              question: "How were the financial statements received and reviewed during the AGM?",
              answer: "Financial statements were reviewed and approved with no major concerns. Audit report showed clean opinion."
            },
            {
              question: "Were there any Special Assessments or Special Levies approved at the AGM?",
              answer: "No special assessments were approved at the most recent AGM."
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
              answer: "Emergency repairs to the building's main water supply system were approved, costing $75,000."
            },
            {
              question: "What were the specific reasons or circumstances that led to the calling of the most SGM?",
              answer: "SGM was called to address urgent plumbing issues and approve emergency funding."
            },
            {
              question: "Were there any special resolutions or urgent decisions made during the SGM?",
              answer: "Special resolution passed to use CRF funds for emergency plumbing repairs."
            },
            {
              question: "How did the SGM handle any disputes or conflicts among strata members or with external parties?",
              answer: "Dispute resolution committee formed to address concerns about contractor selection."
            },
            {
              question: "Were there any significant changes to the management or operational structure of the strata decided during the SGM?",
              answer: "No structural changes to management were made during the SGM."
            },
            {
              question: "What discussions took place during the SGM regarding the allocation or use of contingency or special funds?",
              answer: "Discussed using $75,000 from CRF for repairs, with plan to replenish through increased monthly contributions."
            },
            {
              question: "Were there any temporary changes or additions to the strata bylaws or rules proposed or approved during the SGM?",
              answer: "Temporary rule implemented regarding water usage during repairs."
            },
            {
              question: "How was the need for the SGM and its outcomes communicated to the strata members who could not attend?",
              answer: "Detailed minutes and video recording provided to all owners within 48 hours."
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
              answer: "Two parking spots assigned: #45 and #46."
            },
            {
              question: "Spots common property or LCP?",
              answer: "Both spots are Limited Common Property (LCP) assigned to the unit."
            },
            {
              question: "Additional costs with parking?",
              answer: "No additional costs; included in strata fees."
            },
            {
              question: "Any leases?",
              answer: "No current parking leases associated with this unit."
            }
          ]
        },
        {
          title: "General",
          questions: [
            {
              question: "Date of Form B?",
              answer: "Form B issued on March 15, 2024."
            },
            {
              question: "Outstanding bylaw infractions on form B?",
              answer: "No outstanding bylaw infractions reported."
            }
          ]
        },
        {
          title: "Storage",
          questions: [
            {
              question: "Where is storage located?",
              answer: "Storage locker located on P1 level."
            },
            {
              question: "Is there locker allocated to unit?",
              answer: "Yes, Locker #78 assigned to unit."
            },
            {
              question: "Restrictions what can be stored?",
              answer: "No flammable materials, perishables, or illegal items. Must maintain 18\" clearance from sprinklers."
            },
            {
              question: "Is there bicycle storage?",
              answer: "Yes, secure bicycle storage available in P1, no additional cost."
            }
          ]
        },
        {
          title: "Fees",
          questions: [
            {
              question: "Are there fees or special levies not included in monthly strata fees?",
              answer: "No additional fees or special levies currently."
            },
            {
              question: "Any overdue fees?",
              answer: "No overdue fees associated with this unit."
            },
            {
              question: "Special assessments in future?",
              answer: "No approved special assessments pending."
            }
          ]
        },
        {
          title: "Meeting",
          questions: [
            {
              question: "Whens next AGM?",
              answer: "Next AGM scheduled for June 15, 2024."
            },
            {
              question: "Major discussions or decisions in last AGM?",
              answer: "Discussed building envelope maintenance and security upgrades."
            }
          ]
        },
        {
          title: "Owner responsibilities",
          questions: [
            {
              question: "Any specific responsibilities or actions required from owner as per form B?",
              answer: "Owner must maintain in-suite smoke detectors and HVAC filters."
            },
            {
              question: "Any renovations or changes made to unit that have not been approved?",
              answer: "No unapproved renovations or modifications noted."
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
              answer: "Building structure is in good condition with no major concerns. Minor concrete spalling noted in parking area."
            },
            {
              question: "Were there any recommendations for urgent repairs or maintenance in the engineers report?",
              answer: "Recommended repairs to parking area concrete within 12 months and updating seismic brackets for hot water tanks."
            },
            {
              question: "How does the engineers report assess the buildings compliance with current build codes and safety standards?",
              answer: "Building meets most current codes with some grandfathered elements. Fire safety systems fully compliant."
            },
            {
              question: "What is the projected lifespan of major building components according to the engineers report?",
              answer: "Roof: 15 years remaining, Elevators: 10 years, Building envelope: 20+ years."
            },
            {
              question: "How does the engineers report the building's energy efficiency, and environmental impact?",
              answer: "Energy efficiency rated as moderate. Recommended upgrades to lighting and HVAC systems could improve rating."
            },
            {
              question: "Were there any discrepancies or issues in previous engineers report that have been resolved or remain outstanding?",
              answer: "Previous report's concerns about drainage system have been resolved. Window gasket replacement still pending."
            },
            {
              question: "How often does engineer recommend conducting subsequent inspections or report for the building?",
              answer: "Recommended full inspection every 5 years with annual reviews of specific components."
            },
            {
              question: "What systems does the engineer report address?",
              answer: "Report covers structural, mechanical, electrical, plumbing, envelope, and life safety systems."
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
              answer: "Report dated January 15, 2024, completed by ABC Engineering Ltd."
            },
            {
              question: "Who was the report prepared by?",
              answer: "Prepared by ABC Engineering Ltd., certified depreciation analysts."
            }
          ]
        },
        {
          title: "Building Condition",
          questions: [
            {
              question: "What is the current condition of the buildings foundation structure?",
              answer: "Foundation in excellent condition with no signs of settlement or structural issues."
            },
            {
              question: "Are there any not problems with the building structures?",
              answer: "No significant structural problems identified. Minor maintenance items noted."
            },
            {
              question: "How old are the key social components and when are they due for replacement?",
              answer: "Elevators: 10 years old (replace in 15 years), Roof: 5 years old (replace in 20 years), Boilers: 7 years old (replace in 8 years)."
            }
          ]
        },
        {
          title: "Components and Planning",
          questions: [
            {
              question: "What major components are included in the buildings inventory and what are their age condition and remaining useful life?",
              answer: "Detailed inventory includes HVAC (15 years remaining), plumbing (20 years), electrical (25 years), windows (15 years)."
            },
            {
              question: "Does the continuous reserve have adequate money for the anticipated repairs or replacements?",
              answer: "Current CRF adequate for next 5 years of planned replacements with current contribution levels."
            },
            {
              question: "How often have special assessments been in the past?",
              answer: "Two special assessments in past 10 years: roof replacement (2018) and elevator modernization (2020)."
            },
            {
              question: "Are there any special assessments or anticipate in the next 5 to 10 years?",
              answer: "Potential special assessment for window replacement in 7-8 years if CRF contributions remain at current levels."
            }
          ]
        },
        {
          title: "Common Areas",
          questions: [
            {
              question: "What is the condition of common areas like hallways, lobbies, and recreational facilities and are there any upcoming renovations or repairs planned for these areas?",
              answer: "Common areas in good condition. Lobby renovation planned for 2025, estimated cost $150,000."
            },
            {
              question: "How often are the common areas/amenities maintained or upgraded?",
              answer: "Regular maintenance schedule: Daily cleaning, annual carpet cleaning, paint every 5 years, major upgrades every 10 years."
            },
            {
              question: "Are there any common amenities in the building such as poor gym or recreational areas and how do their maintenance cost and projected lifespan affect the overall financial picture?",
              answer: "Gym equipment replacement budgeted for 2026 ($75,000). Pool maintenance represents 5% of annual operating budget."
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
              answer: "Yes, 5% increase effective July 1, 2024."
            },
            {
              question: "Are there any proposed specialities that have not yet been voted or approved?",
              answer: "Proposed special levy for security system upgrade ($2,500 per unit) to be voted on at next AGM."
            },
            {
              question: "What would be the amount of?",
              answer: "Proposed security system special levy: $2,500 per unit."
            }
          ]
        },
        {
          title: "Maintenance Issues",
          questions: [
            {
              question: "Has the elevator malfunctioned or need repair?",
              answer: "Two minor elevator service calls in past 6 months, no major repairs needed."
            },
            {
              question: "What is plan scheduled for building exterior?",
              answer: "Exterior painting scheduled for summer 2025."
            },
            {
              question: "Are there any reports of water leaks cause of the leak?",
              answer: "One water leak reported in unit 305 due to failed washing machine hose."
            },
            {
              question: "This strata claim insurance for the leak?",
              answer: "No insurance claim filed as damage was below deductible."
            },
            {
              question: "Any reports of deficiencies in plumbing?",
              answer: "Routine maintenance identified aging hot water recirculation pump, scheduled for replacement."
            },
            {
              question: "Did any plumbing get replaced or repaired?",
              answer: "Main stack cleaning completed in January 2024."
            },
            {
              question: "Are there any reports of mould in the Strata?",
              answer: "No active mold issues reported."
            }
          ]
        },
        {
          title: "Legal and Insurance",
          questions: [
            {
              question: "Strata have any legal lawsuits?",
              answer: "No active lawsuits or legal proceedings."
            },
            {
              question: "Does insurance policy need to be renewed?",
              answer: "Insurance renewal due December 31, 2024."
            }
          ]
        },
        {
          title: "Building Components",
          questions: [
            {
              question: "What is the age of the roofing material?",
              answer: "Roof is 5 years old, installed in 2019."
            },
            {
              question: "Does the roof have regular maintenance?",
              answer: "Yes, semi-annual inspections and maintenance performed."
            },
            {
              question: "When was the roof last repaired?",
              answer: "Minor repairs to flashing completed in October 2023."
            },
            {
              question: "Is there any window replacement?",
              answer: "Window replacement program planned for 2030-2031."
            }
          ]
        },
        {
          title: "Security and Complaints",
          questions: [
            {
              question: "How often are break-ins or burglaries if any?",
              answer: "One attempted break-in to parking area in 2023, no successful entry."
            },
            {
              question: "Was anything stolen in the burglaries and which unit affect?",
              answer: "No successful burglaries or theft reported."
            },
            {
              question: "Any reports of pets?",
              answer: "Two noise complaints regarding barking dogs, resolved through owner communication."
            },
            {
              question: "Has there been any reports of excessive noise caused by complaints from residence?",
              answer: "Three noise complaints in past year, all resolved through strata council mediation."
            }
          ]
        },
        {
          title: "Renovations and Claims",
          questions: [
            {
              question: "Any request for renovations to strata property and they get approved?",
              answer: "Four renovation requests approved: two bathroom renovations, one kitchen, one flooring."
            },
            {
              question: "Has strata made any insurance claims in the past two years?",
              answer: "One claim for water damage in 2023, $75,000 total claim amount."
            },
            {
              question: "Is there any mention of the specific unit in the minutes?",
              answer: "Unit 305 mentioned regarding water leak incident and subsequent repairs."
            }
          ]
        }
      ]
    }
  ]
}; 