"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SummarySection } from "./summary-section";
import { QuestionAnswer } from "./question-answer";
import { FloppyDisk as SaveIcon } from "@phosphor-icons/react/dist/ssr/FloppyDisk";

export function DocumentSummary(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Summary
          </Typography>
          <Typography variant="h4">
            NW2378
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ borderRadius: 24 }}
        >
          Save AI Summary
        </Button>
      </Box>

      {/* Bylaws Section */}
      <SummarySection title="Bylaws">
        <SummarySection title="Rental Policies">
          <QuestionAnswer
            question="What is min. Lease period for tenants renting a strata property?"
            answer="The minimum lease period for tenants renting a strata property is 30 days."
          />
          <QuestionAnswer
            question="Are short-term rentals allowed via airbnb or VRBO?"
            answer="Short-term rentals through platforms like Airbnb or VRBO are not permitted in this strata property."
          />
          <QuestionAnswer
            question="Can strata be used as bed and breakfast?"
            answer="No, using the strata property as a bed and breakfast is not permitted."
          />
          <QuestionAnswer
            question="If any, what restrictions are imposed on guests in short term rentals?"
            answer="Short-term rentals are not permitted, therefore guest restrictions for short-term rentals are not applicable."
          />
        </SummarySection>

        <SummarySection title="BBQ Regulations">
          <QuestionAnswer
            question="What type of BBQ is permitted in the strata unit?"
            answer="Only electric BBQs are permitted on balconies. Gas and charcoal BBQs are strictly prohibited."
          />
          <QuestionAnswer
            question="Can residents of strata have BBQs?"
            answer="Yes, residents can have electric BBQs only, subject to specific regulations and safety guidelines."
          />
        </SummarySection>

        <SummarySection title="Pet Guidelines">
          <QuestionAnswer
            question="Are pets allowed in building?"
            answer="Yes, pets are allowed in the building with certain restrictions."
          />
          <QuestionAnswer
            question="How many pets are allowed per unit?"
            answer="Maximum of 2 pets per unit."
          />
          <QuestionAnswer
            question="What type of pets are allowed?"
            answer="Dogs, cats, and small caged animals are permitted."
          />
          <QuestionAnswer
            question="What are pet restrictions?"
            answer="Pets must be leashed in common areas, owners must clean up after their pets, and certain breeds are restricted."
          />
          <QuestionAnswer
            question="Any vicious breed restrictions?"
            answer="Yes, certain dog breeds classified as aggressive or dangerous are not permitted."
          />
          <QuestionAnswer
            question="Size restrictions of pets?"
            answer="Dogs must not exceed 50 pounds in weight."
          />
          <QuestionAnswer
            question="Are rental pets allowed?"
            answer="No, temporary or rental pets are not permitted in the building."
          />
        </SummarySection>

        <SummarySection title="Smoking Policy">
          <QuestionAnswer
            question="If permitted, where is it permitted?"
            answer="Smoking is not permitted in any indoor common areas or within 6 meters of building entrances."
          />
          <QuestionAnswer
            question="What are the smoking regulations?"
            answer="Smoking is only permitted on private balconies and designated outdoor areas."
          />
        </SummarySection>

        <SummarySection title="Move in/out fees">
          <QuestionAnswer
            question="When moving, what is the required notice that must be given?"
            answer="A minimum of 7 days notice is required for all move-ins and move-outs."
          />
          <QuestionAnswer
            question="Any fees associated with moving?"
            answer="A refundable deposit of $200 and a non-refundable fee of $100 are required for moves."
          />
          <QuestionAnswer
            question="What is the move in/out times?"
            answer="Moving is permitted Monday through Saturday, 9:00 AM to 5:00 PM. No moving on Sundays or statutory holidays."
          />
          <QuestionAnswer
            question="Any specific procedures for moving?"
            answer="Elevator must be booked in advance, moving blankets must be used, and a pre/post-move inspection is required."
          />
        </SummarySection>

        <SummarySection title="Miscellaneous">
          <QuestionAnswer
            question="Any quiet hours?"
            answer="Quiet hours are from 10:00 PM to 7:00 AM daily."
          />
          <QuestionAnswer
            question="A/C units allowed? pre-installed?"
            answer="Portable A/C units are allowed. Installation of permanent units requires strata approval."
          />
          <QuestionAnswer
            question="Christmas trees, holiday decorations allowed?"
            answer="Holiday decorations are permitted but must be removed within 2 weeks after the holiday."
          />
          <QuestionAnswer
            question="Maximum occupancy rules?"
            answer="Maximum of 2 persons per bedroom as per municipal bylaws."
          />
          <QuestionAnswer
            question="Restrictions on floor installation?"
            answer="Hard flooring installations require prior approval and must include proper sound insulation."
          />
        </SummarySection>
      </SummarySection>
    </Box>
  );
}